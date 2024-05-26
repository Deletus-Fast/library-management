from flask import Flask, request, jsonify
import requests
import pathlib
import textwrap
from flask_cors import CORS

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown



app = Flask(__name__)
CORS(app)

model = genai.GenerativeModel('gemini-pro')

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        summary_prompt = f"Summarize the book called {prompt} in 200 words. Make sure to not include any styles in the text, and add new line tags where needed as the response will be shown on another webpage."
        summary = model.generate_content(summary_prompt)
        print(summary.prompt_feedback)
        return jsonify(summary.text), 200
    except Exception as err:
        print(f"Error summarizing book: {err}")
        return jsonify({"error": "Error summarizing book. Please check logs for details."}), 500

@app.route('/AiSearch', methods=['POST'])
def ai_search():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        search_prompt = f"If a book with the name {prompt} exists, then Summarize the book in 200 words, also specify the author, else just say that it does not exist. Make sure to not include any styles in the text, and add new line tags where needed as the response will be shown on another webpage."
        summary = model.generate_content(search_prompt)
        print(summary.prompt_feedback)
        return jsonify(summary.text), 200
    except Exception as err:
        print(f"Error summarizing book: {err}")
        return jsonify({"error": "Error summarizing book. Please check logs for details."}), 500

@app.route('/recommend', methods=['POST'])
def ai_recommend():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        search_prompt = f"If a book category called {prompt} exists, then recommend a list of 10 books of that category, also specify the author, else just say that it does not exist. Make sure to not include any styles in the text, and add new line tags where needed as the response will be shown on another webpage. Also show each book in a new line. You can write the new line tag as <br>."
        summary = model.generate_content(search_prompt)
        print(summary.prompt_feedback)
        return jsonify(summary.text), 200
    except Exception as err:
        print(f"Error summarizing book: {err}")
        return jsonify({"error": "Error summarizing book. Please check logs for details."}), 500


if __name__ == '__main__':
    app.run(debug=True)
