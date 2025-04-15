from dotenv import load_dotenv
import os
from flask import Blueprint, jsonify, request
from google.genai import types
from google import genai


llm_bp = Blueprint('llm', __name__)


@llm_bp.route('/api/llm-query', methods=['POST'])
def generate():
    prompt = request.json.get("message")
    
    if not prompt:
        return jsonify({"error": "Missing message"}), 400
    
    api_key = os.getenv("GEMINI_API_KEY")

    
    client = genai.Client(api_key=api_key)
    chat = client.chats.create(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
        max_output_tokens=100,
    )
    )
    
    response = chat.send_message(prompt)
    print(response.text)

    return jsonify({"reply": response.text})


@llm_bp.route('/api-analyze', methods = ['POST'])
def analyze():
    data = request.get_json()
    email_body = data.get("body","").lower()

    if "click here" in email_body or "urgent" in email_body or "verify" in email_body:
        label = "Phishing"
        explanation = "Contains urgent language and call-to-action."
    elif "please review" in email_body or "unknown sender" in email_body:
        label = "Suspicious"
        explanation = "Might be legitimate but has warning signs."
    else:
        label = "Safe"
        explanation = "No phishing signals detected."

    return jsonify({
        "label": label,
        "explanation": explanation
    })