var logger = require('../utils/logger');

module.exports = function(err, req, res, next) {
  logger.error('Error on Request: ' + req.baseUrl + req.path);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
}