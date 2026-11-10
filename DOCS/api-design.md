# QuickNotes API Design

## Overview

The QuickNotes API allows authenticated users to create, view, update, search, and delete notes. All requests and responses use JSON format and are sent over HTTPS.

---

# Endpoints

| Method | Path | Description | Success Status |
|----------|----------|-------------|----------|
| GET | /notes | Get all notes for the current user | 200 OK |
| GET | /notes/{id} | Get a single note by ID | 200 OK |
| POST | /notes | Create a new note | 201 Created |
| PUT | /notes/{id} | Update an existing note | 200 OK |
| DELETE | /notes/{id} | Delete a note | 204 No Content |
| GET | /notes?tag=work | Search notes by tag | 200 OK |

---

# Create Note

## Request

### POST /notes

```json
{
  "title": "Study SQL",
  "body": "Practice JOIN queries",
  "tags": ["study", "database"]
}
```

## Response

### Status: 201 Created

```json
{
  "id": 101,
  "title": "Study SQL",
  "body": "Practice JOIN queries",
  "tags": ["study", "database"],
  "createdAt": "2026-09-30T12:00:00Z"
}
```

---

# List Notes

## Request

### GET /notes

## Response

### Status: 200 OK

```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "body": "Milk and bread",
    "createdAt": "2026-09-30T10:00:00Z"
  },
  {
    "id": 2,
    "title": "Study SQL",
    "body": "Practice JOIN queries",
    "createdAt": "2026-09-30T11:00:00Z"
  }
]
```

---

# Get One Note

## Request

### GET /notes/1

## Response

### Status: 200 OK

```json
{
  "id": 1,
  "title": "Buy groceries",
  "body": "Milk and bread",
  "createdAt": "2026-09-30T10:00:00Z"
}
```

---

# Update Note

## Request

### PUT /notes/1

```json
{
  "title": "Buy groceries",
  "body": "Milk, bread and eggs"
}
```

## Response

### Status: 200 OK

```json
{
  "id": 1,
  "title": "Buy groceries",
  "body": "Milk, bread and eggs",
  "updatedAt": "2026-09-30T13:15:00Z"
}
```

---

# Delete Note

## Request

### DELETE /notes/1

## Response

### Status: 204 No Content

No response body is returned.

---

# Search Notes by Tag

## Request

### GET /notes?tag=study

## Response

### Status: 200 OK

```json
[
  {
    "id": 2,
    "title": "Study SQL",
    "body": "Practice JOIN queries"
  }
]
```

---

# Error Codes

## 400 Bad Request

Occurs when the request body is invalid.

Example:

```json
{
  "error": {
    "code": 400,
    "message": "Title is required."
  }
}
```

---

## 401 Unauthorized

Occurs when the user is not logged in or the authentication token is missing.

Example:

```json
{
  "error": {
    "code": 401,
    "message": "Authentication required."
  }
}
```

---

## 403 Forbidden

Occurs when the user attempts to access or modify another user's note.

Example:

```json
{
  "error": {
    "code": 403,
    "message": "Access denied."
  }
}
```

---

## 404 Not Found

Occurs when the requested note does not exist.

Example:

```json
{
  "error": {
    "code": 404,
    "message": "Note not found."
  }
}
```

---

## 500 Internal Server Error

Occurs when an unexpected server error happens.

Example:

```json
{
  "error": {
    "code": 500,
    "message": "An unexpected error occurred."
  }
}
```

---

# Authentication

Protected endpoints require a valid authentication token sent in the Authorization header.

Example:

```http
Authorization: Bearer eyJhbGciOi...
```

---

# Summary

The QuickNotes API supports creating, reading, updating, deleting, and searching notes while providing clear status codes, JSON responses, and consistent error handling.