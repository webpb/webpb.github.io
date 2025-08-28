cordova.define("cordova-plugin-duolacPlugin.duolacPlugin", function(require, exports, module) {

    var exec = require('cordova/exec');

    module.exports.stopProcessErrorPage = function (arg0, success, error) {
    	alert("module.exports.stopProcessErrorPage");
        exec(success, error, 'duolacPlugin', 'stopProcessErrorPage', [arg0]);
    };
    
    // GSHAN 2021.06.10 ; 앱에 저장된 기기 및 앱 정보를 success 콜백에 리턴
    module.exports.getAppUserInfo = function (arg0, success, error) {
    	alert("module.exports.getAppUserInfo");
        exec(success, error, 'duolacPlugin', 'getAppUserInfo', [arg0]);
    };
    
    // GSHAN 2021.06.10 ; 웹페이지로 구성된 푸시 설정 화면에서 사용자가 변경한 값을 Native로 알려줌.
    module.exports.setPushInfo = function (arg0, success, error) {
        exec(success, error, 'duolacPlugin', 'setPushInfo', [arg0]);
    };
    
});
