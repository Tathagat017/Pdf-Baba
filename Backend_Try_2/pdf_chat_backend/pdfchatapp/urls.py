from django.urls import path
from .views import CustomUserCreationView, ChatView, UploadPDFView, CustomLoginView,ProcessPDFView, SendMessageView
from django.contrib.auth import views as auth_views

from .views import CustomUserRegistrationView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='chat'),
    path('upload_pdf/', UploadPDFView.as_view(), name='upload_pdf'),
    path('process_pdf/', ProcessPDFView.as_view(), name='process_pdf'),
    path('send_message/', SendMessageView.as_view(), name='send_message'),
     path('register/', CustomUserRegistrationView.as_view(), name='register'),
     path('login/', CustomLoginView.as_view(), name='login'),  # New registration route
    # Add your login route here if needed
]
