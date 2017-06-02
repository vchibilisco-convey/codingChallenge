var winston = require('winston');
require('winston-daily-rotate-file')
var path = require('path');
var fs = require('fs');

var logDirectory = path.join(__dirname, '../logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
logDirectory = path.join(logDirectory, 'activity');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var logFileName = path.join(logDirectory, 'debug.log');

var logger;

if (!logger) {
  var transportDailyRotateFile = new winston.transports.DailyRotateFile({
    filename: logFileName,
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
  });

  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      transportDailyRotateFile
    ]
  });
}

module.exports = logger;