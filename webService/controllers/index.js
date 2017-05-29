//var logger = require('../utils/logger');
var express = require('express');
var router = express.Router();
require('../classes');

//Middlewares before requests
//logger.verbose('Starting Middlewares pre-request processing.');
//router.use(require('../middlewares/accessLog'));
//router.use(require('../middlewares/auth'));

//Application routes.
//logger.verbose('Starting routes for app requests.');
router.get('/', require('./root.controller'));
router.use('/jobs', require('./job.controller'));

//Middlewares after requests
//logger.verbose('Starting Middlewares post-request processing.');
//router.use(require('../middlewares/error'));

module.exports = router;