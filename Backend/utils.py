import sys
import os
import torch
from torch import nn
from model_wrapper import PlainEfficientnetB7
import sys
import os
from torchvision import transforms
import torchvision.transforms as T
from torchvision.transforms import ToTensor
import cv2
import numpy as np
from PIL import Image

categories = ['스트릿', '캐주얼', '시크', '스포츠', '댄디', '포멀', '걸리시', 
            '로맨틱', '레트로', '골프', '아메리칸 캐주얼', '고프코어']

def index_to_category(index):
    return categories[index]

def category_to_index(category):
    return categories.index(category)

def indices_of_top_n(arr, n):
    return sorted(range(len(arr)), key=lambda i: arr[i], reverse=True)[:n]


img_size = 256
crop_size = 224

test_transform = T.Compose([
    T.Resize(img_size),
    T.CenterCrop(crop_size),
    T.ToTensor(),
])

def process_imagefiles(image_file_streams):
    # Process files uploaded through POST
    # image_file_streams: list of file streams (FileStorage)
    # return: cv2 images in RGB format
    images = []
    for image_file_stream in image_file_streams:
        image = cv2.imdecode(np.fromstring(image_file_stream.read(), np.uint8), cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        images.append(image)

    return images


def predict(model, images):
    # Result scores for 12 categories
    scores = []

    for img in images:
        img = Image.fromarray(img)
        img = test_transform(img)

        with torch.no_grad():
            output = model(img.unsqueeze(0))
            pred = torch.argmax(output, dim=1).cpu().numpy()
            # Normalize score to 0~1
            output = nn.functional.softmax(output, dim=1)
            scores.append(output.squeeze().cpu().numpy())

    scores = np.array(scores)
    scores = scores.mean(axis=0)

    # Normalize scores so that sum of scores is 100
    scores = scores / scores.sum() * 100

    return scores

# def get_style_scores(images):

