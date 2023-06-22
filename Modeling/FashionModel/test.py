from fashion.models import build_predictor
from mmcv import Config

cfg = Config.fromfile('./configs/attribute_predict_coarse/roi_predictor_vgg_attr.py')
model = build_predictor(cfg.model)
print()
breakpoint()