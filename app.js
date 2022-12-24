require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();
const router = require('./routes/routes');

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(requestLogger);
app.use(router);
app.use(auth);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(errorLogger);
app.use(errors());
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
