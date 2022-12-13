const { celebrate, Joi } = require('celebrate');

const checkReg = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www.)?[\w-._~:/?#[\]!$&'()*+,;=]+#?\b/),
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkUserData = celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www.)?[\w-._~:/?#[\]!$&'()*+,;=]+#?\b/),
  }),
});
const checkUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(www.)?[\w-._~:/?#[\]!$&'()*+,;=]+#?\b/),
  }),
});

const checkUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
  }),
});

const checkNewCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(www.)?[\w-._~:/?#[\]!$&'()*+,;=]+#?\b/),
  }),
});

const checkCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex(),
  }),
});

module.exports = {
  checkLogin, checkReg, checkUserId, checkNewCard, checkCardId, checkUserData, checkUserAvatar,
};
