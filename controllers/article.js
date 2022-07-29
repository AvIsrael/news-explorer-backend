const Article = require('../models/article');
const AuthorizationError = require('../utils/errors/autherror');
const NotFoundError = require('../utils/errors/notfounderror');
const ForbiddenError = require('../utils/errors/forbiddenerror');

module.exports.getFavoriteArticles = (req, res, next) => {
  Article.find({})
    .select('+owner')
    .then((articles) => {
      const favoriteArticles = articles.filter((article) => String(article.owner) === req.user._id);
      if (favoriteArticles.length === 0) {
        next(new NotFoundError('You have not saved any article'));
        return;
      }
      res.send(favoriteArticles);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  Article.create({ ...req.body, owner: req.user._id })
    .then((article) => res.send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('owner')
    .then((foundArticle) => {
      if (!foundArticle) {
        next(new NotFoundError('Article id not found!'));
        return;
      }
      if (req.user._id !== String(foundArticle.owner)) {
        next(new AuthorizationError('Article is not belong to current user.', ForbiddenError));
        return;
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then(() => {
          Article.find({}).then((allArticles) => res.send(allArticles));
        })
        .catch(next);
    })
    .catch(next);
};
