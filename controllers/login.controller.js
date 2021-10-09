const User = require('../database/User');

module.exports = {
    authUserController: async (req, res) => {
        try {
            const {name} = req.body;
            const authUser = await User.findOne(name);
            res.json(`Hello ${authUser}`);
        } catch (e) {
            throw new Error(e.message);
        }
    }
};
