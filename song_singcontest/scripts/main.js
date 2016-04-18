/* 
* @Author: ocean
* @Date:   2015-08-05 16:32:01
* @Last Modified by:   ocean
* @Last Modified time: 2015-08-27 10:50:51
*/

'use strict';

function $e (elem){
	return document.querySelectorAll(elem);
};

function addDomLoaded (fn) {
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', function(){
			fn();
			document.removeEventListener('DOMContentLoaded');
		}, false);
	}
};

function addClass (elem, name) {
	elem.className += ' ' + name;
}

window.addEventListener('load', function(){
	var rBtn = $e('#downloadS')[0];
	addClass(rBtn, 'zoomInUp animated');
});

$(function(){
// Dialog + iscroll type popup
	$('#rule').on('tap', function(){
		
		var path = gConfig.path + 'images/close.png';

		Dialog({
			// 'msg':'网络有些繁忙，请耐心等待！',
			'id': 'wrapper',
			'type': 'popup',
			// 'msg': html,
			'lock':true,
			'width':'80%',
			'height': '90%',
			'closeImg': path,
			'closeRight': '-5px',
			'animation':'animated rollIn',
			'contentStyle' : {
                'background': 'rgba(255, 255, 255, 0.95)',
                'border-radius': '10px',
                'padding': '10px'
            },
			'onReady': function(){
				var myScroll;
				(function(){
					myScroll = new IScroll('#wrapper', {
						scrollbars: true,
						hideScrollbar: false,
						mouseWheel: true,
						interactiveScrollbars: true,
						shrinkScrollbars: 'scale',
						// fadeScrollbars: true,
						bounce: false,
					});
				})();
			},
			'onClose': function() {
				// alert('close popup');
			}
		});
	});
});

$(function(){
	var dataHrefEle = $("div[data-href]");
	dataHrefEle.each(function(k, v){
		var $_this = $(this);
		$_this.on('tap', function(){
			location.href = $_this.attr('data-href');
		});
	})
});

(function(){
	var timer = null;
	var $arrow = $('.arrow-box');

	$(window).on('scroll', function(){
		if(!timer){
			timer = setTimeout(function(){
			    var scrollPos = document.body.scrollTop;
			    if(scrollPos == 0){
			    	$arrow.show();
			    }else{
			    	$arrow.hide();
			    };
			    timer = null;
			}, 100);
		}
	});

	$arrow.on('tap', function(){
		var endY = $('header').height();
		$.scrollTo({
		  endY: endY,
		  duration: 200,
		})
	});
})();