# Plan: Books Web Service Implementation

## Goal
Implement a RESTful Web Service for managing a library collection of books using Express.js and MongoDB.

---

## Tasks Breakdown

### Task 1: Database Setup & Connection
- [ ] Configure MongoDB connection string in `.env`.
- [ ] Establish connection to MongoDB cluster in database configuration file.
- [ ] Create `books` collection and insert sample seed data.

### Task 2: Implement `GET /books` (Get All Books)
- [ ] Define route and controller for `GET /books`.
- [ ] Query MongoDB collection to fetch all book documents.
- [ ] Return JSON response with status `200 OK`.

### Task 3: Implement `GET /books/:id` (Get Book by ID)
- [ ] Define route and controller for `GET /books/:id`.
- [ ] Convert `id` parameter into MongoDB `ObjectId`.
- [ ] Query database for matching document.
- [ ] Return book object (`200 OK`) or `404 Not Found` error.

### Task 4: Implement `POST /books` (Create Book)
- [ ] Define route and controller for `POST /books`.
- [ ] Extract and validate body parameters (`title`, `author`, `genre`, `publishedYear`, `isbn`).
- [ ] Insert new book document into MongoDB.
- [ ] Return created document with status `201 Created`.

### Task 5: Implement `PUT /books/:id` (Update Book)
- [ ] Define route and controller for `PUT /books/:id`.
- [ ] Validate `id` and request body updates.
- [ ] Execute `updateOne` or `findAndModify` in MongoDB.
- [ ] Return status `200 OK` / `204 No Content` or `404 Not Found`.

### Task 6: Implement `DELETE /books/:id` (Delete Book)
- [ ] Define route and controller for `DELETE /books/:id`.
- [ ] Delete matching document from MongoDB.
- [ ] Return success response or `404 Not Found`.

### Task 7: Testing & Error Handling
- [ ] Handle invalid ObjectIDs and missing body fields with `400 Bad Request`.
- [ ] Wrap database queries in `try/catch` blocks for `500 Internal Server Error` handling.
- [ ] Test all endpoints in Postman or REST Client.