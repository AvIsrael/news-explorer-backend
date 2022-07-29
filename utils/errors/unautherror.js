const httpStatusCodes = require('../httpstatuscodes');

class UnauthorisedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalError';
    this.statusCode = httpStatusCodes.INTERNAL_SERVER;
  }
}

module.exports = UnauthorisedError;
