'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
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

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    Reflect.deleteProperty(obj, 'password');
    return obj;
};

userSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    }
    return next();
});

module.exports = mongoose.model('User', userSchema);
