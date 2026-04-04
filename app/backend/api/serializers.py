from rest_framework import serializers
import bcrypt
from pymongo import MongoClient
import os
from django.conf import settings
from dotenv import load_dotenv
from datetime import datetime, timezone

load_dotenv(os.path.join(settings.BASE_DIR, '.env'))

mongo_url = os.environ.get('MONGO_URL', settings.MONGO_URL)
mongo_client = MongoClient(mongo_url)
db = mongo_client[os.environ.get('DB_NAME', settings.DB_NAME)]


class NewsletterSubscribeSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ContactSubmissionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=255)
    message = serializers.CharField()


class UserSignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=6)
    name = serializers.CharField(max_length=255)

    def create(self, validated_data):
        # Hash password
        password_hash = bcrypt.hashpw(
            validated_data['password'].encode('utf-8'),
            bcrypt.gensalt()
        ).decode('utf-8')

        user_doc = {
            'email': validated_data['email'],
            'password_hash': password_hash,
            'name': validated_data['name'],
            'created_at': datetime.now(timezone.utc).isoformat(),
            'active': True,
        }

        result = db.users.insert_one(user_doc)
        user_doc['_id'] = str(result.inserted_id)
        return user_doc


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = db.users.find_one({'email': data['email'], 'active': True})
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        if not bcrypt.checkpw(
            data['password'].encode('utf-8'),
            user['password_hash'].encode('utf-8')
        ):
            raise serializers.ValidationError('Invalid credentials')

        return user
