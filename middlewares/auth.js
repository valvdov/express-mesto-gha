const jwt = require('jsonwebtoken');
const { UnauthorizedError, unauthorizedUser } = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(unauthorizedUser);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    const err = new UnauthorizedError(unauthorizedUser);

    next(err);
  }
  req.user = payload;

  next();
};
