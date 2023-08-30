# forms.py
from django import forms
from .models import PDFDocument
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser  # Replace with your CustomUser model
        fields = ('username', 'password1', 'password2')

class PDFDocumentForm(forms.ModelForm):
    class Meta:
        model = PDFDocument
        fields = ('document',)
