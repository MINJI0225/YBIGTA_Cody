import random, requests, pytz
import torch
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from sqlalchemy import func
from db_init import db_init
from config import ApplicationConfig
from utils import process_imagefiles, predict, index_to_category, indices_of_top_n, calculate_color_difference
from model import db, User, Styling, Codybti, UserStyle, MyCloset, MyCodi, Item
from model_wrapper import PlainEfficientnetB7
from datetime import datetime, timedelta

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

# Initialize database
db_init(app, db)


apikey = "97abddef06b1f625921e7b5ca2e6695c"
lat = "37.5665"
lon = "126.9780"
api = f"api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apikey}&units=metric"

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
    # breakpoint()

    user = User.query.filter_by(id=id).first()
    if user and bcrypt.check_password_hash(user.password, password):
        print(f"User {user.id} logged in")
        session['user_id'] = user.id
        session.modified = True
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
    # breakpoint()
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


@app.route("/mycloset/choice", methods=["POST"])
def choice_codi():
    item_mappings = {
        "white_tshirt" : "반소매 티셔츠", "black_tshirt" : "반소매 티셔츠", "white_shirt" : "셔츠/블라우스",
        "black_shirt" : "셔츠/블라우스", "half_knit" : "니트/스웨터", "long_knit" : "니트/스웨터",
        "cardigan" : "카디건", "black_slacks" : "슈트 팬츠/슬랙스", "beige_slacks" : "슈트 팬츠/슬랙스",
        "sky_jean" : "데님 팬츠", "blue_jean" : "데님 팬츠", "white_cottonp" : "코튼 팬츠",
        "half_jean" : "숏 팬츠", "white_skirt" : "미니스커트", "black_skirt" : "롱스커트"
    }

    color_mappings = {
        "white_tshirt" : (243, 244, 239), "black_tshirt" : (31, 32, 36), "white_shirt" : (243, 244, 239),
        "black_shirt" : (31, 32, 36), "half_knit" : (31, 32, 36), "long_knit" : (220, 211, 200),
        "cardigan" : (227, 223, 211), "black_slacks" : (31, 32, 36), "beige_slacks" : (190, 185, 173),
        "sky_jean" : (155, 162, 178), "blue_jean" : (43, 48, 70), "white_cottonp" : (242, 243, 247),
        "half_jean" : (138, 160, 186), "white_skirt" : (243, 244, 239), "black_skirt" : (33, 28, 34)
    }

    # When user select the item, the item is posted to the server
    # and the server will return the codi that matches the item
    print("Request to mycloset/choice: ", request.json)
    selected_category = item_mappings[request.json["selected_item"]]
    selected_color = color_mappings[request.json["selected_item"]]
    items = Item.query.filter(Item.small_category == selected_category).all()
    print("selected_category: ", selected_category)
    print("selected_color: ", selected_color)
    print("Length of items: ", len(items))

    item_recommendations = []
    color_diff_items = []
    for item in items:
        if selected_category in ["반소매 티셔츠", "셔츠/블라우스", "니트/스웨터", "카디건"]:
            item_color = (item.avg_color_top_r, item.avg_color_top_g, item.avg_color_top_b)
        elif selected_category in ["슈트 팬츠/슬랙스", "데님 팬츠", "코튼 팬츠", "숏 팬츠", "미니스커트", "롱스커트"]:
            item_color = (item.avg_color_bottom_r, item.avg_color_bottom_g, item.avg_color_bottom_b)
        else:
            item_color = (item.avg_color_whole_r, item.avg_color_whole_g, item.avg_color_whole_b)
        
        # Check if item_color includes null value
        if None in item_color:
            continue

        color_difference = calculate_color_difference(selected_color, item_color)
        color_diff_items.append((color_difference, item))
    
    # Sorting items by color difference in ascending order
    sorted_items = sorted(color_diff_items, key=lambda x: x[0])
    item_recommendations = [item[1] for item in sorted_items[:20]]
    
    print("Length of item_recommendations (color applied): ", len(item_recommendations))
    
    # Get Stylings using styings_id
    styling_lst = []
    for item in item_recommendations:
        styling_lst.append(item.styling_id[0])

    codimap_list = []
    for styling in styling_lst:
        hashtags = [hashtag.tag for hashtag in styling.styling_hashtags]
        
        codimap_list.append({
            "id": styling.id,
            "title": styling.title,
            "styling_txt": styling.styling_txt,
            "image_url": styling.image_url,
            "hashtags": hashtags
        })
    
    print("mycloset/choice response: ", codimap_list)
    return jsonify(codimap_list), 200


@app.route("/mycodi/post", methods=["POST"])
def post_mycodi():
    user_id = session.get("user_id")
    styling_id = request.json["styling_id"]

    print("user_id, styling_id: ", user_id, styling_id)

    mycodi_exists = MyCodi.query.filter_by(user_id=user_id).first()

    if mycodi_exists:
        db.session.delete(mycodi_exists)
        db.session.commit()
        return jsonify({"success": True, "message": "Successfully modified mycodi"}), 200

    new_mycodi = MyCodi(user_id=user_id, styling_id=styling_id)
    db.session.add(new_mycodi)
    db.session.commit()
    return jsonify({"success": True, "message": "Successfully created mycodi"}), 200

@app.route("/image/upload", methods=["POST"])
def image_upload():
    files = request.files.getlist('image')
    images = process_imagefiles(files)
    predictions = predict(model, images)
    
    user_id = session.get("user_id")

    # Get top 3 predictions
    top3 = indices_of_top_n(predictions, 3)
    # print(predictions)
    
    userStyle = UserStyle.query.filter_by(user_id=user_id).first()
    if userStyle:
        userStyle.style1 = index_to_category(top3[0])
        userStyle.style2 = index_to_category(top3[1])
        userStyle.style3 = index_to_category(top3[2])
        userStyle.pre1 = predictions[top3[0]]
        userStyle.pre2 = predictions[top3[1]]
        userStyle.pre3 = predictions[top3[2]]
        db.session.commit()
        return jsonify({"Success": "modifed userStyle"}), 200
    
    new_userStyle = UserStyle(user_id=user_id, style1=index_to_category(top3[0]), style2=index_to_category(top3[1]), style3=index_to_category(top3[2]), pre1=predictions[top3[0]], pre2=predictions[top3[1]], pre3=predictions[top3[2]])
    db.session.add(new_userStyle)
    db.session.commit()
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
            "style1": user_style.style1,
            "pre1": user_style.pre1,
            "style2": user_style.style2,
            "pre2": user_style.pre2,
            "style3": user_style.style3,
            "pre3": user_style.pre3
        }
        return jsonify(top_styles), 200
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

@app.route("/codimap/post", methods=["POST"])
def get_codimap():
    # 1. ComfortClo of time
    # 2. User style tag
    # 3. User trendy

    trend_table = {
        '아주 민감':5,
        '민감':4,
        '보통':3,
        '둔감':2,
        '아주 둔감':1
    }
    user_id = session.get("user_id")
    print(f"get_codimap user_id: {user_id}")
    if not user_id:
        user_id = "aa"

    hour = request.json["hour"]
    print("hour: ", hour)
    if hour is None:
        hour = 0
    
    isCloset = request.json["isMyCloset"]
    isCloset = True if isCloset == 1 else False

    # Get current time and target time
    UTC = pytz.timezone('UTC')
    now = datetime.now(UTC)


    # (TODO) Get temperature using weather API
    result = requests.get(f"http://{api}").json()['list']
    temp = getClosestTemp(result, hour)
    print("temp: ", temp)

    # Get user style tag
    # breakpoint()
    codybti = Codybti.query.filter_by(user_id=user_id).first()
    trend_score = trend_table[codybti.trend]

    # Current time recommendation
    comfortClo = 0.5
    threshold = 0.1
    
    # Filter by comfortClo
    styling_list = Styling.query.filter(Styling.style_tag == UserStyle.style1).order_by(
                                func.abs(Styling.clo - comfortClo)).all()
    result_list = []
    if trend_score >= 3:
        # Get year from Styling table
        for styling in styling_list:
            styling_date = styling.styling_date  # Get the styling_date attribute
            styling_year = styling_date.year  # Get the year from the styling_date
            if styling_year in [2022, 2023]:
                result_list.append(styling)
    else:
        result_list = styling_list
    
    # Filter by temperature and corresponding clo value
    if temp < 5:
        min_clo, max_clo = (2.1, 100)
    elif temp < 10:
        min_clo, max_clo = (1.85, 2.1)
    elif temp < 15:
        min_clo, max_clo = (1.7, 1.85)
    elif temp < 20:
        min_clo, max_clo = (1.2, 1.7)
    elif temp < 25:
        min_clo, max_clo = (0.3, 1.2)
    else:
        min_clo, max_clo = (0.0, 0.3)
    
    result_list = [styling for styling in result_list if styling.clo >= min_clo and styling.clo < max_clo]


    codimap_list = []
    for styling in result_list:
        hashtags = [hashtag.tag for hashtag in styling.styling_hashtags]
        
        codimap_list.append({
            "id": styling.id,
            "title": styling.title,
            "styling_txt": styling.styling_txt,
            "image_url": styling.image_url,
            "hashtags": hashtags
        })

    # Shuffle the list
    random.shuffle(codimap_list)

    return jsonify(codimap_list), 200

def getClosestTemp(json_list, hour):
    # Get temperature of the closest time after 'hour' hours from now
    UTC = pytz.timezone('UTC')
    now = datetime.now(UTC)
    target = now + timedelta(hours=hour)

    min_diff = timedelta(days=365*100)
    min_idx = 0
    for i in range(len(json_list)):
        json_date = datetime.fromtimestamp(json_list[i]['dt'], UTC)
        diff = abs(target - json_date)
        if diff.total_seconds() < min_diff.total_seconds():
            min_diff = diff
            min_idx = i

    return json_list[min_idx]['main']['temp']
