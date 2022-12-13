const Card = require('../models/card');
const {
  STATUS_OK,
  STATUS_CREATED,
} = require('../utils/constants');
const { NotFoundError, notFoundCard } = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(STATUS_OK).send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(STATUS_CREATED).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(err);
      } else {
        next(err);
      }
    });
};

exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(() => new NotFoundError(notFoundCard))
    .then((card) => {
      if (JSON.stringify(userId) !== JSON.stringify(card.owner._id)) {
        throw new ForbiddenError('У Вас недостаточно прав для удаления карточки');
      }
      return card.remove()
        .then(() => res.status(STATUS_OK).send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(err);
      } else {
        next(err);
      }
    });
};
module.exports.putLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        throw new NotFoundError(notFoundCard);
      } else {
        res.status(STATUS_OK).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(err);
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        throw new NotFoundError(notFoundCard);
      } else {
        res.status(STATUS_OK).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(err);
      } else {
        next(err);
      }
    });
};
