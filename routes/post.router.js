const router = require('express').Router();

const {postController} = require('../controllers');
const {dataValidMiddleware, usersMiddleware, loginMiddleware} = require('../middlewares');
const {postValidator} = require('../validators/');
const {userRoles: {USER, MANAGER}} = require('../config/constants');


router.post('/',
    loginMiddleware.checkAccessToken,
    // usersMiddleware.checkUserRole(USER, MANAGER),
    // dataValidMiddleware.isDataValid(postValidator),
    postController.addPost);
router.get('/', postController.getPosts);

module.exports = router;
