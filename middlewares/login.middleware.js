const {compare} = require('../service/password.service');
const {loginValidator: {userLoginValidator}} = require('../validators');
const ErrorHandler = require('../errors/errorHendler');
const {messagesResponse, responseStatusCode} = require('../config/constants');

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
};
