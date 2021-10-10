const router = require('express').Router();

const userController = require('../controllers/user.controller');
const usersMiddleware = require('../middlewares/users.middleware');

router.get('/', userController.getUsers);
router.post('/', usersMiddleware.isUserBodyValid,
    usersMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id', usersMiddleware.isUserExist, userController.getUser);
router.put('/:user_id', userController.updateUser);
router.delete('/:user_id', usersMiddleware.isUserExist, userController.deleteUser);

module.exports = router;
