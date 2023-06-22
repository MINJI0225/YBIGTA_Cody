import json
import os
import sys
from tqdm import tqdm

# Load all json files in 'files' directory
def load_json_files():
    json_files = []
    for filename in os.listdir('files'):
        if filename.endswith('.json'):
            json_files.append(filename)
    return json_files

# Merge all json files into one
json_filenames = load_json_files()

result_list = []
for filename in tqdm(json_filenames):
    with open('files/' + filename, 'r') as f:
        json_list = json.load(f)
        result_list += json_list

with open("codimap_list.json", 'w', encoding='utf-8') as json_file:
        json.dump(result_list, json_file, ensure_ascii=False, indent=4)