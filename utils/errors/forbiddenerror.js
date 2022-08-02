const httpStatusCodes = require('../httpstatuscodes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = httpStatusCodes.NOT_FOUND;
  }
}

module.exports = ForbiddenError;
