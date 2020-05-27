'use strict';
let mongose = require('mongoose'); 
let bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

let UserSchema = new mongose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        index: { unique: true }
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('senha')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.senha, salt, function(err, hashed) {
            if (err) return next(err);
            user.password = hashed;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongose.model('User', UserSchema);