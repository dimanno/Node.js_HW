const {Schema, model} = require('mongoose');
const token_enum = require('../config/constants/tokenType.enum');

const actionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum:Object.values(token_enum)
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true});

module.exports = model('active', actionSchema);
