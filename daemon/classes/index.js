var Configuration = require('../config/config');

module.exports = (function(){
  console.log('Starting mongo connection...');
  var mongoose = require('mongoose');
  var cs = Configuration.mongCS;
  mongoose.connect(cs);
  console.log('Connection established with mongo at: ' + cs);
})()
