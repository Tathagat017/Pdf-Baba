from django.views import View
from django.http import StreamingHttpResponse
import subprocess

class StreamlitAppView(View):
    def get(self, request):
        streamlit_process = subprocess.Popen(
            ['streamlit', 'run', '../../Basic_Application/app.py'],  # Replace with the actual path
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        def stream_response():
            while streamlit_process.poll() is None:
                output = streamlit_process.stdout.readline()
                if output:
                    yield output
            streamlit_process.communicate()

        response = StreamingHttpResponse(stream_response())
        response['Content-Type'] = 'text/plain'
        return response