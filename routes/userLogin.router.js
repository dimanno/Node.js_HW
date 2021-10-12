const router = require('express').Router();

const {userLoginController} = require('../controllers');
const {usersMiddleware, loginMiddleware} = require('../middlewares');

router.post('/',
    loginMiddleware.isLoginValid,
    usersMiddleware.isUserPresentByEmail,
    loginMiddleware.IsPasswordMatched,
    userLoginController.login);
router.post('/logout', userLoginController.logout);

module.exports = router;
