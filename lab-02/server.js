const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'library.db');
let db;

async function initializeDBAndServer() {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    await db.exec(`CREATE TABLE IF NOT EXISTS book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      price INTEGER NOT NULL,
      pages INTEGER NOT NULL
    );`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  }
}

app.get('/books/', async (req, res) => {
  try { res.status(200).json(await db.all('SELECT * FROM book ORDER BY id;')); }
  catch { res.status(500).json({ error: 'Failed to retrieve books' }); }
});

app.get('/books/:bookId/', async (req, res) => {
  try {
    const book = await db.get('SELECT * FROM book WHERE id = ?;', [req.params.bookId]);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch { res.status(500).json({ error: 'Failed to retrieve book' }); }
});

app.post('/books/', async (req, res) => {
  try {
    const { title, author, price, pages } = req.body;
    if (!title || !author || price === undefined || pages === undefined)
      return res.status(400).json({ error: 'title, author, price and pages are required' });
    const result = await db.run(
      'INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?);',
      [title, author, price, pages]
    );
    res.status(201).json(await db.get('SELECT * FROM book WHERE id = ?;', [result.lastID]));
  } catch { res.status(500).json({ error: 'Failed to add book' }); }
});

app.put('/books/:bookId/', async (req, res) => {
  try {
    const { title, author, price, pages } = req.body;
    const id = req.params.bookId;
    if (!title || !author || price === undefined || pages === undefined)
      return res.status(400).json({ error: 'title, author, price and pages are required' });
    const oldBook = await db.get('SELECT * FROM book WHERE id = ?;', [id]);
    if (!oldBook) return res.status(404).json({ error: 'Book not found' });
    await db.run('UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?;',
      [title, author, price, pages, id]);
    res.status(200).json(await db.get('SELECT * FROM book WHERE id = ?;', [id]));
  } catch { res.status(500).json({ error: 'Failed to update book' }); }
});

app.delete('/books/:bookId/', async (req, res) => {
  try {
    const id = req.params.bookId;
    const oldBook = await db.get('SELECT * FROM book WHERE id = ?;', [id]);
    if (!oldBook) return res.status(404).json({ error: 'Book not found' });
    await db.run('DELETE FROM book WHERE id = ?;', [id]);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch { res.status(500).json({ error: 'Failed to delete book' }); }
});

initializeDBAndServer();
