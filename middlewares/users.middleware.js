const User = require('../database/User');
const {userValidator: {updateUserValidator}} = require('../validators');
const ErrorHandler = require("../errors/errorHendler");
const {responseStatusCode} = require('../config/constants');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                return next({
                    message: 'email already exist',
                    status: responseStatusCode.FORBIDDEN
                });
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
                return next ({
                    message: 'wrong email or password',
                    status: responseStatusCode.NOT_FOUND
                });
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
                return next ({
                    message: 'user does not exist',
                    status: responseStatusCode.NOT_FOUND
                });
            }

            req.body = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateDataValid: (req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const {error, value} = updateUserValidator.validate({name});

            if (error) {
                throw new ErrorHandler(error.details[0].message, responseStatusCode.BAD_REQUEST);
            }

            if (password || email) {
                return next({
                    message: 'For change email qr password you need administrator permission',
                    status: responseStatusCode.FORBIDDEN
                });
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
                throw new ErrorHandler('Access denied', responseStatusCode.FORBIDDEN);
            }

        } catch (e) {
            next(e);
        }
    }
};
