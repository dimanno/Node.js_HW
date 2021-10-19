const nodemailer = require('nodemailer');
const {NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL} = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    },
});

const sendMail = (userMail) => {
    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: 'Hello world',
        html: 'Hello World!!!!!!'
    });
};

module.exports = sendMail;
