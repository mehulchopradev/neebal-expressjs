import bcrypt from 'bcrypt';
import { getConnection } from "./db-util.js";

export async function insert(user) {
  const clonedUser = {...user};
  let conn;
  const { username, password } = user;

  try {
    conn = await getConnection();
    const q = 'insert into users (username, password) values (?, ?)';
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await conn.query(q, [username, hashedPassword]);
    clonedUser.id = result.insertId;
    return clonedUser;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

export async function findUserByUsername(username) {
  let conn;

  try {
    conn = await getConnection();
    const q = 'select * from users where username = ?';
    const result = await conn.query(q, [username]);
    if (result.length) {
      return result[0];
    }

    return null;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

export async function findUserByUsernameAndPassword(username, password) {
  const user = await findUserByUsername(username);
  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  return isValidPassword ? user : null;
}