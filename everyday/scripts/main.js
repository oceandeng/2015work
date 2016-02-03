/* 
* @Author: ocean
* @Date:   2015-07-13 11:08:10
* @Last Modified by:   ocean
* @Last Modified time: 2015-07-15 14:30:23
*/

'use strict';

var sw, sh;

$(function(){
	sw = $(window).width();
	sh = $(window).height();

	var $body = $('body');
	var bh = $body.height();

	if(sh > bh){
		$body.css({
			height: sh
		})
	}

	var myScroll;

	function loaded () {
		myScroll = new IScroll('#wrapper', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true,
			bounce: false
		});
	}
	loaded ();
	$('#top-rule').on('tap', function(){
		$('#wrapper').css({
			'z-index': 99,
			'visibility': 'visible'
		});
	});

	$('#close').on('tap', function(){
		$('#wrapper').css({
			'z-index': -1
		})
	})

	$('#share').on('tap', function(){
		if(otools.isWechat){
			$.myPlugin.popup({
		      screenW : sw,
		      screenH : sh,
		      path : 'images/share-info.png'
		    });
		}else if(agent == 'app'){
			location.href = $(this).attr('data-href');
		}else{
			alertmess('打开浏览器菜单，点击分享按钮分享给朋友');
		}
	})
});