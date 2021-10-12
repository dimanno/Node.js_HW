
module.exports = {
    login: (req, res, next) => {
        try {
            const userNormalize = req.user;
            res.json(`Hello ${userNormalize.name}`);
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
