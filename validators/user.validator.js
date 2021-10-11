const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../config/constants/regular.expressions');
const userRoles = require('../config/constants/userRoles.enum');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim(),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
});

module.exports = {
    createUserValidator,
    updateUserValidator
};

