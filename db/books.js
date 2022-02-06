import { getConnection } from "./db-util.js";

export async function insert(book) {
  const clonedBook = {...book};

  let conn;
  try {
    conn = await getConnection();
    const q = 'insert into books(title, price, pages) values(?,?,?)';

    const result = await conn.query(q, [book.title, book.price, book.pages]);
    clonedBook.id = result.insertId;
  } finally {
    if (conn) {
      conn.end();
    }
  }

  return clonedBook;
}

export async function selectAllBooks() {
  let conn;

  try {
    conn = await getConnection();
    const q = 'select * from books';

    const rows = await conn.query(q);
    return rows;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}