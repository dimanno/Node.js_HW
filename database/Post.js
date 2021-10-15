const { Schema, model} = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true});

module.exports = model('post', postSchema);
