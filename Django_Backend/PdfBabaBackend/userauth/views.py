from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import User,UserPdf
import jwt
from django.core.exceptions import ObjectDoesNotExist
import json
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from dotenv import load_dotenv
import os
import glob
from django.conf import settings

def get_pdf_paths():
    # Construct the path to the "media/pdfs/" directory
    pdfs_directory = os.path.join(settings.MEDIA_ROOT, 'pdfs')  # Use 'pdfs' as your directory name

    # Use glob to find all PDF files in the directory
    pdf_paths = glob.glob(os.path.join(pdfs_directory, '*.pdf'))

    return pdf_paths


@method_decorator(csrf_exempt, name='dispatch')
class UserRegistrationView(View):

    def post(self, request, *args, **kwargs):
        try:
            
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data.'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'message': 'User already registered with this username.'}, status=409)
        if not username or not password:
            return JsonResponse({'message': 'Username and password are required.'}, status=400)

        user = User(username=username, password=password)
        user.save()

        return JsonResponse({'messsage': 'User registered successfully.'}, status=201)

class UserLoginView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

        try:
            user = User.objects.get(username=username, password=password)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials.'}, status=401)

        # Create and return a simple JWT token containing the username
        token = jwt.encode({'username': user.username}, 'secret', algorithm='HS256')
        return JsonResponse({'token': token}, status=200)
    
#pdf upload

@method_decorator(csrf_exempt, name='dispatch')
# class PDFUploadView(View):

#     @method_decorator(csrf_exempt)
#     def dispatch(self, *args, **kwargs):
#         return super().dispatch(*args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         try:
#             data = json.loads(request.body)
#             username = data.get('username')
#             token = data.get('token')
#             file_data = data.get('file')  # Retrieve the JSON file data
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

#         try:
#             user = User.objects.get(username=username)
#         except ObjectDoesNotExist:
#             return JsonResponse({'error': 'User not found.'}, status=404)

#         # Validate token using JWT
#         try:
#             decoded_token = jwt.decode(token, 'secret', algorithms=['HS256'])
#             if decoded_token['username'] != username:
#                 return JsonResponse({'error': 'Invalid token.'}, status=401)
#         except jwt.ExpiredSignatureError:
#             return JsonResponse({'error': 'Token has expired.'}, status=401)
#         except jwt.DecodeError:
#             return JsonResponse({'error': 'Invalid token.'}, status=401)

#         # Check if file_data is provided in the JSON request
#         if not file_data:
#             return JsonResponse({'error': 'File data is required.'}, status=400)

#         # Process and save the file_data (assuming it's JSON data) to the user's pdf_file field
#         user.pdf_file = json.dumps(file_data)
#         user.save()

#         return JsonResponse({'message': 'JSON file uploaded successfully.'}, status=201)
def get_pdf_text(pdf_docs):
   
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    print("text: ", text)
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

def get_chatbot_responses(pdf_docs, user_question):
    raw_text = get_pdf_text(pdf_docs)
    text_chunks = get_text_chunks(raw_text)
    vectorstore = get_vectorstore(text_chunks)
   
    conversation_chain = get_conversation_chain(vectorstore)
    
    response = conversation_chain({'question': user_question})
    chat_history = response['chat_history']
    chatbot_responses = []
    
    for i, message in enumerate(chat_history):
        if i % 2 != 0:
            chatbot_responses.append(message.content)
    
    return chatbot_responses

def man(pdf_docs,user_question):
    load_dotenv()
    user_chat = []
    print(user_chat)
    chatbot_responses = get_chatbot_responses(pdf_docs, user_question)
    user_chat.append({'question': user_question, 'response': chatbot_responses[0]})
    for idx, response in enumerate(chatbot_responses):
        return(f" 🤖 : {response}")


class PDFUploadView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    def post(self, request, *args, **kwargs):
        try:
            pdf_name = request.POST.get("pdf_name")
            print(pdf_name)
            pdf_file = request.FILES['pdf_file']
            user_question = request.POST.get("user_question")
            user_pdf = UserPdf(pdf_file=pdf_file)
            user_pdf.save()
        except KeyError:
            return JsonResponse({'error': 'No PDF file provided.'}, status=400)

       
        pdf_docs = get_pdf_paths()
        ans = man(pdf_docs,user_question)
        return JsonResponse({'message': 'PDF uploaded and processed successfully.',"ans":ans}, status=200)
        


def list_pdfs(request):
    # Get the path to the PDFs directory
    pdfs_dir = os.path.join(settings.MEDIA_ROOT, 'pdfs')

    # List all files in the PDFs directory
    pdf_files = [f for f in os.listdir(pdfs_dir) if f.endswith('.pdf')]

    # Extract only the file names without extensions
    pdf_names = [os.path.splitext(pdf)[0] for pdf in pdf_files]

    return JsonResponse({'pdf_names': pdf_names})
    
@method_decorator(csrf_exempt, name='dispatch')

class DeleteAllPDFsView(View):

    def post(self, request, *args, **kwargs):
        try:
            # Delete all PDFs from the database
            UserPdf.objects.all().delete()
            pdfs_directory = os.path.join(settings.MEDIA_ROOT, 'pdfs')
            for pdf_file in os.listdir(pdfs_directory):
                if pdf_file.endswith('.pdf'):
                    file_path = os.path.join(pdfs_directory, pdf_file)
                    os.remove(file_path)

            return JsonResponse({'message': 'All PDFs deleted successfully.'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class OnlyUploadPdf(View):
    def post(self, request, *args, **kwargs):
        try:
            pdf_name = request.POST.get("pdf_name")
            print(pdf_name)
            pdf_file = request.FILES['pdf_file']
            user_pdf = UserPdf(pdf_file=pdf_file)
            user_pdf.save()
        except KeyError:
            return JsonResponse({'error': 'No PDF file provided.'}, status=400)

        return JsonResponse({'message': 'PDF uploaded successfully.'}, status=200)

class AnswerQuestion(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            user_question = request.POST.get("user_question")
        except KeyError:
            return JsonResponse({'error': 'No user question provided.'}, status=400)

        # Get the paths to the PDFs stored in the database
        pdf_docs = get_pdf_paths()

        # Process the user's question and get chatbot responses
        ans = man(pdf_docs,user_question)

        # Construct a response JSON with the chatbot's answers
        data = {
            'message': 'Question answered successfully.',
            'ans': ans
        }

        return JsonResponse(data, status=200)

       