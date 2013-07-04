var path = require('path')
  , npm = require('npm')
  , gitteh = require('gitteh')
  , Q = require('q');

var onError = function(){};
var tagMessageFormat = 'Version ${version}';
module.exports = function(config){
  if (config.onError) {
    onError = config.onError;
  }
  if (config.tagMessageFormat) {
    tagMessageFormat = config.tagMessageFormat;
  }

  var deferred = Q.defer();
  var dir = path.resolve('.');
  var pkg = require(path.join(dir, 'package.json'));

  deferred.promise.version = pkg.version;
  deferred.promise.name = pkg.name;

  try {
    gitteh.openRepository(dir, doOrDie(function(repo){
      deferred.notify(TAGGING);
      repo.createTag({ name: pkg.version, message: tagMessage(pkg.version) }, doOrDie(function(){
        deferred.notify(PUBLISHING);
        npm.commands.publish(doOrDie(function(){
          deferred.resolve();
        }));
      }));
    }));
  } catch (err) {
    deferred.reject(err);
  }

  return deferred.promise;
};

module.exports.PUBLISHING = PUBLISHING = 'publishing';
module.exports.TAGGING = TAGGING = 'tagging';

function tagMessage(version) {
  return tagMessageFormat.replace('${version}', version);
}

function doOrDie(fn){
  return function(err){
    if (err) throw err;
    if (!fn) return;
    fn.apply(this, Array.prototype.slice.call(arguments).slice(1));
  };
}
