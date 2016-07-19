var fs = require('fs');
var q = require('q');
var colors = require('colors/safe');

var InfoService = function() {};

InfoService.prototype.getVersion = function() {
  var deferred = q.defer();

  fs.readFile(__dirname + '/../../package.json', function(err, data) {
    if(err) {
      deferred.reject(err);
      return;
    }

    var package = JSON.parse(data.toString());
    deferred.resolve(package.version);
  });

  return deferred.promise;
};

InfoService.prototype.getHelp = function() {
	var helpText = "Usage: pencilblue <command>\n\n" +
        				 "where <command> is one of:\n" +
        				 "  help, install, version\n\n" +
        				 "pencilblue install <directory> or\n" +
                 "pencilblue install <version> <directory>\n" +
                 "  create and install a PencilBlue instance\n\n";
	console.log(colors.white(helpText));
};

module.exports = new InfoService();
