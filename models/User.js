const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[/.+@.+\..+/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Create the User model with the UserSchema
const User = model('Users', UserSchema);

module.exports = User;