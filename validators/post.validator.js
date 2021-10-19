const Joi = require('joi');

const addPostValidator = Joi.object({
    title: Joi
        .string()
        .min(3)
        .max(200)
        .trim()
        .required(),
    body: Joi
        .string()
        .min(20)
        .max(9000)
        .trim()
        .required(),
    user_id: Joi
        .string()
});

module.exports = addPostValidator;
