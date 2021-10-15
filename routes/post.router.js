const router = require('express').Router();

const {postController} = require('../controllers');
const {dataValidMiddleware, usersMiddleware} = require('../middlewares');
const {postValidator} = require('../validators/');
const {userRoles: {USER, MANAGER}} = require('../config/constants');


router.post('/',
    usersMiddleware.checkUserRole(USER, MANAGER),
    dataValidMiddleware.isDataValid(postValidator),
    postController.addPost);
router.get('/', postController.getPosts);

module.exports = router;
