const {email_actions} = require('../config/constants');

module.exports = {
    [email_actions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },

    [email_actions.ORDER_SERVICE]: {
        templateName: 'order_service',
        subject: 'Your order!'
    }
};
