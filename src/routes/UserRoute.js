'use strict';
let express = require('express');
let userService = require('../services/UserService');
let authMiddleware = require('../middleware/AuthMiddleware');
let router = express.Router();

/**
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.use(authMiddleware);
router.route('/user')
    .get(userService.getAll)
    .post(userService.post);

router.route('/user/:id')
    .get(userService.get)
    .put(userService.put)
    .delete(userService.delete);

module.exports = router;