# QuickNotes System Design

## Description

QuickNotes is a cloud-based note-taking platform designed to support up to one million users. This project demonstrates both a working API client and a complete system design for a scalable production-ready notes application. The API client interacts with the JSONPlaceholder practice API using GET, POST, and DELETE requests. The design documents define how a real QuickNotes service would be built, including API endpoints, database design, scaling architecture, and infrastructure decisions.

---

## Features

### API Client

- Load notes from an API (GET)
- Create notes using an API request (POST)
- Delete notes using an API request (DELETE)
- Input validation for note titles
- Loading, success, error, and empty states
- Buttons disabled during requests
- Safe rendering using `textContent`

### API Design

- RESTful endpoint design
- Request and response examples
- Standard HTTP status codes
- Error handling design

### Data Model

- Users, notes, tags, and note-tags entities
- Primary keys and foreign keys
- One-to-many and many-to-many relationships
- SQL schema design
- Example SQL queries

### Architecture

- Scalable design for one million users
- CDN, cache, load balancer, and multiple application servers
- Primary database and read replica
- Queue and worker architecture
- Load estimates and request flows

---

## How to Run the API Client

1. Clone the repository.

```bash
git clone https://github.com/your-username/quicknotes-system-design.git
```

2. Open the project folder in VS Code.

3. Install the Live Server extension (optional).

4. Open `index.html` using:
   - Live Server, or
   - Any modern web browser.

5. Click **Load Notes** to retrieve notes from the API.

6. Create and delete notes using the form and buttons.

---

## Project Documents

### API Design

- `docs/api-design.md`

Describes the REST API endpoints, request formats, response formats, and error handling.

### Data Model

- `docs/data-model.md`

Describes the database schema, relationships, indexes, and SQL design.

### Architecture

- `docs/architecture.md`

Explains scalability, infrastructure, traffic estimates, architecture diagrams, request flows, and trade-offs.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- JSONPlaceholder API
- Markdown
- SQL Database Design

---

## What I Learned

- How REST APIs use GET, POST, and DELETE requests.
- How to design reusable API request functions with async/await and error handling.
- How to model relational data using tables, primary keys, foreign keys, and join tables.
- How caching, load balancing, and read replicas help systems scale.
- How to estimate traffic, storage, and infrastructure requirements for large-scale applications.
- How to document APIs, databases, and software architectures clearly.

---

## Repository Structure

```text
quicknotes-system-design/
│
├── index.html
├── style.css
├── api.js
├── README.md
│
└── docs/
    ├── api-design.md
    ├── data-model.md
    └── architecture.md
```

---

## Author

QuickNotes System Design Project

Web Foundations Course