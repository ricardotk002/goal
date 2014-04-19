// app/models/user.js
'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

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
        profileImageURL: String
    },

    todos           : {
        type: [{
            text : String,
            done : { type: Boolean, default: false },
            deleted : { type: Boolean, default: false }
        }],
        default: []
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.method.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', userSchema);