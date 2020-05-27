'use strict';
let mongose = require('mongoose'); 

module.exports = mongose.model('UserToken', new mongose.Schema({
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
        required: 'Token é obrigatório'
    }
}));