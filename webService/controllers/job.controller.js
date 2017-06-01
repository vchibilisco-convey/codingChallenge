var express = require('express');
var router = express.Router();
var Game = require('../classes/job');
var JobModel = require('../models/jobs.model');

// more routes for our API will happen here
router.route('/')
  .post(function(req, res, next){
    JobModel.create(req.query, function(err, job){
      if(err){
        return next(err)
      }
      res.json({message: 'Job "' + job.name + '" Created'})
    });
  })
  .get(function(req, res, next){
    JobModel.findAll(function (err, jobs) {
      /*err = new Error();
      err.status = '404';*/
      if(err){
        return next(err);
      }
      res.json(jobs)
    })
  });

/*router.route('/:game_id')
  .get(function(req, res, next){
    JobModel.findById(req.params.game_id, function(err, game){
      if(err){
        return next(err);
      }
      res.json(game);
    });
  })
  .delete(function(req, res, next){
    JobModel.deleteById(req.params.game_id, function(err, response){
      if(err){
        return next(err);
      }
      //TODO: check on response to see if it was removed
      res.json({message: 'game succesfully deleted.'});
    });
  })
  .put(function(req, res, next){
    JobModel.updateById(req.params.game_id, req.body, function(err, game){
      if(err){
        return next(err);
      }
      res.json({message: 'Game "' + game.id + '" Updated with: "' + game.name + '"'});
    });
  });*/

module.exports = router;