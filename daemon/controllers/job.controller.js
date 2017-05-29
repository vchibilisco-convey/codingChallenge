var JobModel = require('../models/jobs.model');
var Configuration = require('../config/config');

function runTask () {
  console.log(Configuration);
  var Errors = { priority: 1, jobs: []};
  var Buildings = { priority: 2, jobs: []};
  var Success = { priority: 3, jobs: []};
  JobModel.findAll(function(err, jobs){
    if(err){
      return next(err);
    }

    Errors.jobs = jobs.filter(function(element){
      return getJobsFromStatus(element, 'Error');
    });
    Buildings.jobs = jobs.filter(function(element){
      return getJobsFromStatus(element, 'Building');
    });
    Success.jobs = jobs.filter(function(element){
      return getJobsFromStatus(element, 'Success');
    });
    
    console.log(Errors);
    console.log(Buildings);
    console.log(Success);

  });
}

function getJobsFromStatus(obj, status){
  return obj.status === status;
}

exports.runTask = runTask;