from django.db import models
from django.contrib.auth.models import User

from django.contrib.auth.models import AbstractUser

from django.contrib.auth.models import  Group, Permission

from django.utils.translation import gettext_lazy as _
class CustomUser(AbstractUser):
    # Add custom fields and methods here
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='customuser_set',  # Add this line
        related_query_name='user',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='customuser_set',  # Add this line
        related_query_name='user',
    )
    pass



class PDFDocument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    document = models.FileField(upload_to='pdf_documents/')

    def __str__(self):
        return f"{self.user.username}'s PDF: {self.document.name}"

class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} at {self.timestamp}: {self.message}"
