# views.py
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import HuggingFaceHub
from .models import PDFDocument, ChatMessage
from .forms import CustomUserCreationForm
from PyPDF2 import PdfReader
# Other import statements for templates, etc.

from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from .forms import CustomUserCreationForm

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import CustomUserSerializer

from rest_framework.authtoken.models import Token




from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from pdfchatapp.models import CustomUser 
from django.contrib.auth.hashers import check_password



class CustomUserCreationView(CreateView):
    template_name = 'register.html'
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')

class CustomUserRegistrationView(CreateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = (AllowAny,)


class CustomLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = CustomUser.objects.get(username=username)

        
        print(user)
       
        print(user)
        if user is not None :
            # Create or get the user's token
            token = Token.objects.create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore):
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain


def handle_userinput(request, user_question):
    if not request.user.is_authenticated:
        return "User not authenticated"

    conversation_chain = request.session.get('conversation_chain')
    if not conversation_chain:
        return "Conversation chain not available"

    response = conversation_chain({'question': user_question})
    chat_history = response['chat_history']
    chat_responses = []

    for i, message in enumerate(chat_history):
        if i % 2 == 0:
            user_template = "{{MSG}}"
            user_message = message.content
            chat_responses.append(user_template.replace("{{MSG}}", user_message))
        else:
            bot_template = "{{MSG}}"
            bot_message = message.content
            chat_responses.append(bot_template.replace("{{MSG}}", bot_message))

    # Save user's chat message
    user_message = ChatMessage(user=request.user, message=user_question)
    user_message.save()

    # Save bot's chat messages
    for bot_message in chat_responses:
        bot_chat_message = ChatMessage(user=User.objects.get(username='bot'), message=bot_message)
        bot_chat_message.save()

    return chat_responses
    

class ChatView(APIView):
    def get(self, request):
        return render(request, 'chat.html', context={})

    def post(self, request):
        user_question = request.data.get("user_question")
        if user_question:
            handle_userinput(request, user_question)
            return Response({"message": "Response generated successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "No user question provided"}, status=status.HTTP_400_BAD_REQUEST)

class UploadPDFView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        uploaded_file = request.FILES.get('pdf_file')
        if not uploaded_file:
            return Response({"error": "No PDF file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        pdf_document = PDFDocument(user=request.user, document=uploaded_file)
        pdf_document.save()

        return Response({"message": "PDF uploaded successfully"}, status=status.HTTP_201_CREATED)

class ProcessPDFView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        pdf_documents = PDFDocument.objects.filter(user=request.user)
        if not pdf_documents.exists():
            return Response({"error": "No PDFs uploaded by the user"}, status=status.HTTP_404_NOT_FOUND)

        raw_text = get_pdf_text(pdf_documents)
        text_chunks = get_text_chunks(raw_text)
        vectorstore = get_vectorstore(text_chunks)
        conversation_chain = get_conversation_chain(vectorstore)

        chat_responses = []
        user_message = "Hello"  # User's initial message
        for _ in range(5):  # Generate 5 chat responses
            response = handle_userinput(user_message, conversation_chain)
            chat_responses.append({"user": "bot", "message": response})
            user_message = response  # Use bot's response as the next user message

        return Response({"responses": chat_responses}, status=status.HTTP_200_OK)

class SendMessageView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        message = request.data.get("message")
        if not message:
            return Response({"error": "Message missing"}, status=status.HTTP_400_BAD_REQUEST)

        # Save user's chat message
        chat_message = ChatMessage(user=request.user, message=message)
        chat_message.save()

        # Generate response using LangChain or other logic
        response = handle_userinput(message)  # Implement your response generation logic

        # Save bot's chat message
        bot_chat_message = ChatMessage(user=User.objects.get(username='bot'), message=response)
        bot_chat_message.save()

        return Response({"response": response}, status=status.HTTP_200_OK)
