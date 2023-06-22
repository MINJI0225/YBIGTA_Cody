from efficientnet_pytorch import EfficientNet
import torch.nn as nn

class PlainEfficientnetB7(nn.Module):
    def __init__(self, num_classes=12):
        super(PlainEfficientnetB7, self).__init__()
        
        base_model = EfficientNet.from_pretrained('efficientnet-b7', num_classes=12)
        self.block = nn.Sequential(
            base_model
        )
        
        nn.init.xavier_normal_(self.block[0]._fc.weight)
        
    def forward(self, x):
        out = self.block(x)
        return out