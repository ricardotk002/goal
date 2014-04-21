// app/models/user.js
'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var todoSchema = require('./todo');

var userSchema = mongoose.Schema({
    local           : {
        email       : String,
        password    : String
    },

    twitter         : {
        id          : String,
        token       : String,
        displayName : String,
        username    : String,
        profileImageURL: { type: String, default: '/img/user_blank.png' }
    },

    todos           : {
        type        : [todoSchema],
        default     : []
    },

    created         : { type: Date, required: true, 'default': Date.now},
    updated         : { type: Date, required: true, 'default': Date.now}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.method.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', userSchema);