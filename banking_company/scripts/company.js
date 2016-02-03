/* 
* @Author: ocean
* @Date:   2015-09-16 13:35:43
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-13 16:38:43
*/

'use strict';

$(function(){
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
	}

	quotaInfoSize();

	$(window).on('resize', function(){
		if(!null){
			var timer = setTimeout(function(){
				quotaInfoSize();
				timer = null;
			}, 500);
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

	$('#bail').on(oTools.clickEvent, function(){

		Dialog({
			'id': 'wrapper1',
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
					myScroll = new IScroll('#wrapper1', {
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

// 车辆授信管理
$(function(){
	var $carMan = $('#carManageBody');

	var close = new Image();
	close.src = gConfig.imgPath + 'images/delete.png';

	$carMan.on(oTools.clickEvent, '.edit-btn', function(){
		var $_this = $(this);
		var adviceVal = $_this.prev().find('span').attr('data-adviseMoney');
		var relationId = $_this.prev().find('span').attr('data-relationId');
		var carAccId = $_this.prev().find('span').attr('data-carAccId');
		// console.log(adviceVal);

console.log(adviceVal);

// 只能输入正整数，并且范围是10000到50000

		Dialog({
			'type': 'input',
			'adviceVal': adviceVal,
			'relationId': relationId,
			'carAccId': carAccId,
			'width': '60%',
			'showButtons': true,
			'submitButton': '\u63d0\u4ea4',
			'submitDone': gConfig.dialogSub,
			'cancelButton': false,
			'lock': true,
			'closeImg': close.src,
			'closeBtnW': '30px',
			'closeBtnH': '30px',
			'closeTop': '-20px',
			'closeRight': '-20px',
			'lockColor': '#212936',
			'animation':'animated fadeInDown',
			'contentStyle': {
                'background': 'rgba(242, 242, 242, 1)',
                'color': '#fff',
                'margin': '0 auto',
                'min-height': '60px',
                'padding': '10px',
                'border-radius': '5px',
                'box-shadow': '1px 1px 5px #ccc;',
                'z-index': 999
			},
			'onSubmit': function(){
				return modifyVal($_this);
			}
		});

	});
});