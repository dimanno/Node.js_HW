const Post = require('../database/Post');

module.exports = {
    addPost: async (req, res, next) => {
        try {
            const {title, body} = req.body;
            const post = await Post.create({title, body});

            res.json(`Post ${post.title} created successfully`);
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
