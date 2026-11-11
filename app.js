import express from 'express';
import { books } from './db.js';

import express from 'express';
import dotenv from 'dotenv';
import indexRoutes from './routes/index.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', indexRoutes);

app.listen(PORT, () => {
    console.log(`השרת רץ בפורט ${PORT}`);
});




app.use(express.json());

// נתיב בסיסי
app.all('/', (req, res) => {
    res.send("שלום וברוכים הבאים לשרת הספרייה");
});

// קבלת כל הספרים כולל Pagination וחיפוש לפי שם
app.get('/books', (req, res) => {
    let { page = 1, limit = 10, search = '' } = req.query;
    let filteredBooks = books;

    if (search) {
        filteredBooks = filteredBooks.filter(b => b.name.includes(search));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    res.json(paginatedBooks);
});

// קבלת ספר לפי קוד
app.get('/books/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const book = books.find(b => b.code === code);
    if (!book) return res.status(404).send("הספר לא נמצא");
    res.json(book);
});

// הוספת ספר
app.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.isBorrowed = false;
    newBook.borrowHistory = [];
    books.push(newBook);
    res.status(201).json(newBook);
});

// עדכון ספר
app.put('/books/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const book = books.find(b => b.code === code);
    if (!book) return res.status(404).send("הספר לא נמצא");

    const { name, category, price } = req.body;
    if (name) book.name = name;
    if (category) book.category = category;
    if (price) book.price = price;

    res.json(book);
});

// ביצוע השאלה
app.patch('/books/:code/borrow', (req, res) => {
    const code = parseInt(req.params.code);
    const { userId } = req.body;
    const book = books.find(b => b.code === code);

    if (!book) return res.status(404).send("הספר לא נמצא");
    if (book.isBorrowed) return res.status(400).send("הספר כבר מושאל");

    book.isBorrowed = true;
    book.borrowHistory.push({
        borrowDate: new Date().toLocaleDateString(),
        userId
    });
    res.json(book);
});

// ביצוע החזרה
app.patch('/books/:code/return', (req, res) => {
    const code = parseInt(req.params.code);
    const book = books.find(b => b.code === code);
    if (!book) return res.status(404).send("הספר לא נמצא");
    if (!book.isBorrowed) return res.status(400).send("הספר אינו מושאל");

    book.isBorrowed = false;
    res.json(book);
});

// מחיקת ספר
app.delete('/books/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const index = books.findIndex(b => b.code === code);
    if (index === -1) return res.status(404).send("הספר לא נמצא");

    books.splice(index, 1);
    res.send(`ספר ${code} נמחק בהצלחה`);
});

app.listen(PORT, () => {
    console.log(`השרת רץ בכתובת http://localhost:${PORT}`);
});