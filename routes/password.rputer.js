const router = require('express').Router();

const {usersMiddleware} = require('../middlewares');

router.post('/forgot', usersMiddleware.isUserExist);
router.post('/setForgot', usersMiddleware.isUserExist);

module.exports = router;
