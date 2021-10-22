const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/errorHendler');
const {responseStatusCode: {INVALID_CLIENT}, messagesResponse} = require('../config/constants');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACTIVATE_SECRET} = require('../config/config');
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
    verifyToken: async (token, tokenType) => {
        try {
            let secret = '';
            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case tokenTypeEnum.REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case tokenTypeEnum.ACTION:
                    secret = JWT_ACTIVATE_SECRET;
                    break;
            }
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(messagesResponse.INVALID_TOKEN, INVALID_CLIENT);
        }
    },
    createActiveToken: () => jwt.sign({}, JWT_ACTIVATE_SECRET, {expiresIn: '1d'})
};
