import { findUserByUsername, insert, findUserByUsernameAndPassword } from "../db/users.js";
import UserExistsError from "../exceptions/user-exists-error.js";

export async function registerUser(user) {
  const existingUser = await findUserByUsername(user.username);
  if (existingUser) {
    throw new UserExistsError(`User with username ${user.username} exists`);
  }

  const newUser = await insert(user);
  return newUser;
}

export async function authenticate(user) {
  const foundUser = await findUserByUsernameAndPassword(user.username, user.password);
  return foundUser;
}