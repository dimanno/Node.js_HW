const User = require('../database/User');
const passwordService = require('../service/password.service');
const {userNormalizator} = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({}).lean();

            const newUsers = users.map(user => userNormalizator(user));

            res.json(newUsers);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    getUser: async (req, res) => {
        try {
            const user = userNormalizator(req.body);
            await res.json(user);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const {password, email, name} = req.body;
            const hashedPassword = await passwordService.hash(password);

            await User.create({...req.body, password: hashedPassword});
            res.json(`User - ${name} with ${email} created successfully`);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const {name} = req.body;

            await User.findByIdAndUpdate(user_id, {$set: {name}});
            res.json('Name was changed');
        } catch (e) {
            throw new Error(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndDelete(user_id);
            res.json(`user ${user.name} deleted`);
        } catch (e) {
            throw new Error(e.message);
        }
    }
};


