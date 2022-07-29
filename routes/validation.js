const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const validateLink = (value, helpers) => (
  validator.isURL(value) ? value : helpers.error('string.uri'));

const validateEmail = (value, helpers) => (
  validator.isEmail(value) ? value : helpers.error('string.email'));

module.exports.createUserSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).required(),
  }),
});

module.exports.loginSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().min(6).required(),
  }),
});

module.exports.createArticlesSchema = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(validateLink).required(),
    image: Joi.string().custom(validateLink).required(),
  }),
});

module.exports.deleteArticleSchema = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string()
      .min(24).max(24).required()
      .hex(),
  }),
});
