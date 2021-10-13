const User = require('../database/User');
const {createUserValidator, updateUserValidator} = require('../validators/user.validator');

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

    isUserExist: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();

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
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body =value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUpdateDataValid: (req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const {error, value} = updateUserValidator.validate({name});

            if (error) {
                throw new Error(error.details[0].message);
            }

            if (password || email) {
                throw new Error('For change email qr password you need administrator permission');
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
