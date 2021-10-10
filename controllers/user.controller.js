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
            const user = await req.user;
            res.json(user);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const {password, email} = req.body;
            const hashedPassword = await passwordService.hash(password);
            console.log(hashedPassword);

            await User.create({...req.body, password: hashedPassword});
            console.log(email);
            res.json(`User - ${email} created successfully`);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const {name} = req.body;

            const editUser = await User.updateOne({user_id}, {$set: {name}});
            res.json(editUser);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.deleteOne({id: user_id});
            res.json(`user ${user} deleted`);
        } catch (e) {
            throw new Error(e.message);
        }
    }
};


