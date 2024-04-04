from rembg import remove
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans

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

def remove_background(filepath: str):
    ''' Takes the filepath to an image and returns the image with the background removed'''
    img = Image.open(filepath)
    # Removing the background from the given Image
    img_cutout = remove(img)
    output = img_cutout.crop(img_cutout.getbbox())

    return output

def shrink_image(img, base_width=300):
    w_percent = (base_width / float(img.size[0]))
    h_size = int((float(img.size[1]) * float(w_percent)))
    img = img.resize((base_width, h_size), Image.Resampling.LANCZOS)
    return img

def find_dominant_colours(img, num_colors=3):
    img = shrink_image(img)
    img_np = np.array(img)
    img_np = img_np[:,:,:3].reshape((img_np.shape[0] * img_np.shape[1], 3))
    
    clt = KMeans(n_clusters=num_colors)
    clt.fit(img_np)
    
    # Count the number of pixels assigned to each cluster
    unique, counts = np.unique(clt.labels_, return_counts=True)
    cluster_info = dict(zip(unique, counts))
    
    return clt.cluster_centers_, cluster_info

def match_to_set_colors(img, set_colors=COLOURS):
    dominant_colours, cluster_count = find_dominant_colours(img)
    matched_colors = []
    for color in dominant_colours:
        closest_colors = sorted(set_colors.items(), key=lambda x: np.linalg.norm(np.array(x[1])-color))
        matched_colors.append(closest_colors[0][0])
    
    colour_count = {}
    for i in range(len(matched_colors)):
        if matched_colors[i] in colour_count:
            colour_count[matched_colors[i]] += cluster_count[i]
        else:
            colour_count[matched_colors[i]] = cluster_count[i]
    return colour_count

test_img = Image.open('python\\test_image_final.png')
matched = match_to_set_colors(test_img)
print(matched)