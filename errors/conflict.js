const http2 = require('http2');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.name = Conflict;
    this.statusCode = http2.constants.HTTP_STATUS_CONFLICT;
  }
}

module.exports = Conflict;
