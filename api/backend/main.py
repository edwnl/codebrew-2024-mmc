import firebase_admin
from firebase_functions import https_fn, options

REGION = "australia-southeast1"

default_app = firebase_admin.initialize_app()
CORS_OPTIONS = options.CorsOptions(cors_origins="*", cors_methods=["get", "post", "options"])

from clothes import add_cloth, add_cloth_bulk, edit_cloth, delete_cloth, get_clothes
from fits import add_fit, edit_fit, delete_fit, get_fits

# Register callable functions for cloth operations
@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def add_cloth_handler(req):
    return add_cloth(req)

@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def add_cloth_bulk_handler(req):
    return add_cloth_bulk(req)

@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def edit_cloth_handler(req):
    return edit_cloth(req)

@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def delete_cloth_handler(req):
    return delete_cloth(req)

@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def get_clothes_handler(req):
    return get_clothes(req)

# Register callable functions for fit operations
@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def add_fit_handler(req):
    return add_fit(req)

@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def edit_fit_handler(req):
    return edit_fit(req)

@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def delete_fit_handler(req):
    return delete_fit(req)

@https_fn.on_call(region=REGION, cors=CORS_OPTIONS)
def get_fits_handler(req):
    return get_fits(req)
