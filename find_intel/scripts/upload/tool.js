var os = $.extend({
	ios: false,
    android: false,
    version: false
});

(function(){

	var agent = navigator.userAgent.toLowerCase();
	var patten = {
		'ios': /ip(ad|hone|od)/,
		'android': /android/
	}

	patten.ios.test(agent) ? os.ios = true : false;
	patten.android.test(agent) ? os.android = true : false;

})();

var getBlobURL = (window.URL && URL.createObjectURL.bind(URL)) ||
    (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) ||
    window.createObjectURL;
var revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL)) ||
    (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) ||
    window.revokeObjectURL;
