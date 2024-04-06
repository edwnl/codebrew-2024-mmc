from firebase_functions import https_fn


# Function to validate UID presence
def validate_uid(req):
    if req.auth is None:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.FAILED_PRECONDITION,
                                  message="The function must be called while authenticated.")
    else:
        return req.auth.uid
