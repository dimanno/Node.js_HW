const {email_actions} = require('../config/constants');

module.exports = {
    [email_actions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },

    [email_actions.ORDER_SERVICE]: {
        templateName: 'order_service',
        subject: 'Your order!'
    },

    [email_actions.UPDATE_ACCOUNT]: {
        templateName: 'update',
        subject: 'Update account data!'
    },

    [email_actions.CREATE_POST]: {
        templateName: 'addPost',
        subject: 'your new post!'
    },
};
