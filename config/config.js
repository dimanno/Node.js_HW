module.exports = {
    MONGO_CONNECT_URI: process.env.MONGO_CONNECT_URI || 'mongodb://localhost:27017/test_users',
    PORT: process.env.PORT || 5002,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'yyy',
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET || 'zzz',
    JWT_FORGOT_PASSWORD_SECRET: process.env.JWT_ACTIVATE_SECRET || 'qqq',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD:process.env.NO_REPLY_EMAIL_PASSWORD
};

