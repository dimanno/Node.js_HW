const {jwtService} = require('../service');
const {userNormalizator} = require('../util/user.util');
const {O_Auth} = require('../database');
const {tokenType: {ACCESS}, responseStatusCode} = require('../config/constants');

module.exports = {
    generateToken: async (req, res, next) => {
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
            const token = req.token;
            await O_Auth.deleteOne({[ACCESS]: token});
            res.sendStatus(responseStatusCode.NO_DATA);
        } catch (e) {
            next(e);
        }
    }
};
