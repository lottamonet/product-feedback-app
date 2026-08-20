# 📘 Product Feedback API Documentation

Base URL: `https://product-feedback-api-nwse.onrender.com`

## Overview

| Resource         | Method | Endpoint                                | Description                                  |
|------------------|--------|------------------------------------------|-----------------------------------------------|
| `suggestions`    | GET    | /get-all-suggestions                      | Get every suggestion                          |
| `suggestions`    | GET    | /get-suggestions-by-category/:category    | Get suggestions filtered to one category      |
| `suggestions`    | POST   | /add-one-suggestion                       | Create a new suggestion                       |
| `suggestions`    | POST   | /upvote-suggestion/:id                    | Increment one suggestion's upvote count by 1  |

---

### 🔹 GET `/get-all-suggestions`

**Description:** Returns every suggestion in the database, unfiltered.

**Example Request URL:**

```
GET /get-all-suggestions
```

**Example Response:** Array of suggestion objects

```json
[
  {
    "id": 1,
    "title": "Add tags for solutions",
    "category": "enhancement",
    "detail": "Easier to search for solutions based on a specific stack.",
    "upvotes": 3
  }
]
```

---

### 🔹 GET `/get-suggestions-by-category/:category`

**Description:** Returns suggestions filtered to a single category. `:category` must be one of `ui`, `ux`, `enhancement`, `bug`, `feature`. Returns `[]` (not an error) if no suggestions match — this is what powers the app's empty-state screen. Returns `400` if `:category` isn't one of the 5 valid values.

**Example Request URL:**

```
GET /get-suggestions-by-category/bug
```

**Example Response:** Array of suggestion objects, same shape as above, filtered to the requested category.

---

### 🔹 POST `/add-one-suggestion`

**Description:** Creates a new suggestion. All 3 fields are required and validated server-side (not just in the frontend form) — returns `400` with an `error` message if `title`/`detail` are empty or too long, or `category` isn't one of the 5 valid values.

**Example Request URL:**

```
POST /add-one-suggestion
```

**Example Request Body:**

```json
{
  "title": "Add a search bar",
  "category": "ui",
  "detail": "Make it easier to find specific suggestions by keyword."
}
```

**Example Response:** The newly created suggestion, including its generated `id` and default `upvotes: 0`.

```json
{
  "id": 8,
  "title": "Add a search bar",
  "category": "ui",
  "detail": "Make it easier to find specific suggestions by keyword.",
  "upvotes": 0
}
```

---

### 🔹 POST `/upvote-suggestion/:id`

**Description:** Increments one suggestion's `upvotes` count by 1 (atomically, in SQL — not read-then-write in JS) and returns the updated row. Returns `404` if no suggestion with that `id` exists.

**Example Request URL:**

```
POST /upvote-suggestion/8
```

**Example Response:** The updated suggestion.

```json
{
  "id": 8,
  "title": "Add a search bar",
  "category": "ui",
  "detail": "Make it easier to find specific suggestions by keyword.",
  "upvotes": 1
}
```
