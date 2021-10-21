const router = require('express').Router();

const {usersMiddleware} = require('../middlewares');

router.post('/password/forgot', usersMiddleware.isUserExist);
router.post('/password/setForgot', usersMiddleware.isUserExist);

module.exports = router;
