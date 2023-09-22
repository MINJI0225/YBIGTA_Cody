import json
import math
from datetime import datetime
from model import Styling, Item, Hashtag
import pandas as pd
from tqdm import tqdm

# Open clo value csv file
clo_df = pd.read_csv('clo.csv', encoding='utf-8')
valid_categories = [(big, small) for big, small in zip(clo_df['big_category'], clo_df['small_category'])]
clo_list = []

# Initialize Database
def db_init(app, db):
    with app.app_context():
        db.create_all()

        # DB initialization
        with open('codimap_list.json') as json_file:
            data = json.load(json_file)
            for styling in data[:1000]:
                # Get clo value of styling, which is the sum of clo value of items
                clo = 0
                for item in styling['item_list']:
                    # Check if the category is valid
                    if not (item['big_category'], item['small_category']) in valid_categories:
                        clo += 0.0
                    else:
                        # Get clo value of item
                        item_clo = clo_df[(clo_df['big_category'] == item['big_category']) & (clo_df['small_category'] == item['small_category'])]['score'].values[0]
                        clo += item_clo
                
                clo_list.append(clo)
                    
            
                styling_data = Styling(
                    title=styling['title'],
                    styling_date=datetime.strptime(styling['styling_date'], '%Y.%m.%d').date(),
                    view_num=styling['view_num'],
                    styling_txt=styling['styling_txt'],
                    image_url=styling['image_url'],
                    style_tag=styling['style_tag'],
                    clo=clo
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
    