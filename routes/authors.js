// Routes
// define all the urls and their handlers for the `authors` REST resource

import express from "express";

import { getAllAuthors } from '../controllers/authors.js';

const authorsRouter = express.Router();

authorsRouter.get('/authors', getAllAuthors);

export default authorsRouter;