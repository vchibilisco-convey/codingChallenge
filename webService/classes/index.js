//var logger = require('../utils/logger');

module.exports = (function(){
  console.log('Starting mongo connection...');
  var mongoose = require('mongoose');
  var cs = 'mongodb://127.0.0.1:27017/daemon';
  mongoose.connect(cs);
  console.log('Connection established with mongo at: ' + cs);
})()