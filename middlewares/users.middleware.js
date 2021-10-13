const User = require('../database/User');

const {userValidator: {createUserValidator, updateUserValidator}} = require('../validators');
const ErrorHandler = require("../errors/errorHendler");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                return next({
                    message: 'email already exist',
                    status: 418
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
                    status: 404
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
            const user = await User.findById(user_id);
            console.log(user);

            if (!user) {
                return next ({
                    message: 'user does not exist',
                    status: 404
                });
            }

            req.body = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, 400);
            }

            req.body = value;
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
                throw new ErrorHandler(error.details[0].message, 400);
            }

            if (password || email) {
                return next({
                    message: 'For change email qr password you need administrator permission',
                    status: 403
                });
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
