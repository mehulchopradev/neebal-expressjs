import jwt from 'jsonwebtoken';
import parsed from '../config.js';

const { JWT_PRIVATE_KEY } = parsed;

export function auth(req, res, next) {
  const authorization = req.get('Authorization');
  if (!authorization) {
    res.status(401).send('Please provider Authorization header');
    return;
  }

  const token = authorization.split(' ')[1];

  try {
    const user = jwt.verify(token, JWT_PRIVATE_KEY);
    console.log(user);
    req.user = user;

  } catch (err) {
    res.status(401).send('Invalid token');
    return;
  }

  next();
}