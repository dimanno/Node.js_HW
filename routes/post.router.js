const router = require('express').Router();

const {postController} = require('../controllers');
const {dataValidMiddleware, usersMiddleware, loginMiddleware} = require('../middlewares');
const {postValidator} = require('../validators/');
const {userRoles: {ADMIN, MANAGER}} = require('../config/constants');
const {tokenType:{ACCESS}} = require('../config/constants');


router.post('/',
    dataValidMiddleware.isDataValid(postValidator),
    loginMiddleware.checkToken(ACCESS),
    usersMiddleware.checkUserRole([
        ADMIN,
        MANAGER
    ]),
    postController.addPost);
router.get('/', postController.getPosts);

module.exports = router;
