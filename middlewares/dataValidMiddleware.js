const ErrorHandler = require('../errors/errorHendler');
const {responseStatusCode} = require('../config/constants');

module.exports = {
    isDataValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, responseStatusCode.BAD_REQUEST);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
