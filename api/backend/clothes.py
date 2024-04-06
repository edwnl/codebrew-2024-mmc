from firebase_functions import https_fn
from firebase_admin import firestore
from auth import validate_uid


# Collection names
USERS_COLLECTION = "users"
WARDROBE_COLLECTION = "clothes"

def get_clothes(req):
    data = []
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Query clothes collection for the user
    clothes = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).stream()

    for cloth in clothes:
        print(cloth.to_dict())
        data.append(cloth.to_dict())

    print(data)

    # Convert documents to list of dictionaries
#     clothes_list = [{"id": cloth.id, **cloth.to_dict()} for cloth in clothes]

    return data

def add_cloth(req):
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Extract data from request
    data = req.data
    print(data)
    name = data.get("name")
    tags = data.get("tags")
    image = data.get("image")

    # Create cloth data
    cloth_data = {"name": name, "tags": tags, "image": image}

    # Add cloth to user's wardrobe
    cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).add(cloth_data)
    print()
    return {"cloth_id": cloth_ref[1].id}

def add_cloth_bulk(req):
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Extract data array from request
    data_arr = req.data

    # Create batched write operation
    batch = db.batch()

    # List to store cloth references
    cloth_refs = []

    # Iterate over data array and add cloth data to batch
    for data in data_arr:
        name = data.get("name")
        tags = data.get("tags")
        image = data.get("image")
        cloth_data = {"name": name, "tags": tags, "image": image}
        cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).document()
        batch.set(cloth_ref, cloth_data)
        cloth_refs.append({"cloth_id": cloth_ref.id})

    # Commit the batched write operation
    batch.commit()

    return cloth_refs

def edit_cloth(req):
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Extract data from request
    data = req.data
    cloth_id = data.get("id")
    name = data.get("name")
    tags = data.get("tags")
    image = data.get("image")

    # Get cloth reference
    cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).document(cloth_id)

    # Check if the cloth belongs to the user
    cloth_data = cloth_ref.get().to_dict()
    if not cloth_data:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.NOT_FOUND,
                                  message="Cloth not found")
    if cloth_data['uid'] != uid:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.PERMISSION_DENIED,
                                  message="Permission denied")

    # Update cloth data
    update_data = {}
    if name:
        update_data["name"] = name
    if tags:
        update_data["tags"] = tags
    if image:
        update_data["image"] = image

    # Update cloth document
    cloth_ref.update(update_data)

    return {"message": "Cloth edited successfully"}

def delete_cloth(req):
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Extract cloth ID from request
    data = req.data
    cloth_id = data.get("id")

    # Get cloth reference
    cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).document(cloth_id)

    # Check if the cloth exists and belongs to the user
    cloth_data = cloth_ref.get().to_dict()
    if not cloth_data:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.NOT_FOUND,
                                  message="Cloth not found")
    if cloth_data['uid'] != uid:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.PERMISSION_DENIED,
                                  message="Permission denied")

    # Delete cloth document
    cloth_ref.delete()

    return {"message": "Cloth deleted successfully"}
