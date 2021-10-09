const User = require('../database/User');

module.exports = {
    loginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const loginData = await User.findOne({email, password});

            if (!loginData) {
                res.json('wrong login or password');
            }

            next();
        } catch (e) {
            throw new Error(e.message);
        }
    }
};
