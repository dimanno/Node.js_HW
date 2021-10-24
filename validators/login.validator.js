const Joi = require('joi');

const {PASSWORD_REGEXP, EMAIL_REGEXP} = require('../config/constants/regular.expressions');

const userLoginValidator = Joi.object({
    email: Joi
        .string()
        .max(30)
        .required()
        .regex(EMAIL_REGEXP),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

const emailValidator = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .lowercase()
        .required(),
});

const passwordValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim()
        .required()
});

const changePasswordValidator = Joi.object({
    oldPassword: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim()
        .required(),
    newPassword: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim()
        .required()
});

module.exports = {
    userLoginValidator,
    emailValidator,
    passwordValidator,
    changePasswordValidator
};

