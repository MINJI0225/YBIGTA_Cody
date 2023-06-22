import torch
import os
from torch import nn
from PIL import Image

categories = ['스트릿', '캐주얼', '시크', '스포츠', '댄디', '포멀', '걸리시', 
            '로맨틱', '레트로', '골프', '아메리칸 캐주얼', '고프코어']

def index_to_category(index):
    return categories[index]

def category_to_index(category):
    return categories.index(category)


def save_tensor_as_image(tensor, filename):
    # Convert tensor to PIL image
    tensor = tensor.squeeze()
    tensor = tensor.mul(255).add_(0.5).clamp_(0, 255).permute(1, 2, 0).to('cpu', torch.uint8).numpy()
    img = Image.fromarray(tensor)
    
    # Create directory if it doesn't exist

    img.save(filename)