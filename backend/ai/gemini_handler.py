import sys
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

def summarize_or_qa(text, mode, query=None):
    model = genai.GenerativeModel("gemini-2.0-flash")

    if mode == "summary":
        prompt = f"Summarize the following text:\n\n{text}"
    elif mode == "qa":
        if not query:
            return "Query is required for Q&A mode."
        prompt = f"Answer this question based on the following text:\nText:\n{text}\n\nQuestion: {query}"
    else:
        return "Invalid mode."

    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    mode = sys.argv[1]
    query = sys.argv[2] if sys.argv[2] != "null" else None
    file_path = sys.argv[3]

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    output = summarize_or_qa(content, mode, query)
    print(output)
