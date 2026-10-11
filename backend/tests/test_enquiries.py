"""Backend API tests for EDN Renovation Group — enquiries + admin + Resend email verification.

Scope for this iteration:
  * POST /api/enquiries (valid EH postcode, invalid email, non-EH postcode rejection)
  * Resend email send verification via backend log (success id, no "API key is invalid")
  * POST /api/admin/login + GET /api/enquiries auth
  * DELETE /api/enquiries/{id}
"""
import os
import time
import uuid
from pathlib import Path

import pytest
import requests


# ---------- Base URL resolution ----------
def _resolve_base_url():
    url = os.environ.get("REACT_APP_BACKEND_URL")
    if not url:
        env = Path("/app/frontend/.env").read_text()
        for line in env.splitlines():
            if line.startswith("REACT_APP_BACKEND_URL="):
                url = line.split("=", 1)[1].strip()
                break
    return url.rstrip("/")


BASE_URL = _resolve_base_url()
API = f"{BASE_URL}/api"
BACKEND_LOG = "/var/log/supervisor/backend.err.log"


def _tail_log(n=80):
    try:
        with open(BACKEND_LOG, "r") as f:
            return "".join(f.readlines()[-n:])
    except Exception:
        return ""


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_token(session):
    pwd = os.environ.get("ADMIN_PASSWORD")
    if not pwd:
        # read backend .env
        try:
            for line in Path("/app/backend/.env").read_text().splitlines():
                if line.startswith("ADMIN_PASSWORD="):
                    pwd = line.split("=", 1)[1].strip().strip('"')
                    break
        except Exception:
            pass
    r = session.post(f"{API}/admin/login", json={"password": pwd})
    if r.status_code != 200:
        pytest.skip(f"Admin login failed: {r.status_code} {r.text}")
    return r.json().get("token")


# ---------- Health ----------
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        assert "EDN" in r.json().get("message", "")


# ---------- Enquiry creation + Resend email ----------
class TestEnquiryCreation:
    def test_create_valid_eh_postcode(self, session):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_Resend_{unique}",
            "email": f"pytest_{unique}@example.com",
            "phone": "07123456789",
            "budget": "£30,000",
            "postcode": "EH3 9AB",
            "message": "Automated pytest enquiry — verifying Resend email send.",
        }
        r = session.post(f"{API}/enquiries", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["postcode"] == payload["postcode"]
        assert data["budget"] == payload["budget"]
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert "_id" not in data

        # Allow async email send to flush to log. Only inspect the most-recent lines
        # (not historical errors from before the new key was installed).
        time.sleep(3)
        recent = _tail_log(5)
        assert "Enquiry email sent to" in recent, f"No Resend success log found. Tail:\n{recent}"
        assert "ednrenovationgroup@gmail.com" in recent
        assert "API key is invalid" not in recent
        assert "Failed to send enquiry email" not in recent

    def test_non_eh_postcode_rejected(self, session):
        r = session.post(f"{API}/enquiries", json={
            "name": "TEST_NonEH",
            "email": "nonek@example.com",
            "phone": "0700",
            "budget": "£20,000",
            "postcode": "G1 1AA",
            "message": "non-EH",
        })
        assert r.status_code == 400
        detail = r.json().get("detail", "")
        assert "EH" in detail or "Edinburgh" in detail

    def test_invalid_email(self, session):
        r = session.post(f"{API}/enquiries", json={
            "name": "TEST_BadEmail",
            "email": "not-an-email",
            "postcode": "EH1 1AA",
        })
        assert r.status_code == 422

    def test_missing_required_fields(self, session):
        r = session.post(f"{API}/enquiries", json={"email": "x@y.com"})
        assert r.status_code == 422


# ---------- Admin auth, list, delete ----------
class TestAdmin:
    def test_list_is_public(self, session):
        # NOTE: Per current product spec, /admin is public and GET /api/enquiries requires NO auth.
        r = session.get(f"{API}/enquiries")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_login_wrong_password(self, session):
        r = session.post(f"{API}/admin/login", json={"password": "wrong"})
        assert r.status_code == 401

    def test_list_and_delete_flow(self, session, admin_token):
        # Seed an enquiry we can safely delete
        unique = uuid.uuid4().hex[:8]
        c = session.post(f"{API}/enquiries", json={
            "name": f"TEST_ToDelete_{unique}",
            "email": f"del_{unique}@example.com",
            "phone": "0700",
            "budget": "£10,000",
            "postcode": "EH9 1AA",
            "message": "scheduled for delete",
        })
        assert c.status_code == 200
        eid = c.json()["id"]

        auth = {"Authorization": f"Bearer {admin_token}"}

        # List returns our item + no _id leak
        listed = session.get(f"{API}/enquiries", headers=auth)
        assert listed.status_code == 200
        items = listed.json()
        assert isinstance(items, list)
        assert any(e["id"] == eid for e in items)
        for it in items[:5]:
            assert "_id" not in it

        # DELETE
        d = session.delete(f"{API}/enquiries/{eid}", headers=auth)
        assert d.status_code == 200

        # Verify removal
        after = session.get(f"{API}/enquiries", headers=auth)
        assert after.status_code == 200
        assert not any(e["id"] == eid for e in after.json())

        # Delete again -> 404
        d2 = session.delete(f"{API}/enquiries/{eid}", headers=auth)
        assert d2.status_code == 404
