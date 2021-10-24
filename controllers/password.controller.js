const {Action_tokens, User, O_Auth} = require('../database');
const {jwtService, emailService, passwordService} = require('../service');
const {actionTokens, email_actions, const: {FRONT_URL}, responseStatusCode,} = require('../config/constants');

module.exports = {
    sendEmailForgotPassword: async (req, res, next) => {
        try {
            const {_id, email} = req.record;
            const actionToken = jwtService.createActionToken({email}, actionTokens.FORGOT_PASSWORD);

            await Action_tokens.create({
                token: actionToken,
                type: actionTokens.FORGOT_PASSWORD,
                user_id: _id,
            });

            await emailService.sendMail(
                email,
                email_actions.FORGOT_PASSWORD,
                {forgotPasswordUrl: `${FRONT_URL}/password/forgot?token=${actionToken}`});

            res.sendStatus(responseStatusCode.NO_DATA);
        } catch (e) {
            next(e);
        }
    },

    setPassword: async (req, res, next) => {
        try {
            const {email, _id, name} = req.user;
            const {password} = req.body;
            const hashPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate(_id, {password: hashPassword});
            await O_Auth.deleteMany({user_id: _id});
            await Action_tokens.deleteMany({user_id: _id});

            await emailService.sendMail(email, email_actions.SET_NEW_PASSWORD, {userName: name});

            res.sendStatus(responseStatusCode.NO_DATA);

        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const {user, user:{email, _id, name}} = req;
            const {password, oldPassword} = req.body;

            await user.comparePassword(oldPassword);

            const hashedPassword = await passwordService.hash(password);
            await User.findByIdAndUpdate( _id , { password: hashedPassword });
            await O_Auth.deleteMany({ user_id: _id });

            await emailService.sendMail(email, email_actions.SET_NEW_PASSWORD, { userName: name });

            res.sendStatus(responseStatusCode.NO_DATA);

        } catch (e) {
            next(e);
        }
    }
};
