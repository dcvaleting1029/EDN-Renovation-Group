from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Resend email config
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL')
ENQUIRY_RECIPIENT = os.environ.get('ENQUIRY_RECIPIENT')


def _build_enquiry_email(enquiry: "Enquiry") -> str:
    return f"""
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111111; max-width: 560px; margin: 0 auto;">
      <h2 style="font-weight: 600; margin-bottom: 4px;">New Website Enquiry</h2>
      <p style="color: #6B6B6B; margin-top: 0;">EDN Renovation Group</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 10px 0; color: #6B6B6B; width: 130px;">Name</td><td style="padding: 10px 0; font-weight: 600;">{enquiry.name}</td></tr>
        <tr><td style="padding: 10px 0; color: #6B6B6B;">Email</td><td style="padding: 10px 0;">{enquiry.email}</td></tr>
        <tr><td style="padding: 10px 0; color: #6B6B6B;">Phone</td><td style="padding: 10px 0;">{enquiry.phone or '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #6B6B6B;">Budget</td><td style="padding: 10px 0;">{enquiry.budget or '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #6B6B6B;">Postcode</td><td style="padding: 10px 0;">{enquiry.postcode or '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #6B6B6B; vertical-align: top;">Message</td><td style="padding: 10px 0;">{enquiry.message or '—'}</td></tr>
      </table>
      <p style="color: #6B6B6B; font-size: 12px; margin-top: 24px;">Received {enquiry.created_at.strftime('%d %b %Y, %H:%M UTC')}</p>
    </div>
    """


async def send_enquiry_email(enquiry: "Enquiry"):
    if not resend.api_key or not SENDER_EMAIL or not ENQUIRY_RECIPIENT:
        logger.warning("Resend not configured; skipping enquiry email.")
        return
    params = {
        "from": SENDER_EMAIL,
        "to": [ENQUIRY_RECIPIENT],
        "reply_to": enquiry.email,
        "subject": f"New Enquiry — {enquiry.name}",
        "html": _build_enquiry_email(enquiry),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Enquiry email sent: {result.get('id')}")
    except Exception as e:
        logger.error(f"Failed to send enquiry email: {e}")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    budget: Optional[str] = ""
    postcode: Optional[str] = ""
    message: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    budget: Optional[str] = ""
    postcode: Optional[str] = ""
    message: Optional[str] = ""


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "EDN Renovation Group API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    if input.postcode and not input.postcode.strip().upper().startswith("EH"):
        raise HTTPException(status_code=400, detail="We currently only cover Edinburgh (EH) postcodes.")
    enquiry = Enquiry(**input.model_dump())
    doc = enquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.enquiries.insert_one(doc)
    await send_enquiry_email(enquiry)
    return enquiry


@api_router.get("/enquiries", response_model=List[Enquiry])
async def get_enquiries():
    enquiries = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for e in enquiries:
        if isinstance(e['created_at'], str):
            e['created_at'] = datetime.fromisoformat(e['created_at'])
    return enquiries


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
