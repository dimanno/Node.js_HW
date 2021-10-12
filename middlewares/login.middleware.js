const {compare} = require('../service/password.service');
const {loginValidator: {userLoginValidator}} = require('../validators');

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
                return next({
                    message: 'wrong login or password',
                    status: 404
                });
            }

            req.body =value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
