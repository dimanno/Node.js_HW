const User = require('../database/User');
const passwordService = require('../service/password.service');
const {userNormalizator} = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}).lean();

            const newUsers = users.map(user => userNormalizator(user));

            res.json(newUsers);
        } catch (e) {
            next(e);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const user = userNormalizator(req.body);
            await res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password, email, name} = req.body;
            const hashedPassword = await passwordService.hash(password);

            await User.create({...req.body, password: hashedPassword});
            res.json(`User - ${name} with ${email} created successfully`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name} = req.body;

            await User.findByIdAndUpdate(user_id, {$set: {name}});
            console.log(user_id);
            console.log(name);

            res.json(`User ID ${user_id} was updated with name ${name}`);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndDelete(user_id);
            res.json(`user ${user.name} deleted`);
        } catch (e) {
            next(e);
        }
    }
};


