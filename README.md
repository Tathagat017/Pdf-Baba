# Pdf-Baba
A Open AI , Longchain and  Streamlit application that utilizes the power of LangChain and OpenAI's language model to provide a conversational Q&A chatbot which build a conversation around pdf uploaded. Users can upload a PDF document, and the chatbot will answer questions about the document's content. The application allows you to chat with multiple PDF documents. You can ask questions about the PDFs using natural language, and the application will provide relevant responses based on the content of the documents. This app utilizes a language model to generate accurate answers to your queries. Please note that the app will only respond to questions related to the loaded PDFs.

## Video Demonstration 



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

## Application Features : 

### Login / Register (Protected Routes)



