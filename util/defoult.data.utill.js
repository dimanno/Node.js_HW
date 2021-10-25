const User = require('../database/User');
const {userRoles: {ADMIN}} = require('../config/constants');
const {DEFAULT_ADMIN_PASSWORD} = require('../config/config');

module.exports = async () => {
    const user = await User.findOne({role: ADMIN});

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Dimasik',
            email: 'dimasiK@gmail.com',
            password: DEFAULT_ADMIN_PASSWORD,
            role: ADMIN
        });
    }
};
