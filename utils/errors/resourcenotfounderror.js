const NotFoundError = require('./notfounderror');

module.exports.resourceNotFoundError = (req, res, next) => {
  next(new NotFoundError('Requested resource not found.'));
};
