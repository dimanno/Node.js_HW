const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/errorHendler');
const {responseStatusCode: {INVALID_CLIENT}} = require('../config/constants');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../config/config');
const {tokenType: {ACCESS}} = require('../config/constants');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };

    },
    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('invalid token', INVALID_CLIENT);
        }
    }
};
