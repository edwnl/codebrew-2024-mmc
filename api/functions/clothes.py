from firebase_functions import https_fn
from firebase_admin import firestore
from auth import validate_uid

# Initialize Firestore client
db = firestore.client()

# Collection names
USERS_COLLECTION = "users"
WARDROBE_COLLECTION = "clothes"


def get_clothes(req):
    uid = validate_uid(req)
    clothes = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).get()
    clothes_list = [{"id": cloth.id, **cloth.to_dict()} for cloth in clothes]
    return clothes_list


def add_cloth(req):
    uid = validate_uid(req)
    data = req.data
    name = data.get("name")
    tags = data.get("tags")
    image = data.get("image")
    cloth_data = {"name": name, "tags": tags, "image": image}
    cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).add(cloth_data)
    return {"cloth_id": cloth_ref.id}


def add_cloth_bulk(req):
    uid = validate_uid(req)
    data_arr = req.data
    batch = db.batch()

    cloth_refs = []
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
    uid = validate_uid(req)
    data = req.data
    cloth_id = data.get("id")
    name = data.get("name")
    tags = data.get("tags")
    image = data.get("image")
    cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).document(cloth_id)
    update_data = {}
    if name:
        update_data["name"] = name
    if tags:
        update_data["tags"] = tags
    if image:
        update_data["image"] = image
    cloth_ref.update(update_data)
    return {"message": "Cloth edited successfully"}


def delete_cloth(req):
    uid = validate_uid(req)
    data = req.data
    cloth_id = data.get("id")
    cloth_ref = db.collection(USERS_COLLECTION).document(uid).collection(WARDROBE_COLLECTION).document(cloth_id)
    cloth_ref.delete()
    return {"message": "Cloth deleted successfully"}
