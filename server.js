import express from "express";

import booksRouter from "./routes/books.js";
import authorsRouter from "./routes/authors.js";
import usersRouter from "./routes/users.js";
import ResourceNotFoundError from "./exceptions/resource-not-found-error.js";
import { getConnection } from "./db/db-util.js";
import { SqlError } from "mariadb";

const app = express(); // express Application object

const PORT = 8080;

// middlewares
app.use(express.json()); // useful to parse JSON data coming in the request
app.use(booksRouter);
app.use(authorsRouter);
app.use(usersRouter);

// common application level error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ResourceNotFoundError) {
    res.status(404).send(`Resource with id ${err.resourceId} does not exist`);
  }
  next();
});

// all the handlers defined on app object use the built in App router
// url handlers
app.get('/hello', (req, res) => {
  // req -> express Request object : Is used to get information from the client
  // res -> express Response object : Is used to send information back to the client
  res.send('<html><body><b>Hello world</b></body></html>');
});

app.get('/greeting', (req, res) => {
  res.send('Greeting!!!');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
