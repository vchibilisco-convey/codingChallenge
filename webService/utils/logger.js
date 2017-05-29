var winston = require('winston');
var path = require('path');
var fs = require('fs');

var logDirectory = path.join(__dirname, '../logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
logDirectory = path.join(logDirectory, 'activity');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var infoLogFileName = path.join(logDirectory, 'info.log');
var errorLogFileName = path.join(logDirectory, 'error.log');
var exceptionsFileName = path.join(logDirectory, 'exceptions.log');

var logger;

if (!logger) {
  winston.handleExceptions(new winston.transports.File({ filename: exceptionsFileName }));
  winston.add(require('winston-daily-rotate-file'));

  logger = new winston.Logger({
    level: 'verbose',
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({
        name: 'info-file',
        filename: infoLogFileName,
        level: 'info',
        json: true
      }),
      new (winston.transports.File)({
        name: 'error-file',
        filename: errorLogFileName,
        level: 'error',
        json: true
      })
    ]
  });
}

module.exports = logger;