const router = require('express').Router();

const {authUserController} = require('../controllers/userLogin.controller');
const {loginMiddleware, isLoginValid} = require('../middlewares/login.middleware');

router.post('/', isLoginValid, loginMiddleware, authUserController);

module.exports = router;
