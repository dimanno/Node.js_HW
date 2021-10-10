const Joi = require('joi');

const {PASSWORD_REGEXP} = require('../config/constants/regular.expressions');

const userLoginValidator = Joi.object({
    username: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

module.exports = {
    userLoginValidator
};

