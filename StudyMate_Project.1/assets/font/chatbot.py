from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import spacy
import openai  # Nếu dùng OpenAI API
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/studymate"
mongo = PyMongo(app)
app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# User Registration
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if mongo.db.users.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already exists"}), 400
    mongo.db.users.insert_one(data)
    return jsonify({"message": "User registered successfully"}), 201

# User Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = mongo.db.users.find_one({"email": data["email"]})
    if user and user["password"] == data["password"]:
        access_token = create_access_token(identity=data["email"])
        return jsonify({"access_token": access_token})
    return jsonify({"error": "Invalid credentials"}), 401

# Search Documents
@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "")
    results = list(mongo.db.documents.find({"title": {"$regex": query, "$options": "i"}}))
    return jsonify(results)

# AI Chatbot
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    user_input = data["message"]
    doc = nlp(user_input)
    response = "Tôi không hiểu câu hỏi của bạn. Hãy thử lại."
    
    if "tài liệu" in user_input:
        suggestions = list(mongo.db.documents.find().limit(3))
        response = f"Bạn có thể tham khảo tài liệu: {', '.join([doc['title'] for doc in suggestions])}"
    
    if os.getenv("OPENAI_API_KEY"):
        openai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=[{"role": "user", "content": user_input}]
        )
        response = openai_response["choices"][0]["message"]["content"]
    
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
