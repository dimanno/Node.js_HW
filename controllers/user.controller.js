const User = require('../database/User');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find(req.body);
            res.json(users);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    getUser: async (req, res) => {
        try {
            const {user_id} = req.body;
            const userById = await User.findById(user_id);
            res.json(userById);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            console.log(newUser);
            res.json(newUser);
        } catch (e) {
            throw new Error(e.message);
        }
    }
};


