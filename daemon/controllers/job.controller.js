var JobModel = require('../models/jobs.model');
var Configuration = require('../config/config');
var piblaster = require('pi-blaster.js');
var inter;
var indexGlobal = 0;
var Failed = { priority: 1, jobs: []};
var Buildings = { priority: 2, jobs: []};
var Success = { priority: 3, jobs: []};
var _ = require('lodash');


function runTask () {
  JobModel.findByTeam(function(err, jobs){
    if(err){
      return next(err);
    }

    Failed.jobs = jobs.filter(function(element){
      return getJobsFromStatus(element, Configuration.FAILED);
    });
    Buildings.jobs = jobs.filter(function(element){
      return getJobsFromStatus(element, Configuration.BUILDING);
    });
    Success.jobs = jobs.filter(function(element){
      return getJobsFromStatus(element, Configuration.SUCCESS);
    });
    
    checkAndLoop();
  });
}

function checkAndLoop() {
  if (Failed.jobs.length > 0) {
    loopJobs(Failed.jobs);
  }
  else if (Buildings.jobs.length  > 0) {
    loopJobs(Buildings.jobs);
  }
  else if (Success.jobs.length  > 0) {
    loopJobs(Success.jobs);
  }
}

function loopJobs(arrayJobs){
  if(inter !== undefined)
    clearInterval(inter);
  
  inter = setInterval(function(){
    if(indexGlobal === arrayJobs.length)
	  indexGlobal = 0;
	
	var currentElement = _.assign({}, arrayJobs[indexGlobal]);
	
	console.log(currentElement._doc.name);
    showLigth(Configuration.pinJob, currentElement._doc.status);
    showLigth(Configuration.pinLastJob, currentElement._doc.lastStatus);

    indexGlobal++;
  }, 1000);
}

function showLigth(pin, status){
  switch(status){
	case 0:
	  piblaster.setPwm(pin, 1 );
	  break;
	case 1:
	  piblaster.setPwm(pin, 0.6 );
	  break;
	case 2:
	  piblaster.setPwm(pin, 0.1 );
	  break;
  }
}

function on(pin, status){
  
}

function getJobsFromStatus(obj, status){
  return obj.status === status;
}

exports.runTask = runTask;
