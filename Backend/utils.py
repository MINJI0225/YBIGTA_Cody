import sys
import os
import torch
from torch import nn
from model import PlainEfficientnetB7
import sys
import os
from torchvision import transforms
import torchvision.transforms as T
from torchvision.transforms import ToTensor
import cv2
from PIL import Image

categories = ['스트릿', '캐주얼', '시크', '스포츠', '댄디', '포멀', '걸리시', 
            '로맨틱', '레트로', '골프', '아메리칸 캐주얼', '고프코어']

def index_to_category(index):
    return categories[index]

def category_to_index(category):
    return categories.index(category)


img_size = 256
crop_size = 224

test_transform = T.Compose([
    T.Resize(img_size),
    T.CenterCrop(crop_size),
    T.ToTensor(),
])

def process_imagefile(image_file_stream):
    # Process files uploaded through POST
    img = Image.open(image_file_stream)
    


def predict(model, img):
    img = Image.fromarray(img)
    img = test_transform(img)
    img = img.unsqueeze(0)
    with torch.no_grad():
        output = model(img)
    _, pred = torch.max(output, 1)
    return pred.item()
