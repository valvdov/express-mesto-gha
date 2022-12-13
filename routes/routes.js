const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const notFound = require('./not-found');

router.use(
  usersRouter,
  cardsRouter,
  notFound,
);

module.exports = router;
