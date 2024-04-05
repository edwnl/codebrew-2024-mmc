# MMC Codebrew 2024 Hackathon

## Introduction
Welcome to the repository of team MMC's codebrew 2024 project.

## Tech Stack
- React JS
- JavaScript
- Material UI

## Naming Conventions

### Commits
- feat: new feature description
- style: update styles
- fix: fixed a bug
- refactor: existing code refactored
- chore: for everything else

# Backend - Firebase Cloud Functions Documentation

## Database Structure

- **USERS**
    - [user_id]
        - **FITS**
            - [fit_id]
                - `name`: (string)
                - `tags`: (list)
                - `cloth_ids`: (list)
        - **WARDROBE**
            - [cloth_id]
                - `name`: (string)
                - `tags`: (list)
                - `image`: (file)

## Functions

### Clothes Operations

#### Add Cloth

- **Function Name:** `add_cloth`
- **Description:** Creates a new piece of clothing for the user.
- **Parameters:** `name` (str), `tags` (list), `image` (file)
- **Sample Response:** `{"cloth_id": "123abc"}`

#### Add Cloth Bulk

- **Function Name:** `add_cloth_bulk`
- **Description:** Bulk creates pieces of clothing for the user.
- **Parameters:** `data_arr` (list of objects)
- **Sample Response:** `[{"cloth_id": "123abc"}, {"cloth_id": "456def"}]`

#### Edit Cloth

- **Function Name:** `edit_cloth`
- **Description:** Edits an existing piece of clothing for the user.
- **Parameters:** `id` (str), `name` (optional), `tags` (optional), `image` (optional)
- **Sample Response:** `{"message": "Cloth edited successfully"}`

#### Delete Cloth

- **Function Name:** `delete_cloth`
- **Description:** Deletes an existing piece of clothing for the user.
- **Parameters:** `id` (str)
- **Sample Response:** `{"message": "Cloth deleted successfully"}`

#### Get Clothes

- **Function Name:** `get_clothes`
- **Description:** Retrieves a list of clothing items for the user.
- **Parameters:** None
- **Sample Response:** `[{"id": "123abc", "name": "T-Shirt", "tags": ["casual", "blue"]}, {"id": "456def", "name": "Jeans", "tags": ["denim", "pants"]}]`

### Fits Operations

#### Add Fit

- **Function Name:** `add_fit`
- **Description:** Creates a new fit for the user.
- **Parameters:** `cloth_ids` (list), `tags` (list)
- **Sample Response:** `{"fit_id": "abc123"}`

#### Edit Fit

- **Function Name:** `edit_fit`
- **Description:** Edits an existing fit for the user.
- **Parameters:** `id` (str), `name` (optional), `tags` (optional), `cloth_ids` (optional)
- **Sample Response:** `{"message": "Fit edited successfully"}`

#### Delete Fit

- **Function Name:** `delete_fit`
- **Description:** Deletes an existing fit for the user.
- **Parameters:** `id` (str)
- **Sample Response:** `{"message": "Fit deleted successfully"}`

#### Get Fits

- **Function Name:** `get_fits`
- **Description:** Retrieves a list of fits for the user.
- **Parameters:** None
- **Sample Response:** `[{"id": "abc123", "cloth_ids": ["123abc", "456def"], "tags": ["casual", "summer"]}, {"id": "def456", "cloth_ids": ["789ghi", "012jkl"], "tags": ["formal", "winter"]}]`
