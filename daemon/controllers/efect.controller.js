var piblaster = require('pi-blaster.js');
var lightModule = require('../models/light.model');
var sectionLigth = 1;
var statusPulse = true;

exports.turnOnPulse = function(color){
  if(statusPulse){
    //lightOnOff(lightModule.sectionOne, color);
    lightOnOff(lightModule.sectionTwo, color);
    lightOnOff(lightModule.sectionThree, color);
    statusPulse = false;
  }
  else {
    //lightOnOff(lightModule.sectionOne, lightModule.offLight);
    lightOnOff(lightModule.sectionTwo, lightModule.offLight);
    lightOnOff(lightModule.sectionThree, lightModule.offLight);
    statusPulse = true;
  }
}

exports.turnOnSnake = function(color){
  switch(sectionLigth){
    case 1:
      //lightOnOff(lightModule.sectionOne, color);
      lightOnOff(lightModule.sectionTwo, lightModule.offLight);
      lightOnOff(lightModule.sectionThree, lightModule.offLight);
      sectionLigth = 2;
      break;
    case 2:
      //lightOnOff(lightModule.sectionOne, lightModule.offLight);
      lightOnOff(lightModule.sectionTwo, color);
      lightOnOff(lightModule.sectionThree, lightModule.offLight);
      sectionLigth = 3;
      break;
    case 3:
      //lightOnOff(lightModule.sectionOne, lightModule.offLight);
      lightOnOff(lightModule.sectionTwo, lightModule.offLight);
      lightOnOff(lightModule.sectionThree, color);
      sectionLigth = 1;
      break;
  }
}

exports.turnOnFixed = function(color){
  //lightOnOff(lightModule.sectionOne, lightModule.onLight);
  lightOnOff(lightModule.sectionTwo, color);
  lightOnOff(lightModule.sectionThree, color);
}

exports.off = function(){
  //lightOnOff(lightModule.sectionOne, lightModule.offLight);
  lightOnOff(lightModule.sectionTwo, lightModule.offLight);
  lightOnOff(lightModule.sectionThree, lightModule.offLight);  
};

function lightOnOff(section, color){
  piblaster.setPwm(section.red, color.r );
  piblaster.setPwm(section.green, color.g );
	piblaster.setPwm(section.blue, color.b );
}
