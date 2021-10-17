const User = require('../database/User');
const passwordService = require('../service/password.service');
const {userNormalizator} = require('../util/user.util');
const {responseStatusCode, messagesResponse} = require('../config/constants');
const {} = require('../config/constants');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}).lean();

            const newUsers = users.map(user => userNormalizator(user));

            res.json(newUsers);
        } catch (e) {
            next(e);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const user = userNormalizator(req.body);
            await res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});
            const userNormalise = userNormalizator(newUser.toJSON());

            res.json(userNormalise);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name} = req.body;

            await User.updateOne({_id: user_id}, {$set: {name}});

            res.status(responseStatusCode.CREATED).json(messagesResponse.UPDATE_USER);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            await User.findByIdAndDelete(user_id);

            res.sendStatus(responseStatusCode.NO_DATA);
        } catch (e) {
            next(e);
        }
    }
};
