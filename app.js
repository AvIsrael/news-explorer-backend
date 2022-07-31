require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogin, errorLogin } = require('./middleware/logging');
const errorhandler = require('./middleware/errorhandler');
const NotFoundError = require('./utils/errors/notfounderror');
const { limiter } = require('./utils/ratelimiter');
const mainRoute = require('./routes/index');
const { MONGODB_URL } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, DB_LINK = MONGODB_URL } = process.env;
const app = express();
mongoose.connect(DB_LINK);

app.use(limiter);
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(helmet());
app.use(requestLogin);
app.use('/', mainRoute);
app.use('/', (req, res, next) => {
  next(new NotFoundError('Requested resource not found.'));
});
app.use(errorLogin);
app.use(errors());
app.use(errorhandler);

if (NODE_ENV !== 'test') app.listen(PORT);
