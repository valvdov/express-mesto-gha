class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

const badRequestLogin = 'Неправильные почта или пароль';
module.exports = { BadRequestError, badRequestLogin };