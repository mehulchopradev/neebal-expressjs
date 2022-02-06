export default class UserExistsError extends Error {
  constructor(message) {
    super(message);
  }
}