const http2 = require('http2');

const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = http2.constants;

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS_INTERNAL_SERVER_ERROR;

  const message = statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};
