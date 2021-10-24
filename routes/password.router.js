const router = require('express').Router();

const {passwordController} = require('../controllers');
const {dataValidMiddleware, universalMiddlewares, loginMiddleware} = require('../middlewares');
const {loginValidator:{emailValidator, passwordValidator, changePasswordValidator}} = require('../validators');
const {User} = require('../database');
const {tokenTypeEnum:{ACCESS}} = require('../config/constants');

router.post('/',
    dataValidMiddleware.isDataValid(changePasswordValidator),
    loginMiddleware.checkToken(ACCESS),
    passwordController.changePassword);
router.post('/forgot',
    universalMiddlewares.findAndCheck(User, 'email', false),
    dataValidMiddleware.isDataValid(emailValidator),
    passwordController.sendEmailForgotPassword);
router.put('/forgot',
    dataValidMiddleware.isDataValid(passwordValidator),
    loginMiddleware.checkActionToken,
    passwordController.setPassword);

module.exports = router;
