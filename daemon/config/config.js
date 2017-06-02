exports.team = 'Blowfish';
exports.interval = 5000;
exports.port = 5000;
exports.FAILED = 0;
exports.BUILDING = 1;
exports.SUCCESS = 2;

//pins lcd
exports.pinsLCD = {
  rs: 20,
  e: 21,
  data: [5, 6, 13, 19],
  cols: 16,
  rows: 2
 };

//pins rgb
exports.pinJobRed = 22;
exports.pinJobGreen = 27;
exports.pinJobBlue = 17;

exports.LEDON = 0;
exports.LEDOFF = 1;

exports.mongCS = 'mongodb://10.4.3.35:27017/daemon';
