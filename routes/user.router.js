const router = require('express').Router();

const {userController} = require('../controllers');
const {usersMiddleware, dataValidMiddleware, loginMiddleware} = require('../middlewares');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../validators');
const {tokenType:{ACCESS}} = require('../config/constants');

router.get('/', userController.getUsers);
router.post('/',
    dataValidMiddleware.isDataValid(createUserValidator),
    usersMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id', usersMiddleware.isUserExist, userController.getUser);
router.put('/:user_id',
    dataValidMiddleware.isDataValid(updateUserValidator),
    usersMiddleware.isUserExist,
    loginMiddleware.checkToken(ACCESS),
    userController.updateUser);
router.delete('/:user_id', loginMiddleware.checkToken(ACCESS), userController.deleteUser);

module.exports = router;
