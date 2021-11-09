const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.use(auth);
router.use('/', usersRouter);
router.use('/', moviesRouter);

module.exports = router;
