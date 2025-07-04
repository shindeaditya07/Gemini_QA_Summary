# PDF_QA_Summary_Gemini

An application built using NodeJS, Express and Google Gemini that allows users to upload PDF documents and interactively query and summarize their contents using Google’s Gemini AI models.

---

## Features

- **PDF or Word Documents Upload**  
  Upload and process single or multiple PDF files simultaneously.

- **Conversational Query Interface**  
  Ask questions about the PDF content and receive contextual answers.

- **Document Summarization**  
  Generate concise summaries from the uploaded documents.

- **Efficient Retrieval**  
  Utilizes text chunking, embeddings, and vector stores (e.g., FAISS or Pinecone) for fast and relevant responses.

- **Powered by Gemini API**  
  Leverages Google’s multimodal Gemini model for understanding PDFs, including text, tables, and images.

---

## Tech Stack

- Python 3.12+  
- PyPDF2 / pdfplumber (PDF text extraction)  
- Google Generative AI (Gemini) for summarization and Q&A  
- Node.js and Express (backend server)  
- MongoDB (stores previous user responses)  
- dotenv (environment variable management)

---

## Usage Flow

1. Upload one or more PDF files.  
2. View automatically extracted text.  
3. Generate a summary of the document(s).  
4. Ask questions via the chat interface.  
5. Receive answers generated by the Gemini model.

---

## How It Works

- **PDF to Text Extraction**  
  PDFs are read and parsed using PyPDF2 or pdfplumber to extract raw text.

- **Prompt Construction**  
  Extracted text is combined with the user’s query to create a prompt.

- **Response Generation**  
  The Gemini API processes the prompt and returns summarized answers or relevant responses based on the entire document context.

---

## Deployed Application

Access the live deployed app here:  
[https://pdf-qa-summary-gemini.onrender.com](https://pdf-qa-summary-gemini.onrender.com)

---

## Customization

You can customize the app by modifying:

- The Gemini model variant (e.g., `gemini-1.5-flash`, `gemini-2.0-flash`).  
- Prompt formatting strategies to better align user queries with PDF content.  
- Frontend UI built with HTML, CSS, and JavaScript for enhanced interactivity.  
- Backend logic in Node.js to manage PDF processing and API communication.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
