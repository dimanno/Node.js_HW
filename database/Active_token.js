const {Schema, model} = require('mongoose');
const {tokenTypeEnum} = require('../config/constants');

const actionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(tokenTypeEnum)
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true});

module.exports = model('active', actionSchema);
