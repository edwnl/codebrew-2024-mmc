from firebase_functions import https_fn
from firebase_admin import firestore
from auth import validate_uid

# Initialize Firestore client
db = firestore.client()

# Collection names
USERS_COLLECTION = "USERS"
WARDROBE_COLLECTION = "WARDROBE"


# Register callable functions for cloth operations
@https_fn.on_call()
def add_cloth(req: https_fn.CallableRequest):
    uid = validate_uid(req)

    # Get cloth data from request
    data = req.data
    name = data.get("name")
    tags = data.get("tags")

    # Add cloth for the user
    cloth_data = {"name": name, "tags": tags}
    cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).add(cloth_data)
    return {"cloth_id": cloth_ref.id}


@https_fn.on_call()
def edit_cloth(req: https_fn.CallableRequest):
    # Get user ID from authentication
    uid = validate_uid(req)

    # Get cloth data from request
    data = req.data
    cloth_id = data.get("cloth_id")
    name = data.get("name")
    tags = data.get("tags")

    # Edit cloth for the user
    cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).document(cloth_id)
    update_data = {}
    if name:
        update_data["name"] = name
    if tags:
        update_data["tags"] = tags
    cloth_ref.update(update_data)

    return {"message": "Cloth edited successfully"}
