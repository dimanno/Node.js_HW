const {compare} = require('../service/password.service');
const {loginValidator: {userLoginValidator}} = require('../validators');
const ErrorHandler = require('../errors/errorHendler');
const {messagesResponse, responseStatusCode, tokenType} = require('../config/constants');
const {jwtService} = require('../service');
const {O_Auth} = require('../database');

module.exports = {

    IsPasswordMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;
            await compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginValid: (req, res, next) => {
        try {
            const {error, value} = userLoginValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(messagesResponse.WRONG_LOGIN_DATA, responseStatusCode.NOT_FOUND);
            }

            req.body =value;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get('authorization');

            if (!token) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({access_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get('authorization');

            if (!token) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            await jwtService.verifyToken(token, tokenType.REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            await O_Auth.deleteOne({refresh_token: token});

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    }
};
