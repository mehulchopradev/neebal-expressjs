// all business functions defined in the service layer will not use the express objects (req, res,)
// will consist of pure javascript code for these functions

import { insert, selectAllBooks } from "../db/books.js";

// in memory database
const books = [
  {
    id: 1,
    title: 'Programming in Java',
    price: 900,
    pages: 450,
  },
  {
    id: 2,
    title: 'Ruby programming',
    price: 850,
    pages: 400,
  },
  {
    id: 3,
    title: 'Prog in python',
    price: 600,
    pages: 300,
  }
];

export async function findAllBooks() {
  return selectAllBooks();
}

export function findBookById(id) {
  return books.find(book => book.id === id);
}

export async function saveBook(book) {
  const result = await insert(book);
  return result;
  /* const clonedBook = {...book};
  clonedBook.id = books.length + 1;
  books.push(clonedBook);
  return clonedBook; */
}

export function updateBook(id, updatedData) {
  for (let i  = 0; i < books.length; i++) {
    const book = books[i];
    if (book.id === id) {
      books[i] = updatedData;
      return books[i];
    }
  }
}