import json
from collections import defaultdict
import time  # add timer to check how long it takes to run the code
from rembg import remove
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import torch
import torchvision.models as models
import torchvision.transforms as transforms

# colour set used for matching
COLOURS = {
    'red': (237, 19, 19),
    'dark red': (66, 2, 2),
    'pink': (224, 65, 97),
    'purple': (206, 22, 219),
    'indigo': (62, 8, 120),
    'blue': (33, 66, 217),
    'light blue': (70, 219, 224),
    'navy blue': (22, 25, 54),
    'green': (12, 201, 44),
    'dark green': (10, 46, 29),
    'yellow': (237, 189, 14),
    'orange': (240, 97, 14),
    'brown': (56, 27, 10),
    'black': (13, 12, 13),
    'white': (245, 247, 247),
    'grey': (127, 129, 130)
    }

# get the label_to_int mapping
with open('model_files/int_to_label.json', 'r') as f:
    LABEL_TO_INT = json.load(f)
    
# image transformation from "model_training.py"
IMG_TRANSFORM = transforms.Compose([
    transforms.Resize((400, 400)),  # Resize images to common size
    transforms.ToTensor(),  # Convert images to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # Normalize images
])

def remove_background(filepath: str):
    '''Takes the filepath to an image and returns the image with the background removed'''
    img = Image.open(filepath)
    # Removing the background from the given Image
    img_cutout = remove(img)
    output = img_cutout.crop(img_cutout.getbbox())

    return output

def shrink_image(img, base_width=200):
    '''Reduces image size for faster processing'''
    w_percent = (base_width / float(img.size[0]))
    h_size = int((float(img.size[1]) * float(w_percent)))
    img = img.resize((base_width, h_size), Image.Resampling.LANCZOS)
    return img

def find_dominant_colours(img, num_colors=3):
    '''Finds the 3 most dominant colours in the image using KMeans clustering centroids'''
    img = shrink_image(img)
    img_np = np.array(img)
    img_np = img_np[:,:,:3].reshape((img_np.shape[0] * img_np.shape[1], 3))  # remove alpha channel
    
    # create 3-cluster KMeans model
    clt = KMeans(n_clusters=num_colors)
    clt.fit(img_np)
    
    # Count the number of pixels assigned to each cluster
    unique, counts = np.unique(clt.labels_, return_counts=True)
    cluster_info = dict(zip(unique, counts))
    
    return clt.cluster_centers_, cluster_info

def match_to_set_colors(img, set_colors=COLOURS):
    '''Find the closest matching colour from the set of colours to create the colour scheme of the clothing'''
    dominant_colours, cluster_count = find_dominant_colours(img)
    matched_colors = []
    for colour in dominant_colours:
        closest_colors = sorted(set_colors.items(), key=lambda x: np.linalg.norm(np.array(x[1])-colour))
        matched_colors.append(closest_colors[0][0])
    
    colour_count = defaultdict(int)
    for i in range(len(matched_colors)):
        colour_count[matched_colors[i]] += cluster_count[i]
    
    return colour_count

def find_clothing_type(img):
    '''Uses a pre-trained model to determine the type of clothing in the image'''
    # Load the model
    model = models.resnet50(weights=None)
    
    num_features = model.fc.in_features
    num_classes = len(LABEL_TO_INT)
    model.fc = torch.nn.Linear(num_features, num_classes)
    
    model.load_state_dict(torch.load('model_files/model.pth'))
    model.eval()
    
    # Transform the image
    img = img.convert('RGB')
    img = IMG_TRANSFORM(img)
    img = img.unsqueeze(0)
    img = img.to(torch.device('cpu'))
    
    # Get the prediction
    with torch.no_grad():
        output = model(img)
        _, predicted = torch.max(output, 1)
    
    return LABEL_TO_INT[str(predicted.item())]



# add timer
start = time.time()
test_img = Image.open('python\\test_image_final.png')
# matched = match_to_set_colors(test_img)
cl_type = find_clothing_type(test_img)

# print the time taken to run the code
print(f"Time taken: {time.time() - start}")
# print(matched)
print(cl_type)