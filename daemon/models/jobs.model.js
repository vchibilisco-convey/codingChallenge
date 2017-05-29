var Job = require('../classes/job');
var Configuration = require('../config/config');

exports.create = function(pJob, cb) {
  var job = new Job();
  job.name = pJob.name;
  job.status = pJob.status;
  job.teams = ['Blowfish'];

  job.save(function(err, res) {
    cb(err, res);
  });
};

exports.findAll = function(cb) {
  Job.find(function(err, jobs) {
    cb(err, jobs);
  });
};

exports.findByTeam = function(cb) {
  Job.find({'teams': Configuration.team}, function(err, jobs) {
    cb(err, jobs);
  })
}