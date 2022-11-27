const Card = require('../models/card');
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_BAD_REQUEST_MESSAGE,
  STATUS_NOT_FOUND_MESSAGE,
  STATUS_INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => res.status(STATUS_INTERNAL_SERVER_ERROR)
      .send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) res.send({ data: card });
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

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.send({ data: card });
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

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.send({ data: card });
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
