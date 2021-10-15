const Post = require('../database/Post');
const {responseStatusCode: {CREATED}} = require("../config/constants");

module.exports = {
    addPost: async (req, res, next) => {
        try {
            const {title, body} = req.body;
            await Post.create({title, body});

            res.sendStatus(CREATED);
        } catch (e) {
            next(e);
        }
    },

    getPosts: async (req, res, next) => {
        try {
            const posts = await Post.find({});
            res.json(posts);
        } catch (e) {
            next(e);
        }
    }
};
