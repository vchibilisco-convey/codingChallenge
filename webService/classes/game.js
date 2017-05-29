var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Game', gameSchema);