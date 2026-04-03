import os
import uuid
import json
import logging
from datetime import datetime, timezone

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from pymongo import MongoClient
from dotenv import load_dotenv

from .serializers import ContactSubmissionSerializer, NewsletterSubscribeSerializer

load_dotenv(os.path.join(settings.BASE_DIR, '.env'))

mongo_url = os.environ.get('MONGO_URL', settings.MONGO_URL)
mongo_client = MongoClient(mongo_url)
db = mongo_client[os.environ.get('DB_NAME', settings.DB_NAME)]

logger = logging.getLogger(__name__)


def _cors_json_response(data, status=200):
    response = JsonResponse(data, status=status, safe=False)
    response['Access-Control-Allow-Origin'] = os.environ.get('CORS_ORIGINS', settings.CORS_ORIGINS)
    response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response


@require_http_methods(['GET'])
def root(request):
    logger.info('Received health check from %s', request.META.get('REMOTE_ADDR'))
    return _cors_json_response({'message': 'Sweat & Save API is running', 'status': 'healthy'})


@csrf_exempt
@require_http_methods(['POST', 'OPTIONS'])
def subscribe_newsletter(request):
    if request.method == 'OPTIONS':
        logger.info('Received OPTIONS preflight for /api/newsletter from %s', request.META.get('REMOTE_ADDR'))
        return _cors_json_response({}, status=204)

    try:
        payload = json.loads(request.body.decode('utf-8') or '{}')
    except Exception:
        payload = {}

    logger.info('Received newsletter request from %s data=%s', request.META.get('REMOTE_ADDR'), payload)
    data = NewsletterSubscribeSerializer(data=payload)
    if not data.is_valid():
        return _cors_json_response({'errors': data.errors}, status=400)

    email = data.validated_data['email']
    existing = db.newsletter_subscribers.find_one({'email': email})
    if existing:
        return _cors_json_response({
            'id': existing.get('id'),
            'email': existing['email'],
            'subscribed_at': existing['subscribed_at'],
            'message': 'You are already subscribed!'
        })

    doc = {
        'id': str(uuid.uuid4()),
        'email': email,
        'subscribed_at': datetime.now(timezone.utc).isoformat(),
        'active': True,
    }
    db.newsletter_subscribers.insert_one(doc)

    return _cors_json_response({
        'id': doc['id'],
        'email': doc['email'],
        'subscribed_at': doc['subscribed_at'],
        'message': 'Successfully subscribed to the Sweat & Save newsletter!'
    }, status=201)


@require_http_methods(['GET'])
def get_subscribers(request):
    logger.info('Received get_subscribers request from %s', request.META.get('REMOTE_ADDR'))
    subscribers = list(db.newsletter_subscribers.find({}, {'_id': 0}))
    return _cors_json_response({'count': len(subscribers), 'subscribers': subscribers})


@csrf_exempt
@require_http_methods(['POST', 'OPTIONS'])
def submit_contact(request):
    if request.method == 'OPTIONS':
        logger.info('Received OPTIONS preflight for /api/contact from %s', request.META.get('REMOTE_ADDR'))
        return _cors_json_response({}, status=204)

    try:
        payload = json.loads(request.body.decode('utf-8') or '{}')
    except Exception:
        payload = {}

    logger.info('Received contact request from %s data=%s', request.META.get('REMOTE_ADDR'), payload)
    data = ContactSubmissionSerializer(data=payload)
    if not data.is_valid():
        return _cors_json_response({'errors': data.errors}, status=400)

    payload = data.validated_data
    doc = {
        'id': str(uuid.uuid4()),
        'name': payload['name'],
        'email': payload['email'],
        'subject': payload['subject'],
        'message': payload['message'],
        'submitted_at': datetime.now(timezone.utc).isoformat(),
        'read': False,
    }
    db.contact_submissions.insert_one(doc)

    return _cors_json_response({
        'id': doc['id'],
        'name': doc['name'],
        'email': doc['email'],
        'subject': doc['subject'],
        'message': doc['message'],
        'submitted_at': doc['submitted_at'],
        'message_sent': "Your message has been received! We'll get back to you within 24-48 hours."
    }, status=201)


@require_http_methods(['GET'])
def get_contact_submissions(request):
    logger.info('Received get_contact_submissions request from %s', request.META.get('REMOTE_ADDR'))
    submissions = list(db.contact_submissions.find({}, {'_id': 0}))
    return _cors_json_response({'count': len(submissions), 'submissions': submissions})
