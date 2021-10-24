const ErrorHandler = require('../errors/errorHendler');
const {responseStatusCode, messagesResponse} = require('../config/constants');

module.exports = {
    findAndCheck: (modelName, key, checkToExist) => async (req, res, next) => {
        try {
            const record = await modelName.findOne({[key]: req.body[key]});

            if (!record && !checkToExist) {
                throw new ErrorHandler(messagesResponse.USER_NOT_FOUND);
            }

            if (record && checkToExist) {
                throw new ErrorHandler(messagesResponse.DATA_EXIST, responseStatusCode.CONFLICT);
            }

            if (record && !checkToExist) {
                req.record = record;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
