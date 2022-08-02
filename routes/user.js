const router = require('express').Router();
const auth = require('../middleware/auth');
const { createUser, validateUser, getCurrentUser } = require('../controllers/user');
const { createUserSchema, loginSchema } = require('./validation');

router.get('/users/me', auth, getCurrentUser);

router.post('/signup', createUserSchema, createUser);

router.post('/signin', loginSchema, validateUser);

module.exports = router;
