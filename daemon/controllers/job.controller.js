var JobModel = require('../models/jobs.model');
var Configuration = require('../config/config');
var piblaster = require('pi-blaster.js');
var inter;
var indexGlobal = 0;
var Failed = { priority: 1, jobs: []};
var Buildings = { priority: 2, jobs: []};
var Success = { priority: 3, jobs: []};
var CurrentJobs = [];
var _ = require('lodash');
var Lcd = require('lcd');
var flagLCD = false;

var lcd = new Lcd({
  rs: Configuration.pinsLCD.rs,
  e: Configuration.pinsLCD.e,
  data: Configuration.pinsLCD.data,
  cols: Configuration.pinsLCD.cols,
  rows: Configuration.pinsLCD.rows
});

process.on('SIGINT', function() {
  lcd.clear();
  lcd.close();
  process.exit();
});

function print(str, pos) {
  pos = pos || 0;

  if (pos === str.length) {
    pos = 0;
  }

  lcd.print(str[pos], function (err) {
    if (err) {
      throw err;
    }

    setTimeout(function () {
      print(str, pos + 1);
    }, 300);
  });
}

lcd.on('ready', function () {
  flagLCD = true;
  
});

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
  arrayJobs = _.orderBy(arrayJobs, '_id', 'asc');
  
  if (CurrentJobs.length !== arrayJobs.length){
    CurrentJobs = _.assign([], arrayJobs);
  }else {
	var i = 0;
	var flag = false;
    while (i <= arrayJobs.length){
	  if(CurrentJobs[i]._id !== arrayJobs[i]._id){
	    flag = true;
	    break;
	  }
	}
	if (flag)
	  CurrentJobs = _.clone(arrayJobs);
  }
  
  if(inter !== undefined)
    clearInterval(inter);
  
  inter = setInterval(function(){
    if(indexGlobal === CurrentJobs.length)
	  indexGlobal = 0;
	
	var currentElement = _.clone(CurrentJobs[indexGlobal]);
	
	if(currentElement._doc !== undefined){
	  if(flagLCD){
	    lcd.clear();
	    lcd.setCursor(0, 0); // col 0, row 0
  	    lcd.print(currentElement._doc.name); // print name
	    lcd.once('printed', function(){
	      lcd.setCursor(0,1);
	      lcd.print(getStatusStr(currentElement._doc.status));
	    });
      }
      
      //showLigth(Configuration.pinJob, currentElement._doc.status);
      //showLigth(Configuration.pinLastJob, currentElement._doc.lastStatus);
    }

    indexGlobal++;
  }, 3000);
}

function showLigth(pin, status){
  switch(status){
	case 0:
	  piblaster.setPwm(Configuration.pinJobRed, Configuration.LEDON );
	  piblaster.setPwm(Configuration.pinJobGreen, Configuration.LEDOFF );
	  piblaster.setPwm(Configuration.pinJobBlue, Configuration.LEDOFF );
	  break;
	case 1:
	  piblaster.setPwm(Configuration.pinJobRed, Configuration.LEDOFF );
	  piblaster.setPwm(Configuration.pinJobGreen, Configuration.LEDOFF );
	  piblaster.setPwm(Configuration.pinJobBlue, Configuration.LEDON );
	  break;
	case 2:
	  piblaster.setPwm(Configuration.pinJobRed, Configuration.LEDOFF );
	  piblaster.setPwm(Configuration.pinJobGreen, Configuration.LEDOFF );
	  piblaster.setPwm(Configuration.pinJobBlue, Configuration.LEDON );
	  break;
  }
}

function getStatusStr(statusInt) {
  switch(statusInt){
	case 0:
	  return 'Failed';
	case 1:
	  return 'Building';
	case 2:
	  return 'Success';
	default:
	  return 'Undefined';
  }
}

function getJobsFromStatus(obj, status){
  return obj.status === status;
}

exports.runTask = runTask;
