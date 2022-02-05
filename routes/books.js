// Routes
// define all the urls and their handlers for the `books` REST resource

import express from "express";

import { getAllBooks, createBook, getBook, updateBook } from '../controllers/books.js';
import { logit } from "../middlewares/logit.js";
import { bookExists } from "../middlewares/book_exists.js";

// Router object is only for the books REST resource
const booksRouter = express.Router();

booksRouter.use(logit);

booksRouter.get('/books'/*, [logit] */, getAllBooks);
booksRouter.get('/books/:bookId', [logit, bookExists], getBook);
booksRouter.post('/books', createBook);
booksRouter.put('/books/:bookId', [bookExists], updateBook);

export default booksRouter;