const User = require('../database/User');
const {userValidator: {updateUserValidator}} = require('../validators');
const ErrorHandler = require('../errors/errorHendler');
const {responseStatusCode, messagesResponse} = require('../config/constants');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(messagesResponse.USER_EXISTS, responseStatusCode.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentByEmail: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({email: req.body.email})
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler(messagesResponse.WRONG_LOGIN_DATA, responseStatusCode.NOT_FOUND);
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();

            if (!user) {
                throw new ErrorHandler(messagesResponse.USER_NOT_FOUND, responseStatusCode.NOT_FOUND);
            }

            req.body = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateDataValid: (req, res, next) => {
        try {
            const {name} = req.body;
            const {error, value} = updateUserValidator.validate({name});

            if (error) {
                throw new ErrorHandler(error.details[0].message, responseStatusCode.BAD_REQUEST);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (arrayRoles = []) => (req, res, next) => {
        try {
            const {role} = req.body;

            if (!arrayRoles.includes(role)) {
                throw new ErrorHandler(messagesResponse.ACCESS_DENIED, responseStatusCode.FORBIDDEN);
            }

        } catch (e) {
            next(e);
        }
    }
};
