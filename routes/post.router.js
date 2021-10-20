const router = require('express').Router();

const {postController} = require('../controllers');
const {dataValidMiddleware, usersMiddleware, loginMiddleware} = require('../middlewares');
const {postValidator} = require('../validators/');
const {userRoles: {ADMIN, MANAGER}, tokenType} = require('../config/constants');


router.post('/',
    loginMiddleware.checkToken(tokenType.ACCESS),
    usersMiddleware.checkUserRole([
        ADMIN,
        MANAGER
    ]),
    dataValidMiddleware.isDataValid(postValidator),
    postController.addPost);
router.get('/', postController.getPosts);

module.exports = router;
