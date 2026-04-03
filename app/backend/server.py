from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Sweat & Save API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ── Models ──────────────────────────────────────────────
class NewsletterSubscribe(BaseModel):
    email: EmailStr

class NewsletterResponse(BaseModel):
    id: str
    email: str
    subscribed_at: str
    message: str

class ContactSubmission(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    submitted_at: str
    message_sent: str


# ── Routes ──────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "Sweat & Save API is running", "status": "healthy"}


@api_router.post("/newsletter", response_model=NewsletterResponse)
async def subscribe_newsletter(data: NewsletterSubscribe):
    """Subscribe to the newsletter."""
    existing = await db.newsletter_subscribers.find_one({"email": data.email})
    if existing:
        return NewsletterResponse(
            id=existing.get("id", str(uuid.uuid4())),
            email=data.email,
            subscribed_at=existing.get("subscribed_at", datetime.now(timezone.utc).isoformat()),
            message="You are already subscribed!"
        )

    doc = {
        "id": str(uuid.uuid4()),
        "email": data.email,
        "subscribed_at": datetime.now(timezone.utc).isoformat(),
        "active": True,
    }
    await db.newsletter_subscribers.insert_one(doc)
    logger.info(f"New newsletter subscriber: {data.email}")

    return NewsletterResponse(
        id=doc["id"],
        email=doc["email"],
        subscribed_at=doc["subscribed_at"],
        message="Successfully subscribed to the Sweat & Save newsletter!"
    )


@api_router.get("/newsletter/subscribers")
async def get_subscribers():
    """Get all newsletter subscribers (admin use)."""
    subs = await db.newsletter_subscribers.find({}, {"_id": 0}).to_list(1000)
    return {"count": len(subs), "subscribers": subs}


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(data: ContactSubmission):
    """Submit a contact form message."""
    doc = {
        "id": str(uuid.uuid4()),
        "name": data.name,
        "email": data.email,
        "subject": data.subject,
        "message": data.message,
        "submitted_at": datetime.now(timezone.utc).isoformat(),
        "read": False,
    }
    await db.contact_submissions.insert_one(doc)
    logger.info(f"New contact form submission from: {data.email} — {data.subject}")

    return ContactResponse(
        id=doc["id"],
        name=doc["name"],
        email=doc["email"],
        subject=doc["subject"],
        message=doc["message"],
        submitted_at=doc["submitted_at"],
        message_sent="Your message has been received! We'll get back to you within 24-48 hours."
    )


@api_router.get("/contact/submissions")
async def get_contact_submissions():
    """Get all contact form submissions (admin use)."""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    return {"count": len(submissions), "submissions": submissions}


# ── App Setup ────────────────────────────────────────────
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()