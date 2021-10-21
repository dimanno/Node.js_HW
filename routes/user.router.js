const router = require('express').Router();

const {userController} = require('../controllers');
const {usersMiddleware, dataValidMiddleware, loginMiddleware} = require('../middlewares');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../validators');
const {tokenTypeEnum:{ACCESS}} = require('../config/constants');

router.post('/',
    dataValidMiddleware.isDataValid(createUserValidator),
    usersMiddleware.createUserMiddleware,
    userController.createUser);

router.use(loginMiddleware.checkToken(ACCESS), usersMiddleware.isUserActive);

router.get('/', userController.getUsers);

router.get('/:user_id', usersMiddleware.isUserExist, userController.getUser);
router.put('/:user_id',
    dataValidMiddleware.isDataValid(updateUserValidator),
    usersMiddleware.isUserExist,
    userController.updateUser);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;
