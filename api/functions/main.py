from firebase_functions import https_fn
from clothes import add_cloth, edit_cloth
from fits import add_fit, edit_fit

# Register callable functions
add_cloth = https_fn.on_call(add_cloth)
edit_cloth = https_fn.on_call(edit_cloth)
add_fit = https_fn.on_call(add_fit)
edit_fit = https_fn.on_call(edit_fit)
