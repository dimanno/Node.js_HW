const router = require('express').Router();
const authUserController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.middleware');

router.post('/auth', loginMiddleware.loginMiddleware, authUserController.authUserController);
