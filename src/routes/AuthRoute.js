'use strict';
let express = require('express');
let passport = require('passport');
let router = express.Router();

router.route('/user/login')
    .post(passport.authenticate('local'),function (req, res) {
        console.log(req.user);
        res.json(req.user);
    });

module.exports = router;