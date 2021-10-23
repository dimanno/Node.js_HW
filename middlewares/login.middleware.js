const {compare} = require('../service/password.service');
const {loginValidator: {userLoginValidator}} = require('../validators');
const ErrorHandler = require('../errors/errorHendler');
const {messagesResponse, responseStatusCode, const: {AUTHORIZATION}, tokenTypeEnum} = require('../config/constants');
const {jwtService} = require('../service');
const {O_Auth, Active_token} = require('../database');

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

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            console.log(token);

            if (!token) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            await jwtService.verifyToken(token, tokenType);
            console.log(token);

            const responseToken = await O_Auth
                .findOne({tokenType: token});
            // .populate('user_id');
            console.log(responseToken);

            if (!responseToken) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            req.user = responseToken.user_id;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkTokenAc: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            console.log(token);

            if (!token) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            await jwtService.verifyToken(token, tokenTypeEnum.ACCESS);
            console.log(token);

            const responseToken = await O_Auth
                .findOne({access_token: token});
                // .populate('user_id');
            console.log(responseToken);

            if (!responseToken) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            req.user = responseToken.user_id;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActivateToken: async (req, res, next) => {
        try {
            const token = req.params;

            await jwtService.verifyToken(token, tokenTypeEnum.ACTION);
            const {user_id: user, _id} = await Active_token
                .findOne({token, type: tokenTypeEnum.ACTION})
                .populate('user_id');

            if (!user) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            await Active_token.deleteOne({_id});
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
