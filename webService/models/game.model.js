var Game = require('../classes/game');

exports.create = function(gameParam, cb){
  var game = new Game();
  game.name = gameParam.name;

  game.save(function(err, pGame){
    cb(err, pGame);
  });
};

exports.findAll = function(cb){
  Game.find(function(err, games){
    cb(err, games);
  });
};

exports.findById = function(id, cb){
  Game.findById(id, function(err, game){
    cb(err, game);
  });
};

exports.deleteById = function(id, cb){
  Game.remove({
    _id: id
  }, function(err, response){
    cb(err, response);
  })
};

exports.updateById = function(id, gameChanges, cb){
  Game.findById(id, function(err, game){
    if(err){
      return cb(err);
    }
    game.name = gameChanges.name;
    game.save(function(err, pGame){
      cb(err, pGame);
    });
  })
}