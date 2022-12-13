const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
