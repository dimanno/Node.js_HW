const Post = require('../database/Post');
const {emailService} = require('../service');
const {email_actions} = require('../config/constants');


module.exports = {
    addPost: async (req, res, next) => {
        try {
            const {title, body} = req.body;
            const {_id, email, name} = req.user;

            await Post.create({
                title,
                body,
                user_id: _id,
                new: true
            });

            await emailService.sendMail(email, email_actions.CREATE_POST, {username: name});

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
