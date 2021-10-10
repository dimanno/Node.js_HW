const router = require('express').Router();

const {authUserController} = require('../controllers/userLogin.controller');
const {loginMiddleware, isLoginValid} = require('../middlewares/login.middleware');

router.post('/auth', isLoginValid, loginMiddleware, authUserController);
