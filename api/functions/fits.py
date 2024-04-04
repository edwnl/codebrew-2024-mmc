from api.functions.auth import validate_uid
from firebase_admin import firestore

# Initialize Firestore client
db = firestore.client()

# Collection names
USERS_COLLECTION = "users"
FITS_COLLECTION = "fits"


def get_fits(req):
    uid = validate_uid(req)
    fits = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).get()
    fits_list = [{"id": fit.id, **fit.to_dict()} for fit in fits]
    return fits_list


def add_fit(req):
    uid = validate_uid(req)
    data = req.data
    cloth_ids = data.get("cloth_ids")
    tags = data.get("tags")
    fit_data = {"cloth_ids": cloth_ids, "tags": tags}
    fit_ref = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).add(fit_data)
    return {"fit_id": fit_ref.id}


def edit_fit(req):
    uid = validate_uid(req)
    data = req.data
    fit_id = data.get("id")
    name = data.get("name")
    tags = data.get("tags")
    cloth_ids = data.get("cloth_ids")
    fit_ref = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).document(fit_id)
    update_data = {}
    if name:
        update_data["name"] = name
    if tags:
        update_data["tags"] = tags
    if cloth_ids:
        update_data["cloth_ids"] = cloth_ids
    fit_ref.update(update_data)
    return {"message": "Fit edited successfully"}


def delete_fit(req):
    uid = validate_uid(req)
    data = req.data
    fit_id = data.get("id")
    fit_ref = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).document(fit_id)
    fit_ref.delete()
    return {"message": "Fit deleted successfully"}
