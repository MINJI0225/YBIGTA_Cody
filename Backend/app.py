from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
import importlib.util
import os
from model import db, User
import torch

# get the current path of app.py
current_path = os.path.dirname(os.path.realpath(__file__))
model_path = os.path.join(current_path, '../Modeling/FashionModel/model.py')
spec = importlib.util.spec_from_file_location("model", model_path)
model = importlib.util.module_from_spec(spec)
spec.loader.exec_module(model)

# Load the model
model = model.PlainEfficientnetB7(num_classes=12)
model.load_state_dict(torch.load('../Modeling/FashionModel/checkpoints/best.pth', map_location=torch.device('cpu')))
model.eval()

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# @app.route('/predict', methods=['POST'])
## img = cv2.cvtColor(cv2.imread(img_path), cv2.COLOR_BGR2RGB) 이걸로 읽어와야함
# def predict():
#     data = request.json
#     input_tensor = process_input(data)  # You would need to define this function to process your input
#     with torch.no_grad():
#         output = model(input_tensor)
#     predictions = process_output(output)  # You would need to define this function to process your output
#     return jsonify(predictions)


@app.route("/image/upload", methods=["POST"])
def image_upload():
    files = request.files.getlist('image')
    breakpoint()
    if not files:
        return {'error': 'No images foun'}, 400

    return {'Success': "Image upload done"}, 200
            
@app.route('/api/saveData', methods=['POST'])
def handle_post():
    data = request.get_json()
    # Now data is a dictionary with keys 'gender', 'sensitivity1', 'sensitivity2', 'style'
    # Do something with the data here...
    # Return a response
    print(data)
    return jsonify({'result': 'Success!'})

@app.route('/api/saveUser', methods=['POST'])
def handle_user():
    data = request.get_json()
    # Now data is a dictionary with keys 'gender', 'sensitivity1', 'sensitivity2', 'style'
    # Do something with the data here...
    # Return a response
    print(data)
    return jsonify({'result': 'Success!'})


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return_value = jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
    
    return return_value

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id
    breakpoint()
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"