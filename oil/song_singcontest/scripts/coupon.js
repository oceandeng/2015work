/* 
* @Author: ocean
* @Date:   2015-08-17 16:38:57
* @Last Modified by:   ocean
* @Last Modified time: 2015-08-20 16:34:34
*/

'use strict';

$(function(){
// Dialog + iscroll type popup
	$('#info').on('tap', function(){
		
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

// 手机验证
	function isNull(str) {
	    if (str == "") {
	    	return true;
		}
	}
	function checkMobile(str) {
		var patten = /^[1-9]\d*$/;
		return patten.exec(str);
	}

	var flag = false;
	$('#submit').on('tap', submitfn);

	function submitfn(){
		var phoneNum = $('#phone').val();

		if(!flag){
			validate(phoneNum, ajaxfn);
		}
	}

	function validate(phoneNum, fn){
		if(isNull(phoneNum)){
			oTools.alertmess('请填写手机号！');
			return;
		}else if(!checkMobile(phoneNum)){
			oTools.alertmess('手机号有误！');
			return;
		}

		flag = true;
		fn && fn(phoneNum);
	}

	function ajaxfn(phoneNum){
		$.ajax({
			url: gConfig.ajaxUrl,
			type: 'POST',
			data: {'mobile': phoneNum},
			beforeSend: function(){
				if($('#canvas').size() < 1){
					showLoading();
				}
				$('#canvas').show();
			},
			success: function(res){
				$('#canvas').hide();
	            if(res.redirect == 1){
	              location.href = res.url;
	            }else{
	              oTools.alertmess(res.msg);
	            }
			},
			error: function(){
				$('#canvas').hide();
				flag = false;
			},
			complete: function(){
				$('#canvas').hide();
				flag = false;
			}

		})
	};

	// loading
	function showLoading(){
		$('<canvas id="canvas"></canvas>').appendTo('body');
		$('#canvas').css({
			'border-radius':'5px',
			'background':'rgba(0,0,0,0.8)',
			'z-index': 999,
			'position': 'fixed',
			'top': '20%',
			'left': '50%',
			'margin-left': -40
		});
		loading({
			"id": "canvas",
			"width": 5,
			"height": 20
		});
	}
});