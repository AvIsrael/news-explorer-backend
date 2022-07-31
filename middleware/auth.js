const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/errors/autherror');
const { UNAUTHORIZED } = require('../utils/httpstatuscodes');
const { JWT_DEV_SECRET } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('No token provided.', UNAUTHORIZED));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET);
  } catch (err) {
    next(new AuthorizationError('Invalid token provided.', UNAUTHORIZED));
  }
  req.user = payload;
  next();
};
