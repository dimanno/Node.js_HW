const {User} = require('../database');


module.exports = {
    sendmailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler('user not found', 404);
            }
            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
