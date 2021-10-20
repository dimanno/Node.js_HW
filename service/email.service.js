const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');
const {NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL} = require('../config/config');
const allTemplates = require('../email-templates');
const ErrorHandler = require('../errors/errorHendler');
const {messagesResponse, responseStatusCode} = require('../config/constants');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    },
});

const sendMail = async (userMail, emailAction, ) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(messagesResponse.INVALID_TEMPLATE, responseStatusCode.BAD_REQUEST);
    }

    // const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html: 'Hello World!!!!!!'
    });
};

module.exports = {
    sendMail
};
