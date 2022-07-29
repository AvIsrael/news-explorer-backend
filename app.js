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
const articleRouter = require('./routes/article');
const userRouter = require('./routes/user');

const { DB_LINK = 'mongodb://127.0.0.1/news-explorer' } = process.env;
mongoose.connect(DB_LINK);

const { PORT = 3000, NODE_ENV } = process.env;
const app = express();

app.use(limiter);
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(helmet());
app.use(requestLogin);
app.use('/', articleRouter, userRouter);
app.use('/', (req, res, next) => {
  next(new NotFoundError('Requested resource not found.'));
});
app.use(errorLogin);
app.use(errors());
app.use(errorhandler);

if (NODE_ENV !== 'test') app.listen(PORT);
