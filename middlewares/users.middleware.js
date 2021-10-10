const User = require('../database/User');

const userValidator = require('../validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserExist: (req, res, next) => {
        try {
            const {user_id} = req.body;
            const user = User.findById(user_id);

            if (!user) {
                throw new Error('user does not exist with this ID');
            }

            req.body = user;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body =value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
