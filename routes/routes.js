import express from 'express';
import { getBooks, saveBook, updateBook, getBookById, deleteBook } from '../controller/bookController.js';
import verifyToken from '../configs/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getBooks);
router.get('/:id', verifyToken, getBookById);
router.post('/', verifyToken, saveBook);
router.put('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

export default router;
