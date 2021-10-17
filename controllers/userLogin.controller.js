const {responseStatusCode, messagesResponse} = require('../config/constants');

module.exports = {
    login: (req, res, next) => {
        try {
            const userNormalize = req.user;
            res.json(messagesResponse.SUCCESSFUL_AUTH(userNormalize.name)).status(responseStatusCode.CREATED);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            await res.json(`Hello ${req.body.email}`);
        } catch (e) {
            next(e);
        }
    }
};
