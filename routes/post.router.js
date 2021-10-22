const router = require('express').Router();

const {postController} = require('../controllers');
const {dataValidMiddleware, usersMiddleware, loginMiddleware} = require('../middlewares');
const {postValidator} = require('../validators/');
const {userRoles: {ADMIN, MANAGER}, tokenTypeEnum} = require('../config/constants');


router.post('/',
    loginMiddleware.checkToken(tokenTypeEnum.ACCESS),
    // usersMiddleware.checkUserRole([
    //     ADMIN,
    //     MANAGER
    // ]),
    dataValidMiddleware.isDataValid(postValidator),
    postController.addPost);
router.get('/', postController.getPosts);

module.exports = router;
