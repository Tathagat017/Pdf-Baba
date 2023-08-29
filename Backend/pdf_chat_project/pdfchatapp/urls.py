from django.urls import path
from .views import StreamlitAppView

urlpatterns = [
    # ... Other views ...
    path('streamlit-app/', StreamlitAppView.as_view(), name='streamlit-app'),
]
