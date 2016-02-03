/* 
* @Author: ocean
* @Date:   2015-06-02 11:28:02
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-01 15:57:04
*/

// 页面data-href跳转事件
$(function(){
	var dataHrefEle = $("*[data-href]");
	dataHrefEle.each(function(k, v){
		var $_this = $(this);
		$_this.on('tap', function(){
			location.href = $_this.attr('data-href');
		});
	})
});

$(window).on('load', function(){
	var sW = $(window).width(),
		sH = $(window).height(),
		$img = $('.container').find('img'),
		imgW = $img.width(),
		imgH = $img.height();

	var ratio = parseInt(imgW / imgH);

	if(imgH < sH){
		$img.css({
			width: sH / ratio,
			height: sH,
			marginLeft: - (sH/ratio - sW) / 2
		});
	}
	
});

function isWeixin(){
	var ua = navigator.userAgent.toLowerCase();
	return (ua.match(/MicroMessenger/i)=="micromessenger");
}
function isIOS(){
	var ua = navigator.userAgent.toLowerCase();
	return /(iPhone|iPad|iPod|iOS)/i.test(ua);
}

$(document).ready(function(){
	if (isWeixin()){
		$(".download").attr("data-href","http://a.app.qq.com/o/simple.jsp?pkgname=com.ctfo.pltpsuper");
	}else if(isIOS()){
		$(".download").attr("data-href","https://itunes.apple.com/cn/app/che-wang-si-ji-ban/id917562471?mt=8");
	} else {
		$(".download").attr("data-href","http://file.sinoiov.com/file/app_carriers.apk");
		//$("#app_sj").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.ctfo.pltpsuper");
	}
});