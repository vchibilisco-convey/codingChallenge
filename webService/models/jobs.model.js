var statuses = require('../constant/statuses');
var Job = require('../classes/job');

exports.create = function(pJob, cb) {
  var query = {
    name: pJob.name
  };

  var job = {
    status: pJob.status,
    lastStatus: pJob.lastStatus, //This will be returned from mysql attool.
    teams: ['Blowfish', 'Stonefish']
  }

  Job.findOneAndUpdate(query, job, {upsert: true, new: true}, function(err, res){
    cb(err, res);
  });
};

exports.findAll = function(cb){
  Job.find(function(err, jobs){
    cb(err, jobs);
  });
};

exports.findByName = function(pJob, cb){
  Job.find({'name': pJob.name}, function(err, job){
    cb(err, job);
  });
};
