# Books & Authors API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Data Model
* `id` (string, required, e.g., "b1") - Unique custom identifier.
* `authorId` (string, required) - Must match an existing author's custom `id`.
* `title` (string, required) - Non-empty title.
* `publicationDate` (string, required) - Valid ISO date string (YYYY-MM-DD).

### Routes & Validation
* **GET /books**: Returns `200 OK` with an array of all books.
* **GET /books/:id**: Returns `200 OK` with matching book object, or `404 Not Found`.
* **POST /books**: Creates a book. Returns `201 Created`. Fails with `400 Bad Request` if required fields are missing, if `id` is a duplicate, or if `authorId` does not exist in the authors collection.
* **PUT /books/:id**: Updates an existing book. Returns `200 OK`. Fails with `400 Bad Request` if `authorId` is invalid, or `404 Not Found` if book ID does not exist.
* **DELETE /books/:id**: Removes book. Returns `204 No Content`, or `404 Not Found`.

---

## Feature 2: Author CRUD Operations

### Data Model
* `id` (string, required, e.g., "a1") - Unique custom author identifier.
* `name` (string, required) - Full name of author.
* `birthYear` (number, required) - Numeric birth year.

### Routes & Validation
* **GET /authors**: Returns `200 OK` with an array of author objects.
* **GET /authors/:id**: Returns `200 OK` or `404 Not Found`.
* **POST /authors**: Creates a new author. Returns `201 Created`. Fails with `400 Bad Request` if fields are missing or `id` already exists.
* **PUT /authors/:id**: Updates author details. Returns `200 OK` or `404 Not Found`.
* **DELETE /authors/:id**: Deletes author. Returns `204 No Content`. Returns `400 Bad Request` if the author still has active books in the database.