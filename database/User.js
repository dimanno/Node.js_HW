const {Schema, model} = require('mongoose');

const {userRoles} = require('../config/constants');
const {passwordService} = require('../service');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

//virtual field only for(instance Document Class from Mongoose)
userSchema.virtual('userRole').get(function() {
    return `${this.role} ${this.name}`;
});

// For example : methods use for only single records (instance Document Class from Mongoose)
userSchema.methods = {
    normalize(userNormalize = {}) {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete userNormalize[field];
        });

        return userNormalize;
    },

    comparePassword(password) {
        return passwordService.compare(password, this.password);
    },
};

// Statics use for quite model (User.testStatic)
userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashPassword});
    }
};

module.exports = model('user', userSchema);
