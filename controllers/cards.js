const Card = require('../models/card');
const { NotFoundError, notFoundCard } = require('../errors/NotFoundError');
const { BadRequestError, badRequestMessage } = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(e);
      }
    });
};//

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError(notFoundCard);
    })
    .then((card) => {
      const owner = card.owner.toString();
      if (req.user._id === owner) {
        Card.deleteOne(card)
          .then(() => {
            res.send(card);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('У Вас недостаточно прав для удаления карточки');
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(e);
      }
    });
};//

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(notFoundCard);
    })
    .then((card) => {
      res.send(card);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(e);
      }
    });
};//

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError(notFoundCard);
    })
    .then((card) => {
      res.send(card);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createCard, getCards, deleteCardById, putLike, deleteLike,
};
