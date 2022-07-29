const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const AuthorizationError = require('../utils/errors/autherror');
const ConflictError = require('../utils/errors/conflicterror');
const ValidationError = require('../utils/errors/validationerror');
const UnauthorisedError = require('../utils/errors/unautherror');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ email, name, password: hash })
        .then((user) => {
          res.send({ name, email, _id: user._id });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('User already exists.'));
          } else next(err);
        });
    })
    .catch(next);
};

module.exports.validateUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('password')
    .select('name')
    .then((user) => {
      if (!user) {
        next(new ValidationError('User not found.', UnauthorisedError));
        return;
      }
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          next(new AuthorizationError('Incorrect email or password.'));
          return;
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.send({ token, name: user.name });
      });
    })
    .catch(next);
};
