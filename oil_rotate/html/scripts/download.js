/* 
* @Author: ocean
* @Date:   2015-06-02 11:28:02
* @Last Modified by:   ocean
* @Last Modified time: 2016-04-07 16:53:44
*/

'use strict';
function isWeixin(){
	var ua = navigator.userAgent.toLowerCase();
	return (ua.match(/MicroMessenger/i)=="micromessenger");
}
function isIOS(){
	var ua = navigator.userAgent.toLowerCase();
	return /(iPhone|iPad|iPod|iOS)/i.test(ua);
}

function isAndroid(){
	var ua = navigator.userAgent.toLowerCase();
	return /android/i.test(ua);
}

$(document).ready(function(){
	if (isWeixin()){
		$("#download").attr("data-href","http://a.app.qq.com/o/simple.jsp?pkgname=com.ctfo.pltpsuper");
	}else if(isIOS()){
		$("#download").attr("data-href","https://itunes.apple.com/cn/app/che-wang-si-ji-ban/id917562471?mt=8");
	} else {
		$("#download").attr("data-href","http://file.sinoiov.com/file/app_carriers.apk");
		//$("#app_sj").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.ctfo.pltpsuper");
	}
});