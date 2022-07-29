const router = require('express').Router();
const auth = require('../middleware/auth');

const { getFavoriteArticles, createArticle, deleteArticle } = require('../controllers/article');
const { createArticlesSchema, deleteArticleSchema } = require('./validation');

router.get('/articles', auth, getFavoriteArticles);

router.post('/articles', auth, createArticlesSchema, createArticle);

router.delete('/articles/:articleId', auth, deleteArticleSchema, deleteArticle);

module.exports = router;
