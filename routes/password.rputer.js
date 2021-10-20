const router = require('express').Router();

const {usersMiddleware} = require('../middlewares');

router.post('/forgot', usersMiddleware.isUserExist);
router.post('/set', usersMiddleware.isUserExist);

module.exports = router;
