const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const BadRequest = require('../errors/bad_request');
const Conflict = require('../errors/conflict');
const Unauthorized = require('../errors/unauthorized');
const NotFound = require('../errors/not_found');

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

const logout = (req, res) => {
  res.clearCookie('jwt').send();
};

const getMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).orFail()
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Запрашиваемый пользователь не найден.'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Запрашиваемый пользователь не найден.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, login, logout, getMe, updateUser,
};
