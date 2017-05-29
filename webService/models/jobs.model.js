var Job = require('../classes/job');

exports.create = function(pJob, cb) {
  var job = new Job();
  job.name = pJob.name;
  job.status = pJob.status;
  job.teams = ['Dolphin', 'Blowfish'];

  job.save(function(err, res){
    cb(err, res);
  });
};

exports.findAll = function(cb){
  Job.find(function(err, jobs){
    cb(err, jobs);
  });
};

exports.findByName = function(pjob, cb){
  Job.find({'name': pJob.name}, function(err, job){
    cb(err, job);
  });
};