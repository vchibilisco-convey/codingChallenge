var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var express = require('express');
var router = express.Router();

var logDirectory = path.join(__dirname, '../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

logDirectory = path.join(logDirectory, 'access');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
router.use(morgan('combined', {stream: accessLogStream}));

module.exports = router;