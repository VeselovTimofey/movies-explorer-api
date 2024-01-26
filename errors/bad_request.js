const http2 = require('http2');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = BadRequest;
    this.statusCode = http2.constants.HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequest;
