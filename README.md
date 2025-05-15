# Book Management API

A simple REST API for managing books, built with **Node.js** and **SQLite**. This API supports CRUD operations and bulk import functionality.

---

## Features

- **CRUD Operations**:
  - `GET /books`: Get all books.
  - `GET /books/:id`: Get a specific book by ID.
  - `POST /books`: Add a new book.
  - `PUT /books/:id`: Update a book.
  - `DELETE /books/:id`: Delete a book.

- **Bulk Import**:
  - `POST /books/import`: Upload a CSV file to add multiple books.
  - Validates rows and returns errors for invalid data.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/book-management-api.git
   cd book-management-api
2. Install Dependencies:
npm install

3. Set Up Environment Variables:
Create a .env file:
PORT=3000

4. Run the Application:
   node app.js

----
API Endpoints
Books CRUD Operations
Method	Endpoint	Description
GET	/books	Get a list of all books
GET	/books/:id	Get details of a specific book
POST	/books	Add a new book
PUT	/books/:id	Update an existing book
DELETE	/books/:id	Delete a book
Bulk Import
Method	Endpoint	Description
POST	/books/import	Upload a CSV file to add books

----
Testing
1.Run unit tests:
npm test

CSV Format for Bulk Import
title,author,publishedYear
The Alchemist,Paulo Coelho,1988
1984,George Orwell,194

-----
Project Structure
book-management-api/
├── controllers/         # API logic
├── routes/              # API routes
├── tests/               # Unit tests
├── config/              # Config files
├── uploads/             # Temporary file storage
├── [app.js]              # Main entry point
└── README.md            # Documentation


   #######################

   ## Postman Collection

You can find the exported Postman collection here:  
[book_management_api.postman_apis](## Postman Collection

You can find the exported Postman collection here:  
[book_management_api.postman_apis](https://github.com/nousheen74/book-management-api/blob/8e864e714bf6aabce195095b5d1491f1aabddc76/book_management_api.postman_apis)

**Raw file for direct import:**  
https://raw.githubusercontent.com/nousheen74/book-management-api/8e864e714bf6aabce195095b5d1491f1aabddc76/book_management_api.postman_apis

### How to Import

1. Download the `.postman_apis` file from the link above.
2. Open Postman.
3. Click the **Import** button.
4. Select the downloaded file.
5. The collection will appear in your Postman workspace.)


