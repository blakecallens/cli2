var q = require('q');
var shell = require('shell');
var prompt = require('prompt');
var colors = require('colors/safe');

var InstallService = function() {};

InstallService.prototype.installWithSettings = function(version, directory) {
  var deferred = q.defer();
  var self = this;

  self.confirmRequirements().then(function() {
    prompt.message = "PencilBlue".cyan;
  	prompt.start();
  	prompt.get(InstallService.promptSchema, function(err, siteSettings) {
  		if(err) {
  			deferred.reject(err);
        return;
  		}

      self.performInstallation(version, directory, siteSettings).then(function() {
        deferred.resolve();
      }, function(err) {
        deferred.reject(err);
      });
    });
  }, function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
};

InstallService.prototype.confirmRequirements = function() {
  var deferred = q.defer();

  if(!shell.which('git')) {
		deferred.reject('git is required to install PencilBlue.');
		shell.exit(1);
	}
  else {
    deferred.resolve();
  }

  return deferred.promise;
};

InstallService.prototype.getInstallSchema = function() {
  return {
    properties: {
      siteName: {
        description: 'Site Name',
        default: 'My PencilBlue Site',
        type: 'string'
      },
      siteRoot: {
        description: 'Site Root',
        default: 'http://localhost:8080',
        type: 'string'
      },
      siteIp: {
        description: 'Address to bind to',
        default: '0.0.0.0',
        type: 'string'
      },
      sitePort: {
        description: 'Site Port',
        default: 8080,
        type: 'number'
      },
      mongoServer: {
        description: 'MongoDB URL',
        default: 'mongodb://127.0.0.1:27017/',
        type: 'string'
      },
      dbName: {
        description: 'Database Name',
        default: 'pencilblue',
        type: 'string'
      },
      bower: {
        description: 'Do you want to install Bower components?',
        default: 'y/N',
        type: 'string'
      }
    }
  };
};

InstallService.prototype.performInstallation = function(version, directory, siteSettings) {
  directory = directory || 'pencilblue';

  console.log(colors.blue('Cloning PencilBlue from github...'));
  shell.exec('git clone https://github.com/pencilblue/pencilblue.git' + (version ? '#' + version : '') + ' ' + directory);

  console.log(colors.blue('Installing npm modules...'));
  shell.cd(directory);
  shell.exec('npm install');

  if(siteSettings.bower.toLowerCase() === 'y' || siteSettings.bower.toLowerCase() === 'yes') {
    
  }
};

module.exports = new InstallService();
