var INTERVAL = 1000;

var cycle_stop = false;
var daemon = false;
var timer;

require('./classes');
var JobModel = require('./models/jobs.model');

process.argv.forEach(function (arg) {
  if (arg === '-d') daemon = true;
});

process.on('SIGTERM', function () {
  console.log('Got SIGTERM signal.');
  stop();
});

(function cycle () {
  //timer = setTimeout(function () {
    runTask();
    if (!cycle_stop) cycle();
  //}, INTERVAL);
})();

function runTask () {
  var Errors = { weight: 1, jobs: []};
  var Buildings = { weight: 2, jobs: []};
  var Success = { weight: 3, jobs: []};
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
  cycle_stop = true;
}

function getJobsFromStatus(obj, status){
  return obj.status === status;
}

function stop () {
  cycle_stop = true;
  clearTimeout(timer);
}

if (daemon) require('daemon')();