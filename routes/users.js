import express from "express";

import { handleRegistration, handleAuthentication } from "../controllers/users.js";

const usersRouter = express.Router();
usersRouter.post('/users', handleRegistration);
usersRouter.post('/authenticate', handleAuthentication);

export default usersRouter;