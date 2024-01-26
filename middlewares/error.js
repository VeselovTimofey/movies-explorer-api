const http2 = require('http2');

const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = http2.constants;
const { InternalServerErrorMessage } = require('../errors/const');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS_INTERNAL_SERVER_ERROR;
  let message;
  if (statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR) {
    message = InternalServerErrorMessage;
  } else {
    message = err.message;
  }
  res.status(statusCode).send({ message });
  next();
};
