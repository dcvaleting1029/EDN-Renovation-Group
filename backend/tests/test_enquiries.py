"""Backend API tests for EDN Renovation Group - enquiries endpoints"""
import os
import pytest
import requests
import uuid

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # fallback: read from /app/frontend/.env
    from pathlib import Path
    env = Path("/app/frontend/.env").read_text()
    for line in env.splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip()
            break
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data


# ---------- Enquiries ----------
class TestEnquiries:
    def test_create_enquiry_valid(self, session):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_User_{unique}",
            "email": f"test_{unique}@example.com",
            "phone": "+1-555-0100",
            "message": "Looking to renovate kitchen.",
        }
        r = session.post(f"{API}/enquiries", json=payload)
        assert r.status_code in (200, 201), f"got {r.status_code}: {r.text}"
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["message"] == payload["message"]

        # Persistence verification via GET list
        r2 = session.get(f"{API}/enquiries")
        assert r2.status_code == 200
        ids = [e["id"] for e in r2.json()]
        assert data["id"] in ids

    def test_create_enquiry_minimal(self, session):
        unique = uuid.uuid4().hex[:8]
        payload = {"name": f"TEST_Min_{unique}", "email": f"min_{unique}@example.com"}
        r = session.post(f"{API}/enquiries", json=payload)
        assert r.status_code in (200, 201)
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["phone"] == ""
        assert data["message"] == ""

    def test_create_enquiry_invalid_email(self, session):
        payload = {
            "name": "TEST_BadEmail",
            "email": "not-an-email",
            "phone": "",
            "message": "",
        }
        r = session.post(f"{API}/enquiries", json=payload)
        assert r.status_code == 422, f"expected 422, got {r.status_code}: {r.text}"

    def test_create_enquiry_missing_required(self, session):
        # Missing name
        r = session.post(f"{API}/enquiries", json={"email": "missing@example.com"})
        assert r.status_code == 422
        # Missing email
        r2 = session.post(f"{API}/enquiries", json={"name": "TEST_NoEmail"})
        assert r2.status_code == 422

    def test_get_enquiries_sorted_newest_first(self, session):
        # Create two enquiries and verify the newest appears first
        u1 = uuid.uuid4().hex[:8]
        u2 = uuid.uuid4().hex[:8]
        r1 = session.post(
            f"{API}/enquiries",
            json={"name": f"TEST_A_{u1}", "email": f"a_{u1}@example.com"},
        )
        assert r1.status_code in (200, 201)
        id1 = r1.json()["id"]

        import time
        time.sleep(0.05)

        r2 = session.post(
            f"{API}/enquiries",
            json={"name": f"TEST_B_{u2}", "email": f"b_{u2}@example.com"},
        )
        assert r2.status_code in (200, 201)
        id2 = r2.json()["id"]

        listing = session.get(f"{API}/enquiries")
        assert listing.status_code == 200
        items = listing.json()
        assert isinstance(items, list)
        ids = [e["id"] for e in items]
        assert id1 in ids and id2 in ids
        # id2 should come before id1 in the list
        assert ids.index(id2) < ids.index(id1), "enquiries not sorted newest-first"

        # No mongo _id leaks
        for it in items[:5]:
            assert "_id" not in it
