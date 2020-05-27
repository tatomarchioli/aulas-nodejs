'use strict';
let mongose = require('mongoose'); 

module.exports = mongose.model('Client', new mongose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: "Name is required"
    },
    document: {
        type: String,
        validate: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
}));