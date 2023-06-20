from __future__ import division
import os

import numpy as np
import torch
import torch.nn.parallel
import torch.optim
import torch.utils.data
import torchvision.transforms as transforms
from PIL import Image
from torch.utils.data.dataset import Dataset

from .registry import DATASETS


@DATASETS.register_module
class AttrDataset(Dataset):
    CLASSES = None

    def __init__(self,
                 img_path,
                 img_file,
                 label_file,
                 cate_file,
                 bbox_file,
                 landmark_file,
                 img_size,
                 idx2id=None,
                 mode='train'):
        self.img_path = img_path
        self.mode = mode

        normalize = transforms.Normalize(
            mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        
        if mode == 'train':
            self.transform = transforms.Compose([
                transforms.RandomResizedCrop(img_size[0]),
                transforms.RandomHorizontalFlip(),
                transforms.ToTensor(),
                normalize,
            ])
        else:
            self.transform = transforms.Compose([
                transforms.Resize(img_size[0]),
                transforms.CenterCrop(img_size[0]),
                transforms.ToTensor(),
                normalize,
            ])

        # read img names
        fp = open(img_file, 'r')
        self.img_list = [x.strip() for x in fp]

        # read attribute labels and category annotations
        self.labels = np.loadtxt(label_file, dtype=np.float32)

        # read categories
        self.categories = []
        catefn = open(cate_file).readlines()
        for i, line in enumerate(catefn):
            self.categories.append(line.strip('\n'))

        self.img_size = img_size

        # load bbox
        if bbox_file:
            self.with_bbox = True
            self.bboxes = np.loadtxt(bbox_file, usecols=(0, 1, 2, 3))
        else:
            self.with_bbox = False
            self.bboxes = None

        # load landmarks
        if landmark_file:
            self.landmarks = np.loadtxt(landmark_file)
        else:
            self.landmarks = None

    def get_basic_item(self, idx):
        img = Image.open(os.path.join(self.img_path,
                                      self.img_list[idx])).convert('RGB')

        width, height = img.size
        if self.with_bbox:
            bbox_cor = self.bboxes[idx]
            x1 = max(0, int(bbox_cor[0]) - 10)
            y1 = max(0, int(bbox_cor[1]) - 10)
            x2 = int(bbox_cor[2]) + 10
            y2 = int(bbox_cor[3]) + 10
            bbox_w = x2 - x1
            bbox_h = y2 - y1
            img = img.crop(box=(x1, y1, x2, y2))
            # Save cropped image for debug to current folder
        else:
            bbox_w, bbox_h = self.img_size[0], self.img_size[1]

        img.thumbnail(self.img_size, Image.ANTIALIAS)
        img = self.transform(img)

        label = torch.from_numpy(self.labels[idx])
        cate = torch.LongTensor([int(self.categories[idx]) - 1])

        landmark = []
        # compute the shiftness
        if self.landmarks is not None:
            origin_landmark = self.landmarks[idx]
            for i, l in enumerate(origin_landmark):
                if i % 2 == 0:  # x
                    l_x = max(0, l - x1)
                    l_x = float(l_x) / bbox_w * self.img_size[0]
                    landmark.append(l_x)
                else:  # y
                    l_y = max(0, l - y1)
                    l_y = float(l_y) / bbox_h * self.img_size[1]
                    landmark.append(l_y)
            landmark = torch.from_numpy(np.array(landmark)).float()
        else:
            # here no landmark will be used, just use zero for initialization
            # (global predictor)
            landmark = torch.zeros(8)

        data = {'img': img, 'attr': label, 'cate': cate, 'landmark': landmark}
        # # Save image for debug to current folder
        # img = img.numpy().transpose(1, 2, 0)
        # img = img * np.array([0.229, 0.224, 0.225])
        # img = img + np.array([0.485, 0.456, 0.406])
        # img = img * 255.0
        # img = img.astype(np.uint8)
        # img = Image.fromarray(img)
        # img.save('img.jpg')

        return data

    def __getitem__(self, idx):
        return self.get_basic_item(idx)

    def visualize(self, idx):
        # Visualize the image, attribute and category
        from PIL import Image
        data = self.get_basic_item(idx)
        img = data['img']
        label = data['attr']
        cate = data['cate']
        landmark = data['landmark']

        # Save the image to the current directory
        img = img.numpy().transpose(1, 2, 0)
        img = img * np.array([0.229, 0.224, 0.225])
        img = img + np.array([0.485, 0.456, 0.406])
        img = img * 255.0
        img = img.astype(np.uint8)

        img = Image.fromarray(img)
        img.save('img.jpg')

        # Print the attribute and category
        # Show the index of attribute
        attr_idx = np.where(label.numpy() == 1)[0]

        for i in attr_idx:
            print(convert_attr_to_name(i))
        
        # Show the category
        print(convert_idx_to_name(cate.numpy()[0]))
        




    def __len__(self):
        return len(self.img_list)


cate_list = ['Anorak', 'Blazer', 'Blouse', 'Bomber', 'Button-Down', 'Cardigan',
                'Flannel', 'Halter', 'Henley', 'Hoodie', 'Jacket', 'Jersey',
                'Parka', 'Peacoat', 'Poncho', 'Sweater', 'Tank', 'Tee', 'Top',
                'Turtleneck', 'Capris', 'Chinos', 'Culottes', 'Cutoffs',
                'Gauchos', 'Jeans', 'Jeggings', 'Jodhpurs', 'Joggers', 'Leggings',
                'Sarong', 'Shorts', 'Skirt', 'Sweatpants', 'Sweatshorts',
                'Trunks', 'Caftan', 'Cape', 'Coat', 'Coverup', 'Dress', 'Jumpsuit',
                'Kaftan', 'Kimono', 'Nightdress', 'Onesie', 'Robe', 'Romper',
                'Shirtdress', 'Sundress']

attr_list = ['floral', 'graphic', 'striped', 'embroidered', 'pleated', 'solid',
                'lattice', 'long_sleeve', 'short_sleeve', 'sleeveless',
                'maxi_length', 'mini_length', 'no_dress', 'crew_neckline',
                'v_neckline', 'square_neckline', 'no_neckline', 'denim',
                'chiffon', 'cotton', 'leather', 'faux', 'knit', 'tight', 'loose',
                'conventional']



def convert_idx_to_name(idx):
    return cate_list[idx]

def convert_attr_to_name(attr):
    return attr_list[attr]