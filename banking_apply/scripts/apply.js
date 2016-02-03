/* 
* @Author: ocean
* @Date:   2015-09-16 13:35:43
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-10 10:48:36
*/

'use strict';

$(document).ready(function(){
	var timer = null;
	var $quota = $('.quota-info');
	var $quotaCon = $quota.find('.quota-con');

	function quotaInfoSize(){
		$quota.css({
			height: $quota.width()
		});

		var marTop = ($quota.height() - $quotaCon.height()) / 2;

		$quotaCon.css({
			marginTop: marTop
		})

		timer = null;
	}

	quotaInfoSize();
	$(window).on('resize', function(){
		if(!null){
			var timer = setTimeout(quotaInfoSize, 500);
		}
	});
});

// 页面data-href跳转事件
$(function(){
	var dataHrefEle = $("*[data-href]");
	dataHrefEle.each(function(k, v){
		var $_this = $(this);
		$_this.on(oTools.clickEvent, function(){
			location.href = $_this.attr('data-href');
		});
	})
});

// 首页动画
$(window).load(function(){
	var e = document.querySelector('.a-m-ani');
	var $applyCon = $('.apply-con');

	var events = ["animationend", "webkitAnimationEnd", "mozAnimationEnd", "MSAnimationEnd", "oanimationend"];
	if(e){
		for (var i = 0; i < events.length; i++) {
		    e.addEventListener(events[i], addFlash, false);
		}
	}

	function addFlash(){
	    $applyCon.css({
	        'opacity': 1
	    });
	    $applyCon.addClass('bounceInUp');
	};
});

// 协议弹层
$(function(){
// Dialog + iscroll type popup
	var close = new Image();
	close.src = gConfig.imgPath + 'images/delete.png';
	
	$('#protocol').on(oTools.clickEvent, function(){

		Dialog({
			'id': 'wrapper',
			'type': 'popup',
			'lock':true,
			'width':'85%',
			'height': '85%',
			'closeImg': close.src,
			'closeBtnW': '36px',
			'closeBtnH': '36px',
			'closeTop': '-32px',
			'closeRight': '-24px',
			'lockColor': '#212936',
			'animation':'animated bounceInDown',
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
	$('.upload-btn').on(oTools.clickEvent, function(){
		$(this).prev().click();
	});
});