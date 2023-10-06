# Library Management System

A backend system for managing books in a library using Node.js, Express.js, and MongoDB.

## Features

- User Registration & Authentication
  - Register a new user with details like name, email, password.
  - Authenticate users for login using JWT.
- Book Management
  - Add new books with details like ISBN, title, author, published year, and quantity.
  - Update book details.
  - Delete books.
  - List all available books.
- Borrowing & Returning Books
  - Users can borrow a book.
  - Users can return a book.
  - A user should not be able to borrow more than 3 books at a time.
  - Keeps track of borrowed books and their return dates.
- Search Functionality
  - Users can search for a book by its title, author, or ISBN.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/themanvendra00/library-management-system
   ```

2. Install dependencies:
   ```
   cd library-management-system
   npm install
   ```
3. Set up Environment Variables:

- PORT = <your-port-number>
- MONGOURI = <your-mongodb-uri>
- JWTSECRETKEY = <your-jwt-secret>

4. Start the server:

````
npm run server
````

### Usage

- Register a user and authenticate to access the system's features.
- Add, update, and delete books in the library.
- Borrow and return books while observing the maximum limit of 3 borrowed books.
- Search for books by title, author, or ISBN.

## API Documentation

## User Routes
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate and log in a user.
Book Routes
- `POST /api/books/add`: Add a new book to the library.
- `PUT /api/books/update/:id`: Update book details by book ID.
- `DELETE /api/books/delete/:id`: Delete a book by book ID.
- `GET /api/books/list`: List all available books.
Borrowing Routes
- `POST /api/borrow/borrow`: Borrow a book.
- `PUT /api/borrow/return/:id`: Return a borrowed book by borrowed book ID.
Search Routes
- `GET /api/search/search?query=:query`: Search for books by title, author, or ISBN.