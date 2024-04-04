from firebase_functions import https_fn
from clothes import add_cloth, add_cloth_bulk, edit_cloth, delete_cloth, get_clothes
from fits import add_fit, edit_fit, delete_fit, get_fits

# Register callable functions for cloth operations
add_cloth = https_fn.on_call(add_cloth)
add_cloth_bulk = https_fn.on_call(add_cloth_bulk)
edit_cloth = https_fn.on_call(edit_cloth)
delete_cloth = https_fn.on_call(delete_cloth)
get_clothes = https_fn.on_call(get_clothes)

# Register callable functions for fit operations
add_fit = https_fn.on_call(add_fit)
edit_fit = https_fn.on_call(edit_fit)
delete_fit = https_fn.on_call(delete_fit)
get_fits = https_fn.on_call(get_fits)
