from auth import validate_uid
from firebase_functions import https_fn
from firebase_admin import firestore

# Collection names
USERS_COLLECTION = "users"
FITS_COLLECTION = "fits"

def get_fits(req):
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Query fits collection for the user
    fits = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).get()

    # Convert documents to list of dictionaries
    fits_list = [fit.to_dict() for fit in fits]

    return fits_list

def add_fit(req):
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Extract data from request
    data = req.data
    cloth_ids = data.get("cloth_ids")
    tags = data.get("tags")

    # Create fit data
    fit_data = {"cloth_ids": cloth_ids, "tags": tags}

    # Add fit to user's fits
    fit_ref = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).add(fit_data)

    return {"fit_id": fit_ref.id}

def edit_fit(req):
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Extract data from request
    data = req.data
    fit_id = data.get("id")
    name = data.get("name")
    tags = data.get("tags")
    cloth_ids = data.get("cloth_ids")

    # Get fit reference
    fit_ref = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).document(fit_id)

    # Check if the fit belongs to the user
    fit_data = fit_ref.get().to_dict()
    if not fit_data:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.NOT_FOUND,
                                  message="Fit not found")
    if fit_data['uid'] != uid:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.PERMISSION_DENIED,
                                  message="Permission denied")

    # Update fit data
    update_data = {}
    if name:
        update_data["name"] = name
    if tags:
        update_data["tags"] = tags
    if cloth_ids:
        update_data["cloth_ids"] = cloth_ids

    # Update fit document
    fit_ref.update(update_data)

    return {"message": "Fit edited successfully"}

def delete_fit(req):
    # Get user ID
    uid = validate_uid(req)

    # Initialize Firestore client
    db = firestore.client()

    # Extract fit ID from request
    data = req.data
    fit_id = data.get("id")

    # Get fit reference
    fit_ref = db.collection(USERS_COLLECTION).document(uid).collection(FITS_COLLECTION).document(fit_id)

    # Check if the fit exists and belongs to the user
    fit_data = fit_ref.get().to_dict()
    if not fit_data:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.NOT_FOUND,
                                  message="Fit not found")
    if fit_data['uid'] != uid:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.PERMISSION_DENIED,
                                  message="Permission denied")

    # Delete fit document
    fit_ref.delete()

    return {"message": "Fit deleted successfully"}
