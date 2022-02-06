import jwt from "jsonwebtoken";
import { registerUser, authenticate } from "../services/users.js";
import UserExistsError from "../exceptions/user-exists-error.js";
import parsed from "../config.js";

const { JWT_PRIVATE_KEY } = parsed;

export async function handleRegistration(req, res) {
  const { username, password } = req.body;
  // validation of username and password
  if (!username || !password) {
    res.status(400).send('Required data not present');
    return;
  }

  try {
    const user = await registerUser({ username, password });
    res.status(201).send(user);
  } catch (err) {
    if (err instanceof UserExistsError) {
      res.status(400).send('Username already taken');
      return;
    }
  }
}

export async function handleAuthentication(req, res) {
  const { username, password } = req.body;
  // validation of username and password
  if (!username || !password) {
    res.status(400).send('Required data not present');
    return;
  }

  try {
    const user = await authenticate({ username, password });
    if (!user) {
      res.status(404).send('User not found for the passed username and password');
    } else {
      const token = jwt.sign(user.username, JWT_PRIVATE_KEY);

      res.status(200).send({
        user: user.username,
        token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
}