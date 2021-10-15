const router = require('express').Router();

const {postController} = require('../controllers');
const {dataValidMiddleware} = require('../middlewares');
const {postValidator} = require('../validators/');

router.post('/', dataValidMiddleware.isDataValid(postValidator), postController.addPost);
router.get('/', postController.getPosts);

module.exports = router;
