/* 
* @Author: ocean
* @Date:   2015-06-02 11:28:02
* @Last Modified by:   ocean
* @Last Modified time: 2015-08-19 17:14:58
*/

'use strict';

$(document).ready(function(){
/**********************
车旺APP下载
**********************/ 
	// if (oTools.isWechat){
	// 	$("#download").attr("data-href","http://a.app.qq.com/o/simple.jsp?pkgname=com.ctfo.pltpsuper");
	// }else if(oTools.isIOS){
	// 	$("#download").attr("data-href","https://itunes.apple.com/cn/app/che-wang-si-ji-ban/id917562471?mt=8");
	// } else {
	// 	$("#download").attr("data-href","http://file.sinoiov.com/file/app_carriers.apk");
	// }

/**********************
歌唱吧APP下载
**********************/ 
	// if (oTools.isWechat){
	// 	$("#downloadS").attr("data-href","");
	// }else if(oTools.isIOS){
	// 	$("#downloadS").attr("data-href","");
	// } else {
	// 	$("#downloadS").attr("data-href","");
	// }

	$("#download").attr("data-href", gConfig.chewangdownload);
	$("#downloadS").attr("data-href", gConfig.songdownload);
});