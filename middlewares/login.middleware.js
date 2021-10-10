const User = require('../database/User');

const {compare} = require('../service/password.service');
const {userLoginValidator} = require('../validators/login.validator');

module.exports = {
    loginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});

            if (!user) {
                res.json('wrong login or password');
            }

            await compare(password, user.password);

            next();
        } catch (e) {
            throw new Error(e.message);
        }
    },

    isLoginValid: (req, res, next) => {
        try {
            const {error, value} = userLoginValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
