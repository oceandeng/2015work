/* 
* @Author: ocean
* @Date:   2015-08-13 10:11:21
* @Last Modified by:   ocean
* @Last Modified time: 2015-09-10 17:47:53
*/

'use strict';

// $(function(){
// 	$('#rule').on('click', function(){
// 		$('.fancybox').fancybox();
// 	});
// });

// top 图片一屏兼容
function topImg(){
	var winW = document.documentElement.clientWidth,
		winH = document.documentElement.clientHeight;

	var tImg = document.getElementById('tImg');
	var tImgO = new Image();
	tImgO.onload = function(){
		var imgW = tImgO.width,
			imgH = tImgO.height;
		var imgRealW = imgW / imgH * winH;

		tImg.style.height = winH + 'px';
		tImg.style.marginLeft = (winW - imgRealW) / 2 + 'px';
	};
	tImgO.src = gConfig.path + 'images/index-web-tbg.jpg';
}

var timer = null;

function addHandler(element, type, handler){
	if(element.addEventListener){
		element.addEventListener(type, handler, false);
	}else if(element.attachEvent){
		element.attachEvent("on" + type, handler);
	}else{
		element["on" + type] = handler;
	}
}

addHandler(window, 'load', topImg);
addHandler(window, 'resize', function(){
	if(!timer){
		timer = setInterval(function(){
			topImg();
			timer = null;
		}, 500);
	}
});


$('.trip-content').each(function(){
	var $_this = $(this);
	var $_this_l =$_this.find('.trip-list');

	$_this_l.each(function(index, value){
		var $__this = $(this);
		var h = $__this.find('.t-park').height();
		// var h = $__this.find('.t-park').get(0).clientHeight;
		var p = parseInt($__this.find('.t-park').css('padding'));

		if(index%2 != 0){
			$__this.css({
				background: '#eee'
			});
		}

		$__this.find('.t-date').css({
			height: h
		});
		$__this.find('.t-city').css({
			height: h
		});
	});
});