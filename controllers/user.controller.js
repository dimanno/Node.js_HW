const {User, Active_token,O_Auth} = require('../database');
const {passwordService, emailService, jwtService} = require('../service');
const {userNormalizator} = require('../util/user.util');
const {responseStatusCode, messagesResponse, email_actions, tokenTypeEnum} = require('../config/constants');

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
            const {password, name, email} = req.body;
            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});
            const userNormalise = userNormalizator(newUser.toJSON());
            const token = jwtService.createActiveToken();

            await Active_token.create({token, type: tokenTypeEnum.ACTION, user_id: userNormalise._id});
            await emailService.sendMail(email, email_actions.WELCOME, {userName: name, token});

            res.status(responseStatusCode.CREATED).json(userNormalise);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name, email} = req.body;

            await User.updateOne({_id: user_id}, {set: {name}});
            await emailService.sendMail(email, email_actions.UPDATE_ACCOUNT, {userName: name});

            res.status(responseStatusCode.CREATED).json(messagesResponse.UPDATE_USER);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.user;
            await User.findByIdAndDelete(id);
            await O_Auth.deleteOne({user_id:id});

            res.sendStatus(responseStatusCode.NO_DATA);
        } catch (e) {
            next(e);
        }
    }
};
