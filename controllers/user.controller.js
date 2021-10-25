const {User, O_Auth, Action_tokens} = require('../database');
const {emailService, jwtService} = require('../service');
const {userNormalizator} = require('../util/user.util');
const {responseStatusCode, messagesResponse, email_actions, actionTokens} = require('../config/constants');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}).lean();

            const newUsers = users.map(user => userNormalizator(user));
            await res.json(newUsers);
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
            const {name, email} = req.body;

            const newUser = await User.createUserWithHashPassword(req.body);
            const userNormalise = userNormalizator(newUser.toJSON());
            const activate_token = jwtService.createActionToken({email}, actionTokens.ACTIVATE_USER);

            await Action_tokens.create({
                token: activate_token,
                type: actionTokens.ACTIVATE_USER,
                user_id: userNormalise._id});

            await emailService.sendMail(email, email_actions.WELCOME, {userName: name, activate_token});

            res.status(responseStatusCode.CREATED).json(userNormalise);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name, email} = req.body;

            await User.findByIdAndUpdate(user_id, {name}, {new: true});
            await emailService.sendMail(email, email_actions.UPDATE_ACCOUNT, {userName: name});

            res.status(responseStatusCode.CREATED).json(messagesResponse.UPDATE_USER);
        } catch (e) {
            next(e);
        }
    },

    deleteAccount: async (req, res, next) => {
        try {
            const {_id} = req.user;
            console.log(_id);
            await User.deleteOne({_id});
            await O_Auth.deleteOne({user_id: _id});

            res.sendStatus(responseStatusCode.NO_DATA);
        } catch (e) {
            next(e);
        }
    }
};
