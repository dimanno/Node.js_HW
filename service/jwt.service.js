const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/errorHendler');
const {responseStatusCode: {INVALID_CLIENT}, messagesResponse, actionTokens, responseStatusCode} = require('../config/constants');
const {JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACTIVATE_SECRET,
    JWT_FORGOT_PASSWORD_SECRET} = require('../config/config');
const {tokenTypeEnum} = require('../config/constants');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };

    },
    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret = '';
            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case tokenTypeEnum.REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case actionTokens.ACTIVATE_USER:
                    secret = JWT_ACTIVATE_SECRET;
                    break;
            }
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(messagesResponse.INVALID_TOKEN, INVALID_CLIENT);
        }
    },
    createActiveToken: (tokenType) => {
        let secret = '';
        switch (tokenType) {
            case actionTokens.ACTIVATE_USER:
                secret = JWT_ACTIVATE_SECRET;
                break;
            case actionTokens.FORGOT_PASSWORD:
                secret = JWT_FORGOT_PASSWORD_SECRET;
                break;
            default:
                throw new ErrorHandler(messagesResponse.INVALID_TOKEN, responseStatusCode.SERVER)
        }
        jwt.sign({}, secret, {expiresIn: '1d'});
    }
};
