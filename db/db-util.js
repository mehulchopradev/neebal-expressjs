import mariadb from 'mariadb';

import parsed from '../config.js';

const { DB_HOST: host, DB_USER: user, DB_PASSWORD: password, DB_PORT: port, DB_DATABASE: database } = parsed;

const pool = mariadb.createPool({
  host,
  port,
  user,
  password,
  database,
  connectionLimit: 5,
});

export async function getConnection() {
  const conn = await pool.getConnection();
  return conn;
  /* const conn = await mariadb.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'mehulchopra',
    password: 'admin123',
    database: 'neebal_library_db'
  });
  return conn; */
}