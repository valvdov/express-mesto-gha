const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {}, () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
app.use((req, res, next) => {
  req.user = {
    _id: '63822a7f345afbb909d587eb'
  };
  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Такого роута не существует' });
});
