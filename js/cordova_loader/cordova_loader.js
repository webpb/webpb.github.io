
var app = {

			isAndroid : false,
			isIos : false,
			isWeb : true,

			refWindowOffLine : null,

			loadCordova: function() {

				isAndroid = false;
				isIos = false;
				isWeb = true;

				var cordovaJsUrl = "";
				if( /Android/i.test(navigator.userAgent)) {
				    // 안드로이드
					isAndroid = true;
					if( /duolac_in_android_device/i.test(navigator.userAgent)) {
						cordovaJsUrl = '/js/cordova_android/cordova.js';
						isWeb = false;
					}
				}else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				    // iOS 아이폰, 아이패드, 아이팟
					isIos = true;
					if( /duolac_in_ios_device/i.test(navigator.userAgent)) {
						cordovaJsUrl = '/js/cordova_ios/cordova.js';
						isWeb = false;
					}
				}else {
				    // 그 외 디바이스
					cordovaJsUrl = '/js/cordova_web/cordova.js';
				}

				console.log('loadCordova: ' + cordovaJsUrl);
				if(!isWeb) {
					$('head').append('<script src="' + cordovaJsUrl + '"></script>');
				}
			},

		    // Application Constructor
		    initialize: function() {
		    	this.loadCordova();
		        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		        document.addEventListener('receivedError', this.onReceivedError.bind(this), false);

		        document.addEventListener("offline", this.onOffline.bind(this), false);
		        document.addEventListener("online", this.onOnline.bind(this), false);
		    },

		    // deviceready Event Handler
		    //
		    // Bind any cordova events here. Common events are:
		    // 'pause', 'resume', etc.
		    onDeviceReady: function() {
		    	console.log('Received Event: ' + 'deviceready');
//		        navigator.notification.alert('cordova ' + 'deviceready');

		        cordova.exec(function(message){
		            console.log('duolacPlugin.stopProcessErrorPage success : ' + message );
		        },
		        function(){
		            console.log('duolacPlugin.stopProcessErrorPage error : ' );
		        },
		        'duolacPlugin', 'stopProcessErrorPage', ['_']);

		    },

		    onReceivedError: function() {
		    	console.log('Received Event: ' + 'receivedError');
//		        navigator.notification.alert('cordova ' + 'receivedError');
		    },

		    onOffline: function() {

		    	console.log('Received Event: ' + 'onOffline');

		    	if(device.platform === "Android") {
		    		errorUrl = 'file:///android_asset/www/error_after_loading_duolac.html';
		    	} else if(device.platform === "iOS") {
		    		errorUrl = 'cdvfile://localhost/bundle/www/error_after_loading_duolac.html';
		    	} else {
		    		return;
		    	}

		    	this.refWindowOffLine = cordova.InAppBrowser.open(
	    			errorUrl,
		            '_blank',
		            'toolbar=no,location=no');

		    	console.log(typeof refWindowOffLine);

		    	this.refWindowOffLine.addEventListener('loadstart', function(event) { console.log('loadstart:' + event.url); });
		    	this.refWindowOffLine.addEventListener('loadstop', function(event) { console.log('loadstop:' + event.url); });
		    	this.refWindowOffLine.addEventListener('loaderror', function(event) { console.log('loaderror:' + event.url); });
		    	this.refWindowOffLine.addEventListener('exit', function(event) { console.log('exit:' + event.url); });
		    },

		    onOnline: function() {
		    	console.log('Received Event: ' + 'onOnline');
		    	if(this.refWindowOffLine != null) {
		    		this.refWindowOffLine.close();
		    	}
		    	this.refWindowOffLine = null;
		    },

		    onHttpError: function() {
		    	console.log('onHttpError: ');
		    	navigator.notification.alert('다시 시도해주세요.', function() {}, 'Duolac');
		    }
		};



$( function() {
	console.log("cordova environment start");
	app.initialize();
});
