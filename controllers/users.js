const User = require('../models/user.js');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({data: users});
    })
    .catch(() => res.status(500).send({message: 'error'}));
};

module.exports.getUserById = (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
      if (user) res.send({data: user});
      else res.status(404).send({message: `Пользователь по указанному id(${req.params.id}) не найден`});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные при создании пользователя'});
      } else {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
};

module.exports.updateMyInfo = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
    .then((user) => {
      if (user) res.send({data: user});
      else res.status(404).send({message: `Пользователь с указанным id)${req.params.id}) не найден`});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля'});
      } else {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
};

module.exports.updateMyAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
    .then((user) => {
      if (user) res.send({data: user});
      else res.status(404).send({message: `Пользователь с указанным id(${req.params.id}) не найден`});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные при обновлении аватара'});
      } else {
        res.status(500).send({message: 'Произошла ошибка'});
      }
    });
};