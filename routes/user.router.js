const router = require('express').Router();

const userController = require('../controllers/user.controller');
const usersMiddleware = require('../middlewares/users.middleware');

router.get('/', userController.getUser);
router.post('/', usersMiddleware.isUserBodyValid,
    usersMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id',userController.getUser);

module.exports = router;
