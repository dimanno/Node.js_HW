const router = require('express').Router();

const {userLoginController} = require('../controllers');
const {usersMiddleware, loginMiddleware} = require('../middlewares');
const {tokenTypeEnum:{REFRESH, ACCESS}} = require('../config/constants');

router.post('/',
    loginMiddleware.isLoginValid,
    usersMiddleware.isUserPresentByEmail,
    loginMiddleware.IsPasswordMatched,
    userLoginController.login);

router.get('/activate/:token', loginMiddleware.checkActionToken, userLoginController.activateUser);
router.post('/refresh', loginMiddleware.checkToken(REFRESH), userLoginController.updateRefresh);
router.post('/logout', loginMiddleware.checkToken(ACCESS), userLoginController.logout);
router.post('/logout_all', loginMiddleware.checkToken(ACCESS), userLoginController.logoutAll);

module.exports = router;
