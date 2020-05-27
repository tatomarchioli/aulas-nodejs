'use strict';
let express = require('express');
let clientService = require('../services/ClientService');
let authMiddleware = require('../middleware/AuthMiddleware');
let router = express.Router();

router.use(authMiddleware);

router.route('/client')
    .get(clientService.getAll)
    .post(clientService.post);

router.route('/client/:id')
    .get(clientService.get)
    .put(clientService.put)
    .delete(clientService.delete);
    
module.exports = router;
