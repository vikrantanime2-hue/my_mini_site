# app.py

from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load GPT-2 small model for text generation
chatbot = pipeline('text-generation', model='gpt2')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({'response': "Kuch to bolo yaar!"})

    # Generate response (max 50 tokens)
    result = chatbot(user_input, max_length=50, num_return_sequences=1)
    response = result[0]['generated_text']

    # Thoda clean kar dete hain, user input hata ke
    if response.lower().startswith(user_input.lower()):
        response = response[len(user_input):].strip()

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)