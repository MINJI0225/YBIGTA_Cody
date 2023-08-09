# Download best.pth from google drive

pip install gdown

# Create directory if not exist
mkdir -p ./Modeling/FashionModel/checkpoints
gdown https://drive.google.com/uc?id=1Eg5yPfh_YgaXWWTnB3M_baas25_olfaG -O ./Modeling/FashionModel/checkpoints/best.pth
