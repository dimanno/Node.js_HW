const {jwtService} = require('../service');
const {userNormalizator} = require('../util/user.util');
const {O_Auth, User} = require('../database');
const {tokenTypeEnum: {ACCESS, REFRESH}, responseStatusCode, messagesResponse} = require('../config/constants');


module.exports = {
    login: async (req, res, next) => {
        try {
            const user = userNormalizator(req.user);
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.token;
            await O_Auth.deleteOne({[ACCESS]: token});
            res.sendStatus(responseStatusCode.NO_DATA);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_id} = req.user;
            await O_Auth.deleteMany({user_id: _id});

            res.sendStatus(responseStatusCode.NO_DATA);
        } catch (e) {
            next(e);
        }
    },

    updateRefresh: async (req, res, next) => {
        try {
            const {token} = req;
            const tokenPair = jwtService.generateTokenPair();

            const newPair = await O_Auth.findOneAndUpdate(
                {[REFRESH]: token},
                {...tokenPair},
            );

            res.json(newPair);
        } catch (e) {
            next(e);
        }
    },

    activateUser: async (req, res, next) => {
        try {
            const {_id} = req.user;
            await User.updateOne({_id}, {isActive: true});

            res.status(200).json(messagesResponse.ACTIVE_USER);
        } catch (e) {
            next(e);
        }
    }
};
