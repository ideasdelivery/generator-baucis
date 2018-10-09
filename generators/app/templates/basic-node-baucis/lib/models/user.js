'use strict';
const mongoose = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
