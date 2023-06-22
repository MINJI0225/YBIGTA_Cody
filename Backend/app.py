from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from utils import process_imagefiles, predict, index_to_category, indices_of_top_n
from model import db, User, Styling, Codybti, UserStyle, MyCloset, MyCodi, Hashtag
import random
import torch
from model_wrapper import PlainEfficientnetB7

# Load the model
model = PlainEfficientnetB7(num_classes=12)
model.load_state_dict(torch.load('../Modeling/FashionModel/checkpoints/best.pth', map_location=torch.device('cpu')))
model.eval()


app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
server_session.init_app(app)
db.init_app(app)

'''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import json
from datetime import datetime
import math

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

db = SQLAlchemy(app)

# Define database models
class Styling(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    styling_date = db.Column(db.Date)
    view_num = db.Column(db.Integer)
    styling_txt = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    style_tag = db.Column(db.String(255))
    items = db.relationship('Item', secondary='item_styling', lazy='subquery',
                            backref=db.backref('stylings', lazy=True))
    styling_hashtags = db.relationship('Hashtag', secondary='styling_hashtags', lazy='subquery',
                                       backref=db.backref('stylings', lazy=True))

item_styling = db.Table('item_styling',
                        db.Column('item_id', db.Integer, db.ForeignKey('item.id'), primary_key=True),
                        db.Column('styling_id', db.Integer, db.ForeignKey('styling.id'), primary_key=True)
                        )

styling_hashtags = db.Table('styling_hashtags',
                            db.Column('styling_id', db.Integer, db.ForeignKey('styling.id'), primary_key=True),
                            db.Column('hashtag_id', db.Integer, db.ForeignKey('hashtag.id'), primary_key=True)
                        )

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    big_category = db.Column(db.String(255))
    small_category = db.Column(db.String(255))
    image_url = db.Column(db.String(255))
    avg_color_top_r = db.Column(db.Float)
    avg_color_top_g = db.Column(db.Float)
    avg_color_top_b = db.Column(db.Float)
    avg_color_bottom_r = db.Column(db.Float)
    avg_color_bottom_g = db.Column(db.Float)
    avg_color_bottom_b = db.Column(db.Float)
    avg_color_whole_r = db.Column(db.Float)
    avg_color_whole_g = db.Column(db.Float)
    avg_color_whole_b = db.Column(db.Float)
    styling_id = db.Column(db.Integer, db.ForeignKey('styling.id'))
    item_hashtags = db.relationship('Hashtag', secondary='item_hashtags', lazy='subquery',
                                    backref=db.backref('items', lazy=True))

item_hashtags = db.Table('item_hashtags',
                         db.Column('item_id', db.Integer, db.ForeignKey('item.id'), primary_key=True),
                         db.Column('hashtag_id', db.Integer, db.ForeignKey('hashtag.id'), primary_key=True)
                        )

class Hashtag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(255))

with app.app_context():
    db.create_all()

    with open(f'./codimap_list.json', 'r') as file:
            data = json.load(file)

    # Insert data into the existing tables
    for styling in data:
        styling_data = Styling(
            title=styling['title'],
            styling_date=datetime.strptime(styling['styling_date'], '%Y.%m.%d').date(),
            view_num=styling['view_num'],
            styling_txt=styling['styling_txt'],
            image_url=styling['image_url'],
            style_tag=styling['style_tag']
        )
        db.session.add(styling_data)
        db.session.flush()

        for item in styling['item_list']:
            item_data = Item.query.filter_by(title=item['title']).first()
            if not item_data:
                avg_color_top = item.get('avg_color_top', [])
                avg_color_bottom = item.get('avg_color_bottom', [])
                avg_color_whole = item.get('avg_color_whole', [])
                item_data = Item(
                    title=item['title'],
                    big_category=item['big_category'],
                    small_category=item['small_category'],
                    image_url=item['image_url'],
                    avg_color_top_r=avg_color_top[0] if avg_color_top and not math.isnan(avg_color_top[0]) else None,
                    avg_color_top_g=avg_color_top[1] if avg_color_top and not math.isnan(avg_color_top[1]) else None,
                    avg_color_top_b=avg_color_top[2] if avg_color_top and not math.isnan(avg_color_top[2]) else None,
                    avg_color_bottom_r=avg_color_bottom[0] if avg_color_bottom and not math.isnan(avg_color_bottom[0]) else None,
                    avg_color_bottom_g=avg_color_bottom[1] if avg_color_bottom and not math.isnan(avg_color_bottom[1]) else None,
                    avg_color_bottom_b=avg_color_bottom[2] if avg_color_bottom and not math.isnan(avg_color_bottom[2]) else None,
                    avg_color_whole_r=avg_color_whole[0] if avg_color_whole and not math.isnan(avg_color_whole[0]) else None,
                    avg_color_whole_g=avg_color_whole[1] if avg_color_whole and not math.isnan(avg_color_whole[1]) else None,
                    avg_color_whole_b=avg_color_whole[2] if avg_color_whole and not math.isnan(avg_color_whole[2]) else None
                )
                db.session.add(item_data)
                db.session.flush()

            styling_data.items.append(item_data)

            for hashtag in item['item_hashtags']:
                hashtag_data = Hashtag.query.filter_by(tag=hashtag).first()
                if not hashtag_data:
                    hashtag_data = Hashtag(tag=hashtag)
                    db.session.add(hashtag_data)
                    db.session.flush()

                item_data.item_hashtags.append(hashtag_data)

        for hashtag in styling['hashtags']:
            hashtag_data = Hashtag.query.filter_by(tag=hashtag).first()
            if not hashtag_data:
                hashtag_data = Hashtag(tag=hashtag)
                db.session.add(hashtag_data)
                db.session.flush()

            styling_data.styling_hashtags.append(hashtag_data)

    # Commit changes to the database
    db.session.commit()

'''
with app.app_context():
    db.create_all()


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
    user_id = session.get('user_id')

    if user_id:
        user = User.query.filter_by(id=user_id).first()
        if user:
            return jsonify({"Success": user_id}), 200
    
    return jsonify({"Error": user_id}) , 401

@app.route("/register", methods=["POST"])
def register_user():
    id = request.json["userId"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "이미 가입된 회원입니다"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(id=id, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session['user_id'] = new_user.id

    return_value = jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
    
    return return_value

@app.route("/login", methods=["POST"])
def login_user():
    id = request.json["userId"]
    password = request.json["password"]

    user = User.query.filter_by(id=id).first()
    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({
            "id": user.id,
            "email": user.email
        })
    else:
        return jsonify({"error": "Unauthorized"}), 401

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return jsonify({"success": "Logout"}), 200


#옷BTI POST
@app.route("/cbti/post", methods=["POST"])
def post_cbti():
    user_id = session.get("user_id")
    gender = request.json["gender"]
    cold = request.json["cold"]
    trend = request.json["trend"]

    cbti_exists = Codybti.query.filter_by(user_id=user_id).first()

    if cbti_exists:
        cbti_exists.gender = gender
        cbti_exists.cold = cold
        cbti_exists.trend = trend
        db.session.commit()
        return jsonify({"Success": "modified cbti"}), 200

    new_cbti = Codybti(user_id=user_id, gender=gender, cold=cold, trend=trend)
    db.session.add(new_cbti)
    db.session.commit()

    return_value = jsonify({
        "user_id": new_cbti.user_id,
        "gender": new_cbti.gender,
        "cold": new_cbti.cold,
        "trend": new_cbti.trend,
    })
    
    return return_value

#MyCloset POST
@app.route("/mycloset/post", methods=["POST"])
def post_closet():
    user_id = session.get("user_id")
    white_tshirt = request.json["white_tshirt"]
    black_tshirt = request.json["black_tshirt"]
    white_shirt = request.json["white_shirt"]
    black_shirt = request.json["black_shirt"]
    half_knit = request.json["half_knit"]
    long_knit = request.json["long_knit"]
    cardigan = request.json["cardigan"]
    black_slacks = request.json["black_slacks"]
    beige_slacks = request.json["beige_slacks"]
    sky_jean = request.json["sky_jean"]
    blue_jean = request.json["blue_jean"]
    white_cottonp = request.json["white_cottonp"]
    half_jean = request.json["half_jean"]
    white_skirt = request.json["white_skirt"]
    black_skirt = request.json["black_skirt"]

    existing_closet = MyCloset.query.filter_by(user_id=user_id).first()

    if existing_closet:
        existing_closet.white_tshirt = white_tshirt
        existing_closet.black_tshirt = black_tshirt
        existing_closet.white_shirt = white_shirt
        existing_closet.black_shirt = black_shirt
        existing_closet.half_knit = half_knit
        existing_closet.long_knit = long_knit
        existing_closet.cardigan = cardigan
        existing_closet.black_slacks = black_slacks
        existing_closet.beige_slacks = beige_slacks
        existing_closet.sky_jean = sky_jean
        existing_closet.blue_jean = blue_jean
        existing_closet.white_cottonp = white_cottonp
        existing_closet.half_jean = half_jean
        existing_closet.white_skirt = white_skirt
        existing_closet.black_skirt = black_skirt
        db.session.commit()
        return jsonify({
            "Success": "modify mycloset"
        })

    new_closet = MyCloset(
        user_id=user_id,
        white_tshirt=white_tshirt,
        black_tshirt=black_tshirt,
        white_shirt=white_shirt,
        black_shirt=black_shirt,
        half_knit=half_knit,
        long_knit=long_knit,
        cardigan=cardigan,
        black_slacks=black_slacks,
        beige_slacks=beige_slacks,
        sky_jean=sky_jean,
        blue_jean=blue_jean,
        white_cottonp=white_cottonp,
        half_jean=half_jean,
        white_skirt=white_skirt,
        black_skirt=black_skirt
    )

    db.session.add(new_closet)
    db.session.commit()

    return_value = jsonify({
        "user_id": new_closet.user_id,
        "white_tshirt": new_closet.white_tshirt,
        "black_tshirt": new_closet.black_tshirt,
        "white_shirt": new_closet.white_shirt,
        "black_shirt": new_closet.black_shirt,
        "half_knit": new_closet.half_knit,
        "long_knit": new_closet.long_knit,
        "cardigan": new_closet.cardigan,
        "black_slacks": new_closet.black_slacks,
        "beige_slacks": new_closet.beige_slacks,
        "sky_jean": new_closet.sky_jean,
        "blue_jean": new_closet.blue_jean,
        "white_cottonp": new_closet.white_cottonp,
        "half_jean": new_closet.half_jean,
        "white_skirt": new_closet.white_skirt,
        "black_skirt": new_closet.black_skirt
    })

    return return_value


@app.route("/mycodi/post", methods=["POST"])
def post_mycodi():
    user_id = session.get("user_id")
    styling_id = request.json("codimap")

    mycodi_exists = MyCodi.query.filter_by(user_id=user_id, styling_id=styling_id).first() is not None

    if mycodi_exists:
        db.session.delete(mycodi_exists)
        db.session.commit()
        
        return False

    new_mycodi = MyCodi(user_id=user_id, styling_id=styling_id)
    db.session.add(new_mycodi)
    db.session.commit()

    return_value = jsonify({
        "user_id": new_mycodi.user_id,
        "styling_id": new_mycodi.styling_id
    })
    
    return True

@app.route("/image/upload", methods=["POST"])
def image_upload():
    files = request.files.getlist('image')
    images = process_imagefiles(files)
    predictions = predict(model, images)

    # Get top 3 predictions
    top3 = indices_of_top_n(predictions, 3)
    print(predictions)
    
    # Print top 3 predictions with label mappping
    print("Top 3 predictions: ")
    for i in range(3):
        print(index_to_category(top3[i]), predictions[top3[i]])
    
    if not files:
        return {'error': 'No images foun'}, 400

    return {'Success': "Image upload done"}, 200

#옷bti GET
@app.route("/cbti/get", methods=["GET"])
def get_cbti():
    user_id = session.get("user_id")

    cbti_data = Codybti.query.filter_by(user_id=user_id).first()

    if cbti_data:
        return jsonify({
            "user_id": cbti_data.user_id,
            "gender": cbti_data.gender,
            "cold": cbti_data.cold,
            "trend": cbti_data.trend,
        })
    else:
        return jsonify({"error": "CBTI data not found"}), 404

# user style GET
@app.route("/userStyle/get", methods=["GET"])
def get_userStyle():
    user_id = session.get("user_id")

    user_style = UserStyle.query.filter_by(user_id=user_id).first()

    if user_style:
        top_styles = {
            "street": user_style.street,
            "casual": user_style.casual,
            "chic": user_style.chic,
            "sports": user_style.sports,
            "dandy": user_style.dandy,
            "formal": user_style.formal,
            "girlish": user_style.girlish,
            "romantic": user_style.romantic,
            "retro": user_style.retro,
            "golf": user_style.golf,
            "american_casual": user_style.american_casual,
            "gothcore": user_style.gothcore
        }

        # Sort the styles by value in descending order
        sorted_styles = sorted(top_styles.items(), key=lambda x: x[1], reverse=True)

        # Get the top 3 styles
        top_3_styles = sorted_styles[:3]
        
        return jsonify(dict(top_3_styles)), 200
    else:
        return jsonify({"error": "User style data not found"}), 404

# 내 옷장 GET
@app.route("/mycloset/get", methods=["GET"])
def get_closet():
    user_id = session.get("user_id")

    closet_data = MyCloset.query.filter_by(user_id=user_id).first()

    if closet_data:
        return jsonify({
            "user_id": closet_data.user_id,
            "white_tshirt": closet_data.white_tshirt,
            "black_tshirt": closet_data.black_tshirt,
            "white_shirt": closet_data.white_shirt,
            "black_shirt": closet_data.black_shirt,
            "half_knit": closet_data.half_knit,
            "long_knit": closet_data.long_knit,
            "cardigan": closet_data.cardigan,
            "black_slacks": closet_data.black_slacks,
            "beige_slacks": closet_data.beige_slacks,
            "sky_jean": closet_data.sky_jean,
            "blue_jean": closet_data.blue_jean,
            "white_cottonp": closet_data.white_cottonp,
            "half_jean": closet_data.half_jean,
            "white_skirt": closet_data.white_skirt,
            "black_skirt": closet_data.black_skirt
        }), 200
    else:
        return jsonify({"error": "Closet data not found"}), 401

# my codi list GET
@app.route("/mycodi/get", methods=["GET"])
def get_mycodi():
    user_id = session.get("user_id")

    mycodi_data = MyCodi.query.filter_by(user_id=user_id).all()
    
    if len(mycodi_data) > 0 :
        codi_list = []
        for mycodi in mycodi_data:
            codi_list.append({
                "user_id": mycodi.user_id,
                "styling_id": mycodi.styling_id
            })

        return jsonify(codi_list), 200
    else: return jsonify({"error": "no mycodi"}), 401

@app.route("/codimap/get", methods=["GET"])
def get_codimap():
    user_id = session.get("user_id")
    
    num = random.sample(range(1, 2000), 10)
    
    styling_lst = Styling.query.filter(Styling.id.in_(num)).all()
    
    if len(styling_lst) > 0 :
        codimap_list = []
        for styling in styling_lst:
            hashtags = [hashtag.tag for hashtag in styling.hashtags]
            
            codimap_list.append({
                "id": styling.id,
                "title": styling.title,
                "styling_txt": styling.styling_txt,
                "image_url": styling.image_url,
                "hashtags": hashtags
            })
            
        return jsonify(codimap_list), 200
    else : return jsonify({"error": "no styling list"}), 401