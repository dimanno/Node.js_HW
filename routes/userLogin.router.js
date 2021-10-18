const router = require('express').Router();

const {userLoginController} = require('../controllers');
const {usersMiddleware, loginMiddleware} = require('../middlewares');

router.post('/',
    loginMiddleware.isLoginValid,
    usersMiddleware.isUserPresentByEmail,
    loginMiddleware.IsPasswordMatched,
    userLoginController.generateToken);
router.post('/refresh', loginMiddleware.checkRefreshToken, userLoginController.generateToken);
router.post('/logout', loginMiddleware.checkAccessToken, userLoginController.logout);

module.exports = router;
