
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let db;

// GET a book by ID
app.get("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const getBookQuery = `
        SELECT *
        FROM book
        WHERE id = ?;
    `;

    const book = await db.get(getBookQuery, [bookId]);

    if (book === undefined) {
        return response.status(404).json({
            message: "Book not found"
        });
    }

    response.status(200).json(book);
});

// GET all books with search, sorting, pagination, and price filtering
app.get("/books/", async (request, response) => {
    const {
        search_q = "",
        order_by = "id",
        order = "ASC",
        limit = "10",
        offset = "0",
        min_price,
        max_price
    } = request.query;

    const validColumns = ["id", "title", "author", "price", "pages"];

    if (!validColumns.includes(order_by)) {
        return response.status(400).json({
            message: "Invalid order_by column"
        });
    }

    const sortOrder = order.toUpperCase();

    if (!["ASC", "DESC"].includes(sortOrder)) {
        return response.status(400).json({
            message: "Invalid order value"
        });
    }

    const limitValue = Number(limit);
    const offsetValue = Number(offset);

    if (
        !Number.isInteger(limitValue) ||
        limitValue <= 0 ||
        !Number.isInteger(offsetValue) ||
        offsetValue < 0
    ) {
        return response.status(400).json({
            message: "Invalid limit or offset"
        });
    }

    if (
        (min_price !== undefined && !Number.isFinite(Number(min_price))) ||
        (max_price !== undefined && !Number.isFinite(Number(max_price)))
    ) {
        return response.status(400).json({
            message: "Price values must be numeric"
        });
    }

    if (
        min_price !== undefined &&
        max_price !== undefined &&
        Number(min_price) > Number(max_price)
    ) {
        return response.status(400).json({
            message: "min_price cannot be greater than max_price"
        });
    }

    let getBooksQuery = `
        SELECT *
        FROM book
        WHERE title LIKE ?
    `;

    const queryParams = [`%${search_q}%`];

    if (min_price !== undefined) {
        getBooksQuery += ` AND price >= ?`;
        queryParams.push(Number(min_price));
    }

    if (max_price !== undefined) {
        getBooksQuery += ` AND price <= ?`;
        queryParams.push(Number(max_price));
    }

    getBooksQuery += `
        ORDER BY ${order_by} ${sortOrder}
        LIMIT ? OFFSET ?;
    `;

    queryParams.push(limitValue, offsetValue);

    const books = await db.all(getBooksQuery, queryParams);

    response.status(200).json(books);
});

// POST a new book
app.post("/books/", async (request, response) => {
    const { title, author, price, pages } = request.body;

    if (typeof title !== "string" || title.trim() === "") {
        return response.status(400).json({
            message: "Title is required"
        });
    }

    if (typeof author !== "string" || author.trim() === "") {
        return response.status(400).json({
            message: "Author is required"
        });
    }

    if (price === undefined || price === null || price === "") {
        return response.status(400).json({
            message: "Price is required"
        });
    }

    if (typeof price !== "number" || !Number.isFinite(price)) {
        return response.status(400).json({
            message: "Price must be a numeric value"
        });
    }

    const addBookQuery = `
        INSERT INTO book (title, author, price, pages)
        VALUES (?, ?, ?, ?);
    `;

    await db.run(addBookQuery, [
        title.trim(),
        author.trim(),
        price,
        pages
    ]);

    response.status(201).json({
        message: "Book Added Successfully"
    });
});

// PUT update a book by ID
app.put("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const updateBookQuery = `
        UPDATE book
        SET
            title = ?,
            author = ?,
            price = ?,
            pages = ?
        WHERE id = ?;
    `;

    const result = await db.run(updateBookQuery, [
        title,
        author,
        price,
        pages,
        bookId
    ]);

    if (result.changes === 0) {
        return response.status(404).json({
            message: "Book not found"
        });
    }

    response.status(200).json({
        message: "Book Details Updated Successfully"
    });
});

// DELETE a book by ID
app.delete("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const deleteBookQuery = `
        DELETE FROM book
        WHERE id = ?;
    `;

    const result = await db.run(deleteBookQuery, [bookId]);

    if (result.changes === 0) {
        return response.status(404).json({
            message: "Book not found"
        });
    }

    response.status(200).json({
        message: "Book Deleted Successfully"
    });
});

// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: path.join(__dirname, "database", "books.db"),
            driver: sqlite3.Database
        });

        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();
