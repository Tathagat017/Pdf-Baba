from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import User
import jwt
from django.core.exceptions import ObjectDoesNotExist
import json

@method_decorator(csrf_exempt, name='dispatch')
class UserRegistrationView(View):

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

        if not username or not password:
            return JsonResponse({'error': 'Username and password are required.'}, status=400)

        user = User(username=username, password=password)
        user.save()

        return JsonResponse({'message': 'User registered successfully.'}, status=201)

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
class PDFUploadView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            token = data.get('token')
            file_data = data.get('file')  # Retrieve the JSON file data
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)

        try:
            user = User.objects.get(username=username)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=404)

        # Validate token using JWT
        try:
            decoded_token = jwt.decode(token, 'secret', algorithms=['HS256'])
            if decoded_token['username'] != username:
                return JsonResponse({'error': 'Invalid token.'}, status=401)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired.'}, status=401)
        except jwt.DecodeError:
            return JsonResponse({'error': 'Invalid token.'}, status=401)

        # Check if file_data is provided in the JSON request
        if not file_data:
            return JsonResponse({'error': 'File data is required.'}, status=400)

        # Process and save the file_data (assuming it's JSON data) to the user's pdf_file field
        user.pdf_file = json.dumps(file_data)
        user.save()

        return JsonResponse({'message': 'JSON file uploaded successfully.'}, status=201)
