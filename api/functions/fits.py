from firebase_functions import https_fn
from firebase_admin import firestore

from api.functions.auth import validate_uid

# Initialize Firestore client
db = firestore.client()

# Collection names
USERS_COLLECTION = "USERS"
FITS_COLLECTION = "FITS"

# Register callable functions for fit operations
@https_fn.on_call()
def add_fit(req: https_fn.CallableRequest):
    # Get user ID from authentication
    uid = validate_uid(req)

    # Get fit data from request
    data = req.data
    name = data.get("name")
    tags = data.get("tags")

    # Add fit for the user
    fit_data = {"name": name, "tags": tags}
    fit_ref = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).add(fit_data)
    return {"fit_id": fit_ref.id}

@https_fn.on_call()
def edit_fit(req: https_fn.CallableRequest):
    # Get user ID from authentication
    uid = validate_uid(req)

    # Get fit data from request
    data = req.data
    fit_id = data.get("fit_id")
    name = data.get("name")
    tags = data.get("tags")

    # Edit fit for the user
    fit_ref = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).document(fit_id)
    update_data = {}
    if name:
        update_data["name"] = name
    if tags:
        update_data["tags"] = tags
    fit_ref.update(update_data)

    return {"message": "Fit edited successfully"}