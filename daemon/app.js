var cycle_stop = false;
var daemon = false;
var timer;

require('./classes');
var JobController = require('./controllers/job.controller');
var Configuration = require('./config/config');

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
  //}, Configuration.interval );
})();

function runTask () {
  JobController.runTask();
  cycle_stop = true;
}

function stop () {
  cycle_stop = true;
  clearTimeout(timer);
}

if (daemon) require('daemon')();