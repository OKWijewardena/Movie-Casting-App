import os
import shutil
import cv2
from keras.models import load_model
import numpy as np
from pymongo import MongoClient


from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mongo_client = MongoClient("mongodb+srv://Oshan:0716029733@cluster0.qynfn.mongodb.net/")
db = mongo_client["Research_Project"]
collection = db["emotion"]
collection1 = db["messages"]
collection2 = db["emotion"]
collection3 = db["user"]
collection4 = db["user_description"]
collection5 = db["request"]

@app.route('/')
def hello_world():
    body = {"name": "oshan", "age": 12}
    return body

@app.route("/actor", methods=['POST'])
def process_image():
    if request.method == 'POST':
        # Define the folder to save the images
        image_folder = '/Users/okG/Documents/sliit 4th yr doc/Research project/web/23-064/Emotions Identification System/ActorImage'

        # Ensure the folder exists, if not, create it
        if not os.path.exists(image_folder):
            os.makedirs(image_folder)

        # Get the image file and user email from the request
        f = request.files.get('actor')
        user_email = request.form.get('user_email')
        user_name = request.form.get('user_name')
        user_description = request.form.get('user_description')
        if f is None:
            return jsonify({"error": "No image file provided."}), 400

        filename = secure_filename(f.filename)
        image_path = os.path.join(image_folder, filename)
        f.save(image_path)

        # Process the image and get the emotion output
        most_frequent_emotion = process(image_path)

        # Prepare data to insert into MongoDB
        data = []
        data.append({
            'image_path': f.filename,
            'emotion': most_frequent_emotion['emotion'],
            'score': float(most_frequent_emotion['score']),  # Convert score to Python float
            'user_email': user_email,  # Include user email in the data
            'user_name': user_name, # Include user name in the data
            'user_description': user_description # Include user description in the data
        })

        # Insert data into MongoDB
        collection.insert_many(data)

        response = jsonify(most_frequent_emotion)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

def most_frequent(List):
    if not List:
        return None
    return max(set(List), key=List.count)

def process(image_path):
    # Parameters for loading data and images
    detection_model_path = '../trained_models/detection_models/haarcascade_frontalface_default.xml'
    emotion_model_path = '../trained_models/emotion_models/Emotion_Model.hdf5'
    emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

    # Hyperparameters for bounding boxes shape
    emotion_offsets = (0, 0)

    # Loading models
    face_detection = cv2.CascadeClassifier(detection_model_path)
    emotion_classifier = load_model(emotion_model_path, compile=False)

    # Getting input model shapes for inference
    emotion_target_size = emotion_classifier.input_shape[1:3]

    gray_image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    gray_image = np.squeeze(gray_image)
    gray_image = gray_image.astype('uint8')
    faces = face_detection.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    tmp = {}  
    for face_id, (x, y, w, h) in enumerate(faces):
        x1, y1, x2, y2 = x, y, x + w, y + h  # Calculate face coordinates directly
        gray_face = gray_image[y1:y2, x1:x2]
        try:
            gray_face = cv2.resize(gray_face, (emotion_target_size))
        except:
            continue

        gray_face = gray_face.astype('float32')
        gray_face /= 255.0
        gray_face = np.expand_dims(gray_face, axis=0)
        gray_face = np.expand_dims(gray_face, axis=-1)
        emotion_scores = emotion_classifier.predict(gray_face) #emotion array
        emotion_label = np.argmax(emotion_scores) #finds the index of the emotion class with the highest probability
        emotion_text = emotion_labels[emotion_label] #predicts the emotion
        score = np.amax(emotion_scores) * 100

        tmp[face_id] = {'emotion': emotion_text, 'score': score}

    most_freq_emotion = most_frequent([face_data['emotion'] for face_data in tmp.values()])
    most_freq_score = max(tmp.values(), key=lambda x: x['score'])['score']
    return {'emotion': most_freq_emotion, 'score': most_freq_score}


@app.route('/api/messages', methods=['POST'])
def send_messages():
    data = request.get_json()
    actor_email = data.get('actor_email')
    director_email = data.get('director_email')
    message_text = data.get('message')
    user_name = data.get('name')

    # Store the message data in the database along with actor and director emails
    collection1.insert_one({
        'actor_email': actor_email,
        'director_email': director_email,
        'message': message_text,
        'name': user_name
    })

    return jsonify({"message": "Message sent successfully!"})

@app.route('/api/messages', methods=['GET'])
def get_messages():
    if request.method == 'GET':
        messages = list(collection1.find({}, {'_id': 0}))
        return jsonify(messages)
    
@app.route('/api/emotions', methods=['GET'])
def get_emotions():
    emotions = list(collection2.find({}, {'_id': 0}))
    return jsonify(emotions)

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    category = data.get('category')
    password = data.get('password')

    # Store the user data in the database
    collection3.insert_one({
        'name': name,
        'email': email,
        'category': category,
        'password': password
    })

    return jsonify({"message": "User registered successfully!"})

@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login_user():
    if request.method == 'OPTIONS':
        # Set CORS headers for pre-flight request
        response = jsonify({"success": True})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Perform login logic here (e.g., check credentials in the database)
    # For demonstration purposes, assuming the login is successful and the user category is returned
    user = collection3.find_one({'email': email, 'password': password})
    if user:
        category = user.get('category')
        return jsonify({"success": True, "category": category})
    else:
        return jsonify({"success": False})
    

@app.route('/api/description', methods=['POST'])
def user_description():
    data = request.get_json()
    demail = data.get('demail')
    description = data.get('description')

    # Store the user description in the database
    collection4.insert_one({
        'demail': demail,
        'description': description,
    })

    return jsonify({"message": "User description added successfully"})

@app.route('/api/description/<string:user_email>', methods=['GET'])
def get_user_description(user_email):
    # Find the user description based on the given user email in the database
    user = collection4.find_one({'demail': user_email})

    if user:
        description = user.get('description')
        return jsonify({"description": description})
    else:
        return jsonify({"error": "User not found"})
    
@app.route('/api/request', methods=['POST'])
def send_request():
    data = request.get_json()
    actor_email = data.get('actor_email')
    actor_name = data.get('actor_name')
    director_email = data.get('director_email')
    director_name = data.get('director_name')
    director_description = data.get('director_description')

    # Store the request data in the database
    collection5.insert_one({
        'actor_email': actor_email,
        'actor_name': actor_name,
        'director_email': director_email,
        'director_name': director_name,
        'director_description': director_description,
    })

    return jsonify({"message": "Request sent successfully!"})


@app.route('/api/request/<string:actor_email>', methods=['GET'])
def get_requests_by_actor_email(actor_email):
    # Find the requests based on the given actor email in the database
    requests = list(collection5.find({'actor_email': actor_email}, {'_id': 0}))

    if requests:
        return jsonify(requests)
    else:
        return jsonify({"error": "No requests found for the actor email"})
    
@app.route('/api/drequest/<string:director_email>', methods=['GET'])
def get_requests_by_director_email(director_email):
    # Find the requests based on the given actor email in the database
    requests = list(collection5.find({'director_email': director_email}, {'_id': 0}))

    if requests:
        return jsonify(requests)
    else:
        return jsonify({"error": "No requests found for the actor email"})
    

@app.route('/api/user/name', methods=['POST'])
def get_user_name():
    data = request.get_json()
    user_email = data.get('email')

    # Find the user based on the given email in the database
    user = collection3.find_one({'email': user_email})

    if user:
        user_name = user.get('name')
        return jsonify({"name": user_name})
    else:
        return jsonify({"error": "User not found"})
    
@app.route('/api/user/<string:user_email>', methods=['GET'])
def get_use_name(user_email):
    # Find the user description based on the given user email in the database
    user = collection3.find_one({'email': user_email})

    if user:
        name = user.get('name')

        return jsonify(name)
    else:
        return jsonify({"error": "User not found"})



if __name__ == "__main__":
    app.run(debug=True)

