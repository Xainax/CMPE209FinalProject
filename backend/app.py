from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/analyze', methods = ['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)