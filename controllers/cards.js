const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка по умолчанию' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка по умолчанию' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(404).send({ message: `Карточка с таким id(${req.params.cardId}) не найдена` });
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(400).send({ message: 'Произошла ошибка по умолчанию' });
      }
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(404).send({ message: `Передан несуществующий id(${req.params.cardId}) карточки` });
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(400).send({ message: ' Переданы некорректные данные для постановки лайка' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка по умолчанию' });
      }
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(404).send({ message: `Передан несуществующий id(${req.params.cardId}) карточки` });
    })
    .catch((err) => {
      if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
        res.status(400).send({ message: ' Переданы некорректные данные для снятии лайка' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка по умолчанию' });
      }
    });
};
