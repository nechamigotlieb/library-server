import express from 'express';
import { getAllBooks, getBookByCode, addBook, updateBook, borrowBook, returnBook, deleteBook } from '../controllers/book.controller.js';

const router = express.Router();
router.get('/', getAllBooks);
router.get('/:code', getBookByCode);
router.post('/', addBook);
router.put('/:code', updateBook);
router.patch('/:code/borrow', borrowBook);
router.patch('/:code/return', returnBook);
router.delete('/:code', deleteBook);

export default router;