const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/not_found');
const validationSignin = require('../validations/signin');
const validationSignup = require('../validations/signup');

router.post('/signin', validationSignin, login);
router.post('/signup', validationSignup, createUser);
router.post('/signout', auth, logout);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('*', auth, (req, res, next) => {
  next(new NotFound('Неправильный путь.'));
});

module.exports = router;
