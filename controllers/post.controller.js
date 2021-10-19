const Post = require('../database/Post');


module.exports = {
    addPost: async (req, res, next) => {
        try {
            const {title, body} = req.body;
            const user = req.user;

            await Post.create({
                title,
                body,
                user_id: user._id,
                new: true
            });

            res.json(`post ${title} created`);
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
