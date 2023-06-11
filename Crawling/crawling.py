import os, logging, argparse
from bs4 import BeautifulSoup
import selenium
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from tqdm import tqdm

import pandas as pd
import numpy as np
import time, json, re
from utils import get_detail_info, get_item_info

# Argument parser
parser = argparse.ArgumentParser()
parser.add_argument('--start_page', type=int, default=1, help='Start page number')
parser.add_argument('--end_page', type=int, default=2, help='End page number')
parser.add_argument('--mode', type=str, default='display', help='Mode of crawling (display, headless, server)')
parser.add_argument('--save_path', type=str, default='./outputs/', help='Path to save the data')
parser.add_argument('--log_path', type=str, default='./', help='Path to save the log')
args = parser.parse_args()

# Set options for chrome driver
options = webdriver.ChromeOptions()
options.add_argument('--disable-dev-shm-usage') # To prevent memory leak
options.add_argument("--disable-notifications") # To prevent notification
options.add_experimental_option('excludeSwitches', ['disable-popup-blocking']) # To prevent popup blocking

# Set mode of chrome driver
if args.mode == 'display':
    pass
elif args.mode == 'headless':
    options.add_argument("--headless")
elif args.mode == 'server':
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
else:
    logging.info("Invalid mode. Please check the mode again. (display, headless, server))")
    exit()

# Logging setting
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Print log message to console
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

# Print log message to file
if not os.path.exists(args.log_path):
    os.makedirs(args.log_path)
file_handler = logging.FileHandler(os.path.join(args.log_path, f"codimap_crawling_{args.start_page}_{args.end_page}.log"))
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# Set driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Crawl all codimaps in the page_num page
def crawl(page_num, save_path='./', **kwargs):
    """
        Crawl all codimaps in the page_num page.
        :param page_num: page number

        :return: codimap_list
    """
    codimap_list = []
    url = f"https://www.musinsa.com/app/codimap/lists?style_type=&tag_no=&brand=&display_cnt=60&list_kind=big&sort=comment_cnt&page={page_num}"
    driver.get(url)
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'address')))

    soup = BeautifulSoup(driver.page_source, 'lxml')
    data_rows = soup.find_all('li', attrs={'class':'style-list-item'})  # Get all codimaps in the page

    # Get informations from each codimap
    for i in tqdm(range(len(data_rows)), desc=f"{page_num}/{args.end_page - args.start_page + 1}"):
        driver.get(url)
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'address')))

        logging.info(f"#{i+1} codimap crawling started")

        # First get the style tag of the codimap (This dissapears when you click the codimap)
        style_tag = data_rows[i].find('span', attrs={'class':'style-list-information__text'})
        codi_element_xpath = driver.find_element(By.XPATH, f"/html/body/div[3]/div[3]/form/div[4]/div/ul/li[{i+1}]/div[1]/a/div/img")
        codi_element_xpath.click() # Click the codi map and go to the detail page.

        # Wait until the page is loaded
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'styling_txt')))

        # Get the codimap information
        soup = BeautifulSoup(driver.page_source, 'lxml')
        detail_info = get_detail_info(soup)
        detail_info['style_tag'] = style_tag.text
        
        # Get items from codi map
        item_list = []
        
        for item_url in detail_info['item_urls']:
            driver.get(item_url)
            element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "plus_cursor"))
            )

            soup = BeautifulSoup(driver.page_source, 'lxml')

            item_info = get_item_info(soup)
            item_list.append(item_info)
        
        # Add codimap information to codimap_list
        detail_info['item_list'] = item_list
        codimap_list.append(detail_info)

        logger.info(f"#{i+1} codimap crawling finished")
        logger.info(f"Detail info: {detail_info}")

    # Save the data in json format
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    with open(os.path.join(save_path, f"codimap_list_{page_num}.json"), 'w') as json_file:
        json.dump(codimap_list, json_file, ensure_ascii=False, indent=4)

    return codimap_list

# main function
if __name__ == "__main__":
    # Show the arguments
    logger.info(f"Start page: {args.start_page}")
    logger.info(f"End page: {args.end_page}")
    logger.info(f"Mode: {args.mode}")

    # List containing error pages
    error_pages = []

    # Crawl from start_page to end_page
    for page in range(args.start_page, args.end_page+1):
        logger.info(f"{page} page crawling started")

        # Exception handling for crawl function
        try:
            codimap_list = crawl(page, args.save_path)
        except Exception as e:
            logger.error(f"{page} page crawling failed")
            logger.error(e)
            error_pages.append(page)
            continue

        logger.info(f"{page} page crawling finished")
    
    # Print error pages
    logger.info(f"Error pages: {error_pages}")

    # Close the driver
    driver.close()


# For backup
# def crawl2():
#     item_list = []

#     # Crawl from page 1 to 382, but it takes too long time, so for now, I will crawl from page 1 to 2.
#     for page in range(1, 3):
#         url = 'https://www.musinsa.com/app/codimap/lists?style_type=&tag_no=&brand=&display_cnt=60&list_kind=big&sort=comment_cnt&page={}'.format(page) # page={} 으로 수정한다음 for 문으로 382페이지 까지 반복하면 될 것 같음. 일단은 보류했음.
#         driver.get(url)
#         time.sleep(0.5)

#         columns = ['codimap_title', 'codimap_explain', 'codimap_imgurl', 'item_name', 'item_bigcategory', 'item_smallcategory', 'item_hashtags', 'item_imageurl']
#         values = []
        
#         soup = BeautifulSoup(driver.page_source, 'lxml')
#         data_rows = soup.find_all('li', attrs={'class':'style-list-item'})

#         for i, row in enumerate(data_rows):
#             logging.info(f"{page} page {i+1} codimap crawling start")
#             codimap_title = row.find('strong', attrs={'class':'style-list-information__title'})
#             if codimap_title:
#                 codimap_title = codimap_title.get_text().strip()

#             else:
#                 logging.info(f"{page} page {i+1} codimap error occured while crawling codimap_title")
#                 logging.info(f"row: {row}")
#                 continue

#             codi_element_xpath = driver.find_element(By.XPATH, f"/html/body/div[3]/div[3]/form/div[4]/div/ul/li[{i+1}]/div[1]/a/div/img")

#             codi_element_xpath.click() # Click the codi map and go to the detail page.
#             WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'styling_txt')))

#             soup = BeautifulSoup(driver.page_source, 'lxml')

            
#             codimap_explain = soup.find('p', attrs={'class':'styling_txt'})

#             if codimap_explain:
#                 codimap_explain = codimap_explain.get_text().strip().replace('\r', ' ')
#             else:
#                 logging.info(f"{page} page {i+1} codimap error occured while crawling codimap_explain")
#                 logging.info(f"row: {row}")

#             codimap_imgurl = soup.find('img', attrs={'class':'photo'})
#             if codimap_imgurl: # 코디맵 image_url 가져오기
#                 image_url = codimap_imgurl['src']
#                 if image_url.startswith('//'):
#                     image_url = 'https:' + image_url

#             else:
#                 print('{}페이지 {}번째 코디맵에서 codimap_imgurl 가져올때 문제발생'.format(page, i+1))
#                 continue

            
#             # Get items from codi map
#             items = soup.find_all('div', attrs={'class':re.compile('^swiper-slide.style_contents_size')}) # '^swiper-slide style_contents_size'
#             for num, item in enumerate(items):
#                 blank = []
#                 blank.append(codimap_title)
#                 blank.append(codimap_explain)
#                 blank.append(image_url)


#                 try:
#                     codi_item_xpath = driver.find_element(By.XPATH, '//*[@id="style_info"]/div[3]/div/div/div/div[1]/div[{}]'.format(num+1))
#                     codi_item_xpath.click()
#                     time.sleep(1)
                
#                 except:
#                     driver.back()
#                     time.sleep(0.5)
#                     continue


#             # 이 두부분은 팝업창이 뜨는 페이지도 있고 안뜨는 페이지도 있어서 어쩔수 없이 try_except 코드로 남겨놨음 필요없다 생각하면 날려도 됨
#                 try:
#                     close = driver.find_element(By.CLASS_NAME, 'day-popup-open') # 무신사 회원혜택 팝업 오늘그만보기 클릭
#                     close.click()
#                     time.sleep(0.2)
                
#                 except:
#                     pass

#                 try:
#                     close = driver.find_element(By.CLASS_NAME, 'btn.btn-today') # 해당 브랜드 배송/CS 일시 중단 안내 팝업 오늘그만보기 클릭 'btn btn-today'
#                     close.click()
#                     time.sleep(0.2)

#                 except:
#                     pass
                
#                 interval = 0.5 # 1초에 한번씩 스크롤 내림

#                 # 현재 문서 높이를 가져와서 저장
#                 prev_height = driver.execute_script("return document.body.scrollHeight")

#                 # 반복 수행
#                 while True:
#                     # 스크롤을 가장 아래로 내림
#                     driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")

#                     # 페이지 로딩 대기
#                     time.sleep(interval)

#                     # 현재 문서 높이를 가져와서 저장
#                     curr_height = driver.execute_script("return document.body.scrollHeight")
#                     if curr_height == prev_height:
#                         break

#                     prev_height = curr_height

#                 soup = BeautifulSoup(driver.page_source, 'lxml')

#                 item_name = soup.find('span', attrs={'class':'product_title'})
#                 if item_name: # 코디 개별 아이템 이름 가져오기
#                     item_name = item_name.get_text().strip()
#                     blank.append(item_name)
#                 else:
#                     blank.append('something is wrong')
#                     print('{}페이지 {}번째 코디맵에서 {}번 item_name 가져올때 문제발생'.format(page, i+1, num+1))
#                     continue

#                 item_category = soup.find('p', attrs={'class':'item_categories'})
#                 if item_category: # 코디 개별 아이템 큰 카테고리, 작은 카테고리 가져오기
#                     big_category = item_category.find_all('a')[0]
#                     small_category = item_category.find_all('a')[1]
#                     blank.append(big_category)
#                     blank.append(small_category)

#                 else:
#                     blank.append('something is wrong')
#                     blank.append('something is wrong')
#                     print('{}페이지 {}번째 코디맵에서 {}번 item_categories 가져올때 문제발생'.format(page, i+1, num+1))
#                     continue


#                 item_hashtags = soup.find_all('a', attrs={'class':'listItem'})
#                 if item_hashtags: # 코디 아이템 해쉬태그들 가져오기
#                     item_hastag_list = []
#                     for item_hashtag in item_hashtags:
#                         item_hastag_list.append(item_hashtag.get_text().strip())
#                     hashtags = ','.join(item_hastag_list)
#                     blank.append(hashtags)
#                 else:
#                     blank.append('해당 아이템 해쉬태그 없음')
#                     print('{}페이지 {}번째 코디맵에서 {}번 item 해쉬태그 없음'.format(page, i+1, num+1))


#                 item_imgurl = soup.find('img', attrs={'class':'plus_cursor'})
#                 if item_imgurl: # 아이템 image_url 가져오기
#                     image_url = item_imgurl['src']
#                     if image_url.startswith('//'):
#                         image_url = 'https:' + image_url
#                     blank.append(image_url)
#                 else:
#                     blank.append('something is wriong')
#                     print('{}페이지 {}번째 코디맵에서 {}번 item_imageurl 가져올때 문제발생'.format(page, i+1, num+1))
#                     continue

#                 values.append(blank)
#                 driver.back()
#                 time.sleep(1)
                

#             driver.back()
#             time.sleep(1)


#         df = pd.DataFrame(values, columns = columns)
#         item_list.append(df)
