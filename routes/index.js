const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
router.post('/signout', auth, logout);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

module.exports = router;
