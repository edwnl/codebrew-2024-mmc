import pandas as pd
import json
from torch.utils.data import Dataset, DataLoader
from PIL import Image
import torchvision.transforms as transforms
from sklearn.model_selection import train_test_split
import torch.nn as nn
import torchvision.models as models
import torch

PATH_TO_IMAGES = 'model_files/images_compressed/'

df = pd.read_csv('model_files/images.csv')

# remove all images where 'kids' is True or label is 'other','Not sure','Skip'
df = df[(df['kids'] == False) & (df['label'] != 'Other') & (df['label'] != 'Not sure') & (df['label'] != 'Skip')]
df = df[['image', 'label']]

# Create a mapping of labels to integers
label_to_int = {label: idx for idx, label in enumerate(df['label'].unique())}
# save int_to_label to a file
int_to_label = {v: k for k, v in label_to_int.items()}
with open('model_files/int_to_label.json', 'w') as f:
    json.dump(int_to_label, f)
# Map the labels column to integers using the mapping
df['label'] = df['label'].apply(lambda x: label_to_int[x])

class CustomDataset(Dataset):
    def __init__(self, dataframe, image_folder, transform=None):
        self.dataframe = dataframe
        self.image_folder = image_folder
        self.transform = transform

    def __len__(self):
        return len(self.dataframe)

    def __getitem__(self, idx):
        img_name = f"{self.image_folder}/{self.dataframe.iloc[idx, 0]}.jpg"
        image = Image.open(img_name)
        label = self.dataframe.iloc[idx, 1]

        if self.transform:
            image = self.transform(image)
            
        label = torch.tensor(label, dtype=torch.long)

        return image, label
    
transform = transforms.Compose([
    transforms.Resize((400, 400)),  # Resize images to common size
    transforms.ToTensor(),  # Convert images to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # Normalize images
])

# train validation test split
train_val_df, test_df = train_test_split(df, test_size=0.15, random_state=42)
train_df, val_df = train_test_split(train_val_df, test_size=0.15 / 0.85, random_state=42)

train_dataset = CustomDataset(dataframe=train_df, image_folder=PATH_TO_IMAGES, transform=transform)
val_dataset = CustomDataset(dataframe=val_df, image_folder=PATH_TO_IMAGES, transform=transform)
test_dataset = CustomDataset(dataframe=test_df, image_folder=PATH_TO_IMAGES, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

# Load a pre-trained ResNet50 model
model = models.resnet50(pretrained=True)

# Modify the final fully connected layer to match the number of classes
num_features = model.fc.in_features
num_classes = len(df['label'].unique())  # Number of unique labels
model.fc = nn.Linear(num_features, num_classes)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# check if model weights already exist
try:
    model.load_state_dict(torch.load('model_files/model.pth'))
finally:
    pass

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

NUM_EPOCHS = 10
for epoch in range(NUM_EPOCHS):
    model.train()
    running_loss = 0.0
    print(f"training start {epoch}")
    for inputs, labels in train_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        
    print(f"Epoch {epoch+1}, Loss: {running_loss/len(train_loader)}")
    
    # Validation phase
    model.eval()
    val_running_loss = 0.0
    correct = 0
    total = 0
    with torch.no_grad():
        for inputs, labels in val_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            val_running_loss += loss.item()

            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    
    print(f"Validation Loss: {val_running_loss/len(val_loader)}, Accuracy: {100 * correct / total}%")

# evaluate the model on the test set
model.eval()
test_correct = 0
test_total = 0
with torch.no_grad():
    for inputs, labels in test_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        outputs = model(inputs)
        _, predicted = torch.max(outputs.data, 1)
        test_total += labels.size(0)
        test_correct += (predicted == labels).sum().item()

torch.save(model.state_dict(), 'model_files/model.pth')