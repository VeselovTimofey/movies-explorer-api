const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const BadRequest = require('../errors/bad_request');
const Conflict = require('../errors/conflict');
const Unauthorized = require('../errors/unauthorized');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest());
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new Conflict());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((token) => {
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ email: req.body.email });
    })
    .catch((err) => next(new Unauthorized(err.message)));
};

const logout = (req, res, next) => {
  const { cookie } = req.headers;

  try {
    if (!cookie) {
      throw new Unauthorized('Необходима авторизация.');
    }
  } catch (err) {
    next(err);
  }

  res.clearCookie('jwt').send();
};

module.exports = {
  createUser, login, logout,
};
