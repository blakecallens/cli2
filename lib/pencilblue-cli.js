#! /usr/bin/env node

var colors = require('colors/safe');
var process = require('process');

var info = require('./services/info');

process.on('uncaughtException', function(err) {
  console.log(colors.red(err));
  process.exit(1);
});
process.on('SIGINT', function() {
  process.exit(0);
});

var argv = process.argv;

if(typeof argv[2] === 'undefined') {
  // help
}
else {
  switch(argv[2]) {
    case 'version':
    case '--version':
    case '-v':
      info.getVersion().then(function(version) {
        console.log(colors.white(version));
      }, function(err) {
        console.log(colors.red(err));
      });
      break;
    case 'install':
      //install
      break;
    case 'create':
      //create
      break;
    case 'start':
      //start
      break;
    case 'help':
    case '--help':
    case '-h':
      //help
      break;
    default:
      //help
      break;
  }
}
