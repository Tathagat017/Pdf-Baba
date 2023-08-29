from django.contrib import admin
from django.urls import path, include  # Import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('pdfchatapp/', include('pdfchatapp.urls')),  # Include app's URLs
]
