from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)

styling_hashtags = db.Table('styling_hashtags',
                            db.Column('styling_id', db.Integer, db.ForeignKey('styling.id'), primary_key=True),
                            db.Column('hashtag_id', db.Integer, db.ForeignKey('hashtag.id'), primary_key=True)
                        )

item_styling = db.Table('item_styling',
                            db.Column('styling_id', db.Integer, db.ForeignKey('styling.id'), primary_key=True),
                            db.Column('item_id', db.Integer, db.ForeignKey('item.id'), primary_key=True)
                        )

class Styling(db.Model):
    __tablename__ = "styling"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    styling_date = db.Column(db.Date)
    view_num = db.Column(db.Integer)
    styling_txt = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    style_tag = db.Column(db.String(255))
    hashtags = db.relationship('Hashtag', secondary=styling_hashtags, backref='styling', lazy='subquery')

class Item(db.Model):
    __tablename__ = 'item'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    big_category = db.Column(db.String(255))
    small_category = db.Column(db.String(255))
    image_url = db.Column(db.String(255))
    styling_id = db.relationship('Styling', secondary=item_styling, backref='styling', lazy='subquery')

class Codybti(db.Model):
    __tablename__ = "codyBTI"
    user_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    gender = db.Column(db.String(255))
    cold = db.Column(db.String(255))
    trend = db.Column(db.String(255))

class UserStyle(db.Model):
    __tablename__ = "userStyle"
    user_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    style1 = db.Column(db.String(32))
    pre1 = db.Column(db.Float)
    style2 = db.Column(db.String(32))
    pre2 = db.Column(db.Float)
    style3 = db.Column(db.String(32))
    pre3 = db.Column(db.Float)
    
class MyCloset(db.Model):
    __tablename__ = "MyCloset"
    user_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    white_tshirt = db.Column(db.Integer)
    black_tshirt = db.Column(db.Integer)
    white_shirt = db.Column(db.Integer)
    black_shirt = db.Column(db.Integer)
    half_knit = db.Column(db.Integer)
    long_knit = db.Column(db.Integer)
    cardigan = db.Column(db.Integer)
    black_slacks = db.Column(db.Integer)
    beige_slacks = db.Column(db.Integer)
    sky_jean = db.Column(db.Integer)
    blue_jean = db.Column(db.Integer)
    white_cottonp = db.Column(db.Integer)
    half_jean = db.Column(db.Integer)
    white_skirt = db.Column(db.Integer)
    black_skirt = db.Column(db.Integer)

class MyCodi(db.Model):
    __tablename__ = "myCodi"
    user_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    styling_id = db.Column(db.Integer)

class Hashtag(db.Model):
    __tablename__ = "hashtag"
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(255))

'''
class Like(db.Model):
    __tablename__ = "likes"
    user_id = db.Column(db.String(32))
    codimap_id = db.Column(db.String(345))
    '''