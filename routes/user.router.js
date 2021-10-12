const router = require('express').Router();

const {userController} = require('../controllers');
const {usersMiddleware} = require('../middlewares');

router.get('/', userController.getUsers);
router.post('/',
    usersMiddleware.isUserBodyValid,
    usersMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id', usersMiddleware.isUserExist, userController.getUser);
router.put('/:user_id', usersMiddleware.isUpdateDataValid, usersMiddleware.isUserExist, userController.updateUser);
router.delete('/:user_id', usersMiddleware.isUserExist, userController.deleteUser);

module.exports = router;
