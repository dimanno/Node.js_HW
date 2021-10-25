const {compare} = require('../service/password.service');
const {loginValidator: {userLoginValidator}} = require('../validators');
const ErrorHandler = require('../errors/errorHendler');
const {messagesResponse, responseStatusCode, const: {AUTHORIZATION}, actionTokens} = require('../config/constants');
const {jwtService} = require('../service');
const {O_Auth, Action_tokens} = require('../database');

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

            if (!token) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            await jwtService.verifyToken(token, tokenType);

            const responseToken = await O_Auth
                .findOne({[tokenType]: token})
                .populate('user_id');

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

    checkActionToken: (tokenActionType) => async (req, res, next) => {
        try {
            let token = req.get(AUTHORIZATION);

            if (tokenActionType === actionTokens.ACTIVATE_USER) {
                token = req.params.token;
            }
            console.log(token);
            await jwtService.verifyToken({token}, tokenActionType);
            const {user_id: user, _id} = await Action_tokens
                .findOne({token, type: tokenActionType})
                .populate('user_id');

            if (!user) {
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.INVALID_CLIENT);
            }

            await Action_tokens.deleteOne({_id});
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
