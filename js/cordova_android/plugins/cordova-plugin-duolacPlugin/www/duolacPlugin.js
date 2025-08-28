cordova.define("cordova-plugin-duolacPlugin.duolacPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'duolacPlugin', 'coolMethod', [arg0]);
};

exports.getAppUserInfo = function (arg0, success, error) {
	exec(success, error, 'duolacPlugin', 'getAppUserInfo', [arg0]); 
};


});
