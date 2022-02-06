import { SqlError } from 'mariadb';
import { findBookById, saveBook, findAllBooks, updateBook as update } from '../services/books.js';

export async function getAllBooks(req, res) {
  try {
    const books = await findAllBooks();
    res.send(books);
  } catch (err) {
    console.log(err);
    if (err instanceof SqlError) {
      res.status(500).send('Something went wrong. Please try again later');
    }
  }
}

export function getBook(req, res) {
  // get the value of a path param from a request
  const bookId = req.params.bookId;

  const foundBook = findBookById(parseInt(bookId));
  res.send(foundBook);

  /* if (foundBook) {
    res.send(foundBook); // converion to JSON from javascript was done automatically
  } else {
    res.status(404).send(`Book with id ${bookId} was not found`);
  } */
}

export async function createBook(req, res) {
  // collect data from the message body of a request
  const book = req.body;

  try {
    const b = await saveBook(book);
    res.status(201).send(b);
  } catch (err) {
    console.log(err);
    if (err instanceof SqlError) {
      res.status(500).send('Something went wrong. Please try again later');
    }
  }
}

export function updateBook(req, res) {
  const book = req.body;
  const bookId = req.params.bookId;
  res.send(update(parseInt(bookId), book));

  /* const foundBook = findBookById(parseInt(bookId));
  if (foundBook) {
    res.send(update(parseInt(bookId), book));
  } else {
    res.status(404).send(`Book with id ${bookId} was not found`);
  } */
} 