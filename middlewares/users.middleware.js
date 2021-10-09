// const User = require('../database/User');

module.exports = {
    userIdMiddleware: (req, res, next) => {
        try {
            const {user_id} = req.params;
            if (!user_id) {
                res.json('test');
            }
            next();
        } catch (e) {
            throw new Error(e.message);
        }
    }
};
