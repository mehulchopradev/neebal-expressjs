import { findBookById } from '../services/books.js';
import ResourceNotFoundError from '../exceptions/resource-not-found-error.js';

export function bookExists(req, res, next) {
  const bookId = req.params.bookId;
  const book = findBookById(parseInt(bookId));
  if (book) {
    next();
  } else {
    // res.status(404).send(`Resource with id ${bookId} does not exist`);
    throw new ResourceNotFoundError(bookId);
  }
}