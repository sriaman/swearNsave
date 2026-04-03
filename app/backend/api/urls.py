from django.urls import path
from . import views

urlpatterns = [
    path('', views.root, name='api-root'),
    path('newsletter', views.subscribe_newsletter, name='subscribe-newsletter'),
    path('newsletter/subscribers', views.get_subscribers, name='get-subscribers'),
    path('contact', views.submit_contact, name='submit-contact'),
    path('contact/submissions', views.get_contact_submissions, name='get-contact-submissions'),
]
