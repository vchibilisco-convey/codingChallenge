var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
  status => Error (Red), Success (Green), Building (Blue)
**/
var JobSchema = new Schema({
  id: String,
  name: String,
  status: Number,
  lastStatus: Number,
  teams: Array
});

module.exports = mongoose.model('Job', JobSchema);
