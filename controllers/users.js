const User = require('../models/user');
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_BAD_REQUEST_MESSAGE,
  STATUS_NOT_FOUND_MESSAGE,
  STATUS_INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(STATUS_INTERNAL_SERVER_ERROR)
      .send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) res.send({ data: user });
      else res.status(STATUS_NOT_FOUND).send(STATUS_NOT_FOUND_MESSAGE);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
      }
    });
};

module.exports.updateMyInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) res.send({ data: user });
      else res.status(STATUS_NOT_FOUND).send(STATUS_NOT_FOUND_MESSAGE);
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
      }
    });
};

module.exports.updateMyAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) res.send({ data: user });
      else res.status(STATUS_NOT_FOUND).send(STATUS_NOT_FOUND_MESSAGE);
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
      }
    });
};
