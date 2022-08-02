const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogin = expressWinston.logger({
  transports: [new winston.transports.File({ filename: './logs/request.log' })],
  format: winston.format.json(),
});

const errorLogin = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: './logs/error.log' })],
  format: winston.format.json(),
});

module.exports = { requestLogin, errorLogin };
