# Deploying EDN Renovation Group to Render

This repo includes a `render.yaml` Blueprint that provisions **two services**:

1. **edn-backend** – FastAPI (Python web service)
2. **edn-frontend** – React static site (CRA/craco build)

You will also need a **MongoDB Atlas** database (Render does not host MongoDB).

---

## 1. Prerequisites
- Push this project to a GitHub/GitLab repo (use the "Save to GitHub" button in the chat input).
- Create a free **MongoDB Atlas** cluster and get its connection string
  (looks like `mongodb+srv://user:pass@cluster.xxxx.mongodb.net/?retryWrites=true&w=majority`).
- In Atlas → Network Access, allow access from anywhere (`0.0.0.0/0`) or Render's IPs.

## 2. Deploy with the Blueprint
1. In Render, click **New → Blueprint** and connect your repo.
2. Render reads `render.yaml` and creates both services.
3. When prompted, fill in the environment variables (they are `sync:false`, so not stored in git).

### edn-backend env vars
| Key | Value |
|-----|-------|
| `MONGO_URL` | your MongoDB Atlas connection string |
| `DB_NAME` | e.g. `edn_production` |
| `CORS_ORIGINS` | your frontend URL, e.g. `https://edn-frontend.onrender.com` |
| `RESEND_API_KEY` | your Resend API key |
| `SENDER_EMAIL` | `onboarding@resend.dev` (or a verified-domain sender) |
| `ENQUIRY_RECIPIENT` | email that receives enquiries |
| `PYTHON_VERSION` | `3.11.15` (already set in blueprint) |

### edn-frontend env vars
| Key | Value |
|-----|-------|
| `REACT_APP_BACKEND_URL` | your backend URL, e.g. `https://edn-backend.onrender.com` |
| `NODE_VERSION` | `20.18.0` (already set in blueprint) |

## 3. Order of operations
1. Let the **backend** deploy first and note its public URL.
2. Set the frontend's `REACT_APP_BACKEND_URL` to that backend URL, then deploy/redeploy the frontend.
3. Set the backend's `CORS_ORIGINS` to the frontend URL, then redeploy the backend.

> `REACT_APP_BACKEND_URL` is baked in at **build time**, so if you change it you must trigger a new frontend build.

## 4. Verify
- Backend health: open `https://<backend-url>/api/` → should return `{"message":"EDN Renovation Group API"}`.
- Frontend: open the frontend URL, submit the contact form, and confirm the enquiry appears at `/admin` and an email is received.

## Notes
- All API routes are prefixed with `/api`. The frontend calls `${REACT_APP_BACKEND_URL}/api/...`.
- The free Render plan spins services down when idle; the first request after idle may be slow (cold start).
- Never commit real secrets. The `.env` files in `backend/` and `frontend/` are for local/preview only; on Render use the dashboard env vars above.
