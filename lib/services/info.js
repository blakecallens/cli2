var fs = require('fs');
var q = require('q');

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

module.exports = new InfoService();
