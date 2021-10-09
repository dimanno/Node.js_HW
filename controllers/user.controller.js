const User = require('../database/User');
const passwordService = require('../service/password.service');

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
            const hashedPassword = await passwordService.hash(req.body.password);
            console.log(hashedPassword);

            const newUser = await User.create({...req.body, password: hashedPassword});
            console.log(newUser);
            res.json(newUser);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {name} = req.body;
            const editUser = await User.findOneAndUpdate(name);
            res.json(editUser);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    deleteUser: (req, res) => {
        try {
            const user = User.findOneAndDelete(req.body);
            res.json(`user ${user} deleted`);
        } catch (e) {
            throw new Error(e.message);
        }
    }
};


