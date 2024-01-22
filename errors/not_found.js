const http2 = require('http2');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = NotFound;
    this.statusCode = http2.constants.HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFound;
