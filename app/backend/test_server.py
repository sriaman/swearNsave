import pytest
from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json() == {"message": "Sweat & Save API is running", "status": "healthy"}

def test_newsletter_subscription():
    response = client.post("/api/newsletter", json={"email": "test@example.com"})
    assert response.status_code == 200
    # Assuming it returns success, adjust based on actual response

def test_newsletter_invalid_email():
    response = client.post("/api/newsletter", json={"email": "invalid-email"})
    assert response.status_code == 422  # Validation error

def test_contact_form():
    contact_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Test Subject",
        "message": "Test message"
    }
    response = client.post("/api/contact", json=contact_data)
    assert response.status_code == 200
    # Adjust based on actual implementation