module.exports = (function(){
  console.log('Starting mongo connection...');
  var mongoose = require('mongoose');
  var cs = 'mongodb://10.14.10.167:27017/daemon';
  mongoose.connect(cs);
  console.log('Connection established with mongo at: ' + cs);
})()
