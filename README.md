# 📄 DocMind AI – AI PDF Chat Assistant

An AI-powered PDF Chat Assistant that enables users to upload PDF documents and ask questions about their contents using natural language. The application uses Retrieval-Augmented Generation (RAG), semantic search, embeddings, and Google's Gemini Large Language Model (LLM) to provide context-aware answers based on the uploaded document.

---

## 🚀 Features

* Upload PDF documents
* Extract and process document text
* Split documents into semantic text chunks
* Generate embeddings for document chunks
* Semantic search for relevant context
* Chat with PDFs using natural language
* Persistent chat history
* Manage uploaded documents
* Delete PDF documents
* Modern and responsive user interface

---

## 🛠️ Tech Stack

### Frontend

* React
* Axios
* CSS

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* PyMuPDF

### AI

* Google Gemini API
* Google Gemini LLM
* Embeddings
* Retrieval-Augmented Generation (RAG)

---

## ⚙️ How It Works

1. Upload a PDF document.
2. Extract text from the PDF.
3. Split the text into smaller chunks.
4. Generate embeddings for each chunk.
5. Perform semantic search to retrieve the most relevant context.
6. Send the retrieved context together with the user's question to the Google Gemini LLM.
7. Return a context-aware answer based on the uploaded document.

---

## 📁 Project Structure

```text
ai-pdf-chat-assistant/
│
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── assets/
│   ├── home-page.png
│   ├── upload-document.png
│   ├── chat-demo.png
│   └── delete-document.png
│
├── .gitignore
└── README.md
```

---

## 📸 Screenshots

### Home Page

![Home Page](assets/home-page.png)

### Upload Document

![Upload Document](assets/upload-document.png)

### Chat with PDF

![Chat Demo](assets/chat-demo.png)

### Delete Document

![Delete Document](assets/delete-document.png)

---

## 💻 Installation

### Clone the repository

```bash
git clone https://github.com/zainabnoorriaz/ai-pdf-chat-assistant.git
```

### Backend

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🎯 Future Improvements

* Multiple document support in a single conversation
* User authentication
* Conversation export
* Streaming AI responses
* Cloud database integration
* Docker deployment

---

## 👩‍💻 Author

**Zainab Noor**

GitHub: https://github.com/zainabnoorriaz

LinkedIn: https://www.linkedin.com/in/zainabnoorriaz
