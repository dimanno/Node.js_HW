const Joi = require('joi');

const {regex, userRoles} = require('../config/constants');

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
        .regex(regex.EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi
        .string()
        .regex(regex.PASSWORD_REGEXP)
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

