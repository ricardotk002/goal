'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    text        : String,
    done        : { type: Boolean, default: false },
    deleted     : { type: Boolean, default: false },
    created     : { type: Date, required: true, 'default': Date.now},
    updated     : { type: Date, required: true, 'default': Date.now}
});