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

module.exports = {
    userLoginValidator
};

