const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMe, updateUser } = require('../controllers/users');

routerUser.get('/me', getMe);
routerUser.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = routerUser;
