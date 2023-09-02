from django.conf import settings
from django.conf.urls.static import static
from .views import UserRegistrationView, UserLoginView,PDFUploadView
from django.urls import path
urlpatterns = [
    path('user/register/', UserRegistrationView.as_view(), name='user-register'),
    path('user/login/', UserLoginView.as_view(), name='user-login'),
    path('pdf/upload/', PDFUploadView.as_view(), name='pdf-upload'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
