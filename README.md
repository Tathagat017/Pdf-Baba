# Pdf-Baba
A Open AI , Longchain and  Streamlit application that utilizes the power of LangChain and OpenAI's language model to provide a conversational Q&A chatbot which build a conversation around pdf uploaded. Users can upload a PDF document, and the chatbot will answer questions about the document's content. The application allows you to chat with multiple PDF documents. You can ask questions about the PDFs using natural language, and the application will provide relevant responses based on the content of the documents. This app utilizes a language model to generate accurate answers to your queries. Please note that the app will only respond to questions related to the loaded PDFs.

## **Installation & Getting Started**
### Front-End (React.js) :
1. Clone the repository: **`git clone <https://github.com/Tathagat017/Pdf-Baba.git>`**
2. Navigate to folder : **`frontend_pdf/pdf_baba`**
3. Install dependencies: **`npm install`**
4. Start the guided tour: **`npm start`**

###Back-End (Django)
1. Clone the repository: **`git clone <https://github.com/Tathagat017/Pdf-Baba.git>`**
2. Navigate to folder : **`Django_Backend/PdfBabaBackend`**
3. Install dependencies: **`pip: -r requirements.txt`**
4. Start the guided tour: **`python manage.py runservert`**

## CLICK ON IMAGE BELOW TO WATCH PRESSENTATION
[![Watch the video](https://cdn.movavi.io/pages/0012/74/9211a347fc630483f3edf014cde647c0a7669c34.webp)
)](https://vimeo.com/861875160/0104dd27d8?share=copy)

[![Watch the video](![youtube](https://github.com/Tathagat017/Pdf-Baba/assets/114250830/4b1206e7-059c-4d81-9b1d-44bebc86b379)
)
)]([https://vimeo.com/861875160/0104dd27d8?share=copy](https://youtu.be/EALCVASQ5F8?si=wme3hJsDfzt_S-q7))


## Design Architecture
![pdf_baba_architecture_flow](https://github.com/Tathagat017/Pdf-Baba/assets/114250830/9385b5a1-a485-4cd6-8bab-add4ec7981a9)


The chatbot works in several steps:

Upload PDF: You upload the desired PDF file that you want to ask questions about.

Text Extraction: The bot uses the PyPDF2 library to read the PDF file and extract text from it.

Text Splitting: The bot then splits the text into smaller chunks to overcome token limit issue and understand the content.

Embeddings Creation: Using OpenAIEmbeddings, the bot creates text embeddings from the chunks.

Document Search Creation: The bot then uses these embeddings to create a document search via the FAISS vectorstore.

Conversational Chain Creation: A LangChain ConversationalRetrievalChain is created using the OpenAI model and the document retriever.

User Query: Finally, you enter your query. The bot will provide a response based on the contents of the uploaded PDF, also citing the source sections from the PDF.

![flow_chart2](https://github.com/Tathagat017/Pdf-Baba/assets/114250830/b8067abb-fea7-4839-82b5-42a3b9b8bb78)

###Login / Register (Protected Route :Front-End and Backend)

![register](https://github.com/Tathagat017/Pdf-Baba/assets/114250830/f9c0aa76-d386-48dc-a812-b8aeea5402fb)

![login_dark](https://github.com/Tathagat017/Pdf-Baba/assets/114250830/d0498302-a86c-4d10-90e4-f28478de95cd)

![login_light](https://github.com/Tathagat017/Pdf-Baba/assets/114250830/5f438314-91a1-4ef1-8f58-f0c831100b82)

### Chat 

![pdf_baba_chat](https://github.com/Tathagat017/Pdf-Baba/assets/114250830/9af8204a-84ab-4089-8596-3c5ddd83a3ab)


| Action | Endpoint | Request Body | Response |
| --- | --- | --- | --- |
| Register User | POST /api/user/register | username (String, required), email (String, required) | User object with id, username, email |
| Log In User | POST /api/user/login | username (String, required),passwordr(required) | User object with id, username, email, access token |
| Upload PDF's  | POST /api/pdf/uploadAll | - | pdf_files(required),token(required) in form-data key value pair  |
| Upload Single PDF | POST /api/pdf/upploadOne | pdf_files(required),token(required) in form-data key value pair  |
| Get All PDF's | GET /api/list-pdfs | - | Array of pdf_names |
| POST user_question | POST /api/pdf/AnswerQuestion | - | JSON Response with ChatBot Answer |
| DELETE All PDF's | DELETE /api/deleteAll | - | Delete all Pdf's |
| DELETE ONE PDF | POST /api/delete-one-by-name/ | - | pdf_files(required),token(required) in form-data key value pair | - | json response - All instance of file deleted|

