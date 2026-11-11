import express from 'express';
import bookRoutes from './book.route.js';
import userRoutes from './user.route.js';

const router = express.Router();
router.use('/books', bookRoutes);
router.use('/users', userRoutes);

export default router;