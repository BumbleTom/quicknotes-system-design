# QuickNotes Data Model

## Entities

### Users

Stores information about users of the QuickNotes system.

| Column | Type | Key | Description |
|----------|----------|----------|----------|
| id | INTEGER | Primary Key | Unique user identifier |
| name | VARCHAR(100) | | User's full name |
| email | VARCHAR(255) | Unique | User email address |
| password_hash | VARCHAR(255) | | Encrypted password |

---

### Notes

Stores notes created by users.

| Column | Type | Key | Description |
|----------|----------|----------|----------|
| id | INTEGER | Primary Key | Unique note identifier |
| user_id | INTEGER | Foreign Key | References users(id) |
| title | VARCHAR(100) | | Note title |
| body | TEXT | | Note content |
| created_at | DATETIME | | Creation timestamp |

---

### Tags

Stores note tags.

| Column | Type | Key | Description |
|----------|----------|----------|----------|
| id | INTEGER | Primary Key | Unique tag identifier |
| name | VARCHAR(50) | Unique | Tag name |

---

### Note_Tags

Join table linking notes and tags.

| Column | Type | Key | Description |
|----------|----------|----------|----------|
| note_id | INTEGER | Foreign Key | References notes(id) |
| tag_id | INTEGER | Foreign Key | References tags(id) |

---

# Relationships

## Users → Notes

This is a one-to-many relationship.

One user can create many notes, but each note belongs to only one user.

---

## Notes ↔ Tags

This is a many-to-many relationship.

A note can have many tags and a tag can be attached to many notes.

The `note_tags` table is required because relational databases cannot directly store many-to-many relationships.

---

# CREATE TABLE Statements

## Users

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
```

## Notes

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT,
    created_at DATETIME NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);
```

## Tags

```sql
CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
```

## Note_Tags

```sql
CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,

    PRIMARY KEY (note_id, tag_id),

    FOREIGN KEY (note_id)
        REFERENCES notes(id),

    FOREIGN KEY (tag_id)
        REFERENCES tags(id)
);
```

---

# Example SQL Queries

## 1. Get All Notes for a User

```sql
SELECT *
FROM notes
WHERE user_id = 1;
```

---

## 2. Get Notes and Their Tags (JOIN)

```sql
SELECT
    notes.title,
    tags.name
FROM notes
JOIN note_tags
    ON notes.id = note_tags.note_id
JOIN tags
    ON tags.id = note_tags.tag_id;
```

---

## 3. Count Notes Per User

```sql
SELECT
    user_id,
    COUNT(*) AS total_notes
FROM notes
GROUP *Y user_id;
```

---

# Index Recom*endation

```sql
CREATE INDEX idx_*otes_user_id
ON*notes(user_id);
```

### Reason

T*e application will frequently retr*eve notes belonging to a specific *ser. Indexing `user_id` improves q*ery performance and reduces databa*e lookup time.

---

# SQL vs NoSQ* Decision

I would choose SQL for *uickNotes because the system conta*ns structured data with clear rela*ionships between users, notes, and*tags. SQL databases provide foreig* keys, data integrity, consistency* and powerful query capabilities. *ince QuickNotes needs relationship*, joins, and reliable transactiona* behaviour, a relational database *s a better fit than a NoSQL databa*e.