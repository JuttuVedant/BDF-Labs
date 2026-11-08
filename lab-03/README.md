# Lab 3: REST API, Query Parameters, Validation, and Debugging

## Student Details
- **Name:** Juttu Vedant
- **Registration Number:** 252U1R9048
- **Section:** Gen AI 2A(304)

**Live URL:** https://bdf-lab-03-vedant.onrender.com/  
**Books endpoint:** https://bdf-lab-03-vedant.onrender.com/books/

## 1. Project Description
This project implements a REST API for managing books using Node.js, Express.js, and SQLite. It supports CRUD operations, partial title search, sorting, pagination, price filtering, input validation, and appropriate HTTP status codes.

## 2. Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## 3. Installation and Setup
Open a terminal in the lab-03 folder and run:

    npm install
    npm start

For development with automatic restart, run:

    npm run dev

The server uses the PORT environment variable when supplied; otherwise, it defaults to port 3000. The SQLite database is stored at database/books.db.

## 4. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books/ | Get books with search, sorting, pagination, and price filters |
| GET | /books/:bookId/ | Get one book by ID |
| POST | /books/ | Add a book |
| PUT | /books/:bookId/ | Update a book |
| DELETE | /books/:bookId/ | Delete a book |

### Query Parameters for GET /books/

| Parameter | Default | Description |
|---|---|---|
| search_q | Empty string | Partial match against the book title |
| order_by | id | Sort column: id, title, author, price, or pages |
| order | ASC | Sort direction: ASC or DESC |
| limit | 10 | Maximum number of rows to return; must be a positive integer |
| offset | 0 | Number of rows to skip; must be a non-negative integer |
| min_price | Not applied | Optional inclusive minimum price |
| max_price | Not applied | Optional inclusive maximum price |

Example request:

    GET /books/?search_q=Atomic&order_by=price&order=DESC&limit=5&offset=0&min_price=100&max_price=600

User-supplied SQL values use placeholders. The sort column and direction are checked against allow-lists before being added to the SQL statement. Repeated query parameters are rejected with HTTP 400.

## 5. Validation and Status Codes
- Missing or blank title returns 400 Bad Request.
- Missing or blank author returns 400 Bad Request.
- Missing or non-numeric price returns 400 Bad Request.
- Invalid sort, pagination, or price query values return 400 Bad Request.
- Repeated query parameters return 400 Bad Request.
- A book ID that does not exist returns 404 Not Found.
- Successful creation returns 201 Created.
- Successful update and deletion return 200 OK.
- Error responses use a JSON message field.

## 6. Debugging Notes

| Problem | Cause | Fix |
|---|---|---|
| EADDRINUSE | Another process is using the selected port. | Stop the other process or start the server with a different PORT. |
| Wrong import or file path | A required module or database file cannot be found. | Check the relative path and resolve the database path from the current file directory. |
| no such table | The SQL table name does not match the table created in SQLite. | Use the exact table name book consistently. |
| Missing await | A database operation may still be running when its result is used. | Await database reads and writes before sending the HTTP response. |

## 7. Screenshots
The screenshots folder contains the Postman examples for the following requests and validation cases.

### GET Requests
| Test | Screenshot |
|---|---|
| Limit | ![GET limit](screenshots/GET_limit.png) |
| Offset | ![GET offset](screenshots/GET_offset.png) |
| Search | ![GET search](screenshots/GET_search_q.png) |
| Sort by price ascending | ![GET price ascending](screenshots/GET_order_by_price_ASC.png) |
| Sort by price descending | ![GET price descending](screenshots/GET_order_by_price_DESC.png) |
| Minimum price | ![GET minimum price](screenshots/GET_min_price.png) |
| Maximum price | ![GET maximum price](screenshots/GET_max_price.png) |
| Price range | ![GET price range](screenshots/GET_price_range.png) |
| Invalid limit | ![Invalid limit](screenshots/GET_invalid_limit.png) |
| Invalid offset | ![Invalid offset](screenshots/GET_invalid_offset.png) |
| Invalid order | ![Invalid order](screenshots/GET_invalid_order.png) |
| Invalid order_by | ![Invalid order by](screenshots/GET_invalid_order_by.png) |
| Invalid minimum price | ![Invalid min price](screenshots/GET_invalid_min_price.png) |
| Invalid maximum price | ![Invalid max price](screenshots/GET_invalid_max_price.png) |
| Invalid price range | ![Invalid price range](screenshots/GET_invalid_price_range.png) |
| Get book by ID | ![Get book by ID](screenshots/GET_book_by_ID.png) |
| Get missing book | ![Get missing book](screenshots/GET_book_not_found.png) |

### POST Requests
| Test | Screenshot |
|---|---|
| Add book | ![POST add book](screenshots/POST_add_book.png) |
| Missing title | ![POST missing title](screenshots/POST_missing_title.png) |
| Missing author | ![POST missing author](screenshots/POST_missing_author.png) |
| Missing price | ![POST missing price](screenshots/POST_missing_price.png) |
| Invalid price | ![POST invalid price](screenshots/POST_invalid_price.png) |

### PUT Requests
| Test | Screenshot |
|---|---|
| Update book | ![PUT update book](screenshots/PUT_update_book.png) |
| Update missing book | ![PUT missing book](screenshots/PUT_book_not_found.png) |

### DELETE Requests
| Test | Screenshot |
|---|---|
| Delete book | ![DELETE book](screenshots/DELETE_book.png) |
| Delete missing book | ![DELETE missing book](screenshots/DELETE_book_not_found.png) |

## 8. Project Structure

    lab-03/
    ├── app.js
    ├── package.json
    ├── package-lock.json
    ├── database/
    │   └── books.db
    ├── screenshots/
    └── .gitignore
