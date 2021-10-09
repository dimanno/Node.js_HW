const router = require('express').Router();

const userController = require('../controllers/user.controller');
const usersMiddleware = require('../middlewares/users.middleware');

router.get('/', userController.getUser);
router.post('/', userController.createUser);

router.get('/:user_id', usersMiddleware.userIdMiddleware, userController.getUser);

module.exports = router;
