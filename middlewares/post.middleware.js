// const Post = require('../database/Post');
// const ErrorHandler = require("../errors/errorHendler");
//
// module.exports = {
//     isPostValid: (validator) => (req, res, next) => {
//         try {
//             const {error, value} = validator.validate(req.body);
//
//             if (error) {
//                 throw new ErrorHandler(error.details[0].message);
//             }
//
//             req.body = value;
//         } catch (e) {
//             next(e);
//         }
//     }
// };
