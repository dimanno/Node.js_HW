const {jwtService} = require('../service');
const {userNormalizator} = require('../util/user.util');
const {O_Auth} = require('../database');

module.exports = {
    login: async (req, res, next) => {
        try {
            const userNormalize = userNormalizator(req.user);

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalize._id
            });

            res.json({
                user: userNormalize,
                ...tokenPair
            });

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
