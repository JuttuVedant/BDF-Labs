# Backend Development Fundamentals

## Lab 03 – REST API, Query Parameters, Validation, and Debugging

### Student Details
- **Name:** Juttu Vedant
- **Registration Number:** 252U1R9048
- **Section:** Gen AI 2A(304)

---

## 1. Project Description

This project implements a RESTful API for managing books using Node.js, Express.js, and SQLite.

The API supports CRUD operations, query parameters for searching and sorting books, pagination, price filtering, input validation, and appropriate HTTP status codes.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Visual Studio Code

## 3. Installation and Setup

1. Clone or download the repository.
2. Navigate to the `lab-03` folder.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

5. The server runs at:

   `http://localhost:3000`

## 4. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Get all books with search, sorting, pagination, and price filters |
| GET | `/books/:bookId/` | Get a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update an existing book |
| DELETE | `/books/:bookId/` | Delete a book |

### Query Parameters

| Parameter | Description |
|---|---|
| `search_q` | Search books by title |
| `order_by` | Sort by id, title, author, price, or pages |
| `order` | Sort in ASC or DESC order |
| `limit` | Number of books to return |
| `offset` | Number of books to skip |
| `min_price` | Minimum book price |
| `max_price` | Maximum book price |

## 5. Validation and Error Handling

- Title and author are required when adding a book.
- Price must be a valid numeric value.
- Invalid query parameters return HTTP 400 Bad Request.
- Requests for nonexistent book IDs return HTTP 404 Not Found.
- Successful book creation returns HTTP 201 Created.
- Successful update and deletion return HTTP 200 OK.
- Responses are provided in JSON format.

## 6. Environment Variables and Configuration

- `PORT`: Server port (default: 3000).
- Database path: `database/books.db`.

No sensitive credentials are required for this project.

## 7. Debugging

The following debugging scenarios were covered:

- **EADDRINUSE:** Address already in use when the server port is occupied.
- **Incorrect import path:** Fixing incorrect file or database paths.
- **Table name error:** Resolving `no such table` errors by using the correct table name.
- **Missing await:** Ensuring asynchronous database operations complete before sending responses.
## 8. Screenshots

All Postman API requests and responses are demonstrated below.

### GET Requests

#### GET Limit
![GET Limit](screenshots/GET_limit.png)

#### GET Offset
![GET Offset](screenshots/GET_offset.png)

#### GET Search
![GET Search](screenshots/GET_search_q.png)

#### GET Sorting by Price - Descending
![GET Price Descending](screenshots/GET_order_by_price_DESC.png)

#### GET Sorting by Price - Ascending
![GET Price Ascending](screenshots/GET_order_by_price_ASC.png)

#### GET Minimum Price
![GET Minimum Price](screenshots/GET_min_price.png)

#### GET Maximum Price
![GET Maximum Price](screenshots/GET_max_price.png)

#### GET Price Range
![GET Price Range](screenshots/GET_price_range.png)

#### GET Invalid Limit
![GET Invalid Limit](screenshots/GET_invalid_limit.png)

#### GET Invalid Offset
![GET Invalid Offset](screenshots/GET_invalid_offset.png)

#### GET Invalid Order By
![GET Invalid Order By](screenshots/GET_invalid_order_by.png)

#### GET Invalid Order
![GET Invalid Order](screenshots/GET_invalid_order.png)

#### GET Invalid Minimum Price
![GET Invalid Minimum Price](screenshots/GET_invalid_min_price.png)

#### GET Invalid Maximum Price
![GET Invalid Maximum Price](screenshots/GET_invalid_max_price.png)

#### GET Invalid Price Range
![GET Invalid Price Range](screenshots/GET_invalid_price_range.png)

#### GET Book by ID
![GET Book by ID](screenshots/GET_book_by_ID.png)

#### GET Book Not Found
![GET Book Not Found](screenshots/GET_book_not_found.png)

### POST Requests

#### POST Add Book
![POST Add Book](screenshots/POST_add_book.png)

#### POST Missing Title
![POST Missing Title](screenshots/POST_missing_title.png)

#### POST Missing Author
![POST Missing Author](screenshots/POST_missing_author.png)

#### POST Missing Price
![POST Missing Price](screenshots/POST_missing_price.png)

#### POST Invalid Price
![POST Invalid Price](screenshots/POST_invalid_price.png)

### PUT Requests

#### PUT Update Book
![PUT Update Book](screenshots/PUT_update_book.png)

#### PUT Book Not Found
![PUT Book Not Found](screenshots/PUT_book_not_found.png)

### DELETE Requests

#### DELETE Book
![DELETE Book](screenshots/DELETE_book.png)

#### DELETE Book Not Found
![DELETE Book Not Found](screenshots/DELETE_book_not_found.png)


### GET Requests

- `GET_limit.png`
- `GET_offset
