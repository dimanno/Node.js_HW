const router = require('express').Router();

const {userController} = require('../controllers');
const {usersMiddleware, dataValidMiddleware} = require('../middlewares');
const {userValidator: {createUserValidator}} = require('../validators');

router.get('/', userController.getUsers);
router.post('/',
    dataValidMiddleware.isDataValid(createUserValidator),
    usersMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id', usersMiddleware.isUserExist, userController.getUser);
router.put('/:user_id',
    usersMiddleware.isUpdateDataValid,
    usersMiddleware.isUserExist,
    userController.updateUser);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;
