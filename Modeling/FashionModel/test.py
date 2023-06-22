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


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
img_path = 'demo/image7_dd.jpg'
model_weight_path = 'checkpoints/best.pth'

# Load image
img = cv2.cvtColor(cv2.imread(img_path), cv2.COLOR_BGR2RGB)  # RGB
img = Image.fromarray(img)
img = test_transform(img)

# Initialize model and load weights
model = PlainEfficientnetB7(num_classes=12).to(device)
model.load_state_dict(torch.load(model_weight_path, map_location=torch.device('cpu')))
print('model loaded from {}'.format(model_weight_path))

# Test model
model.eval()
with torch.no_grad():
    output = model(img.unsqueeze(0).to(device))
    pred = torch.argmax(output, dim=1).cpu().numpy()
    
    print("output: ", output)

    # Show top 3 predictions with label mappping
    print("Top 3 predictions: ")
    output = output.squeeze()
    top3 = torch.topk(output, 3)
    for i in range(3):
        print(index_to_category(top3.indices[i].item()), top3.values[i].item())





