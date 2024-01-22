const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/unauthorized');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  try {
    if (!cookie) {
      throw new Unauthorized('Необходима авторизация');
    }
  } catch (err) {
    next(err);
  }

  const token = cookie.replace('jwt=', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
