from django.conf import settings
from django.conf.urls.static import static
from .views import UserRegistrationView, UserLoginView, PDFUploadView 
from . import views 
from django.urls import path
urlpatterns = [
    path('user/register/', UserRegistrationView.as_view(), name='user-register'),
    path('user/login/', UserLoginView.as_view(), name='user-login'),
    path('pdf/upload/', PDFUploadView.as_view(), name='pdf-upload'),
    path('pdf/list/', views.list_pdfs, name='list_pdfs'),
    path('pdf/delete-all/', views.DeleteAllPDFsView.as_view(), name='delete_all_pdfs'),
    path('pdf/upload-only/', views.OnlyUploadPdf.as_view(), name='pdf-upload-only'), 
    path('pdf/answer-question/', views.AnswerQuestion.as_view(), name='answer_question'),
    path('pdf/delete-by-name/', views.DeleteAllInstancesOfPDFView.as_view(), name='delete_pdf_by_name'),
   
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
