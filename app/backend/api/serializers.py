from rest_framework import serializers


class NewsletterSubscribeSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ContactSubmissionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=255)
    message = serializers.CharField()
