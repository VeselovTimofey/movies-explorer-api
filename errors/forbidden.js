const http2 = require('http2');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = Forbidden;
    this.statusCode = http2.constants.HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = Forbidden;
