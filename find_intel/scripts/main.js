/* 
* @Author: ocean
* @Date:   2015-10-13 11:55:34
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-03 13:18:07
*/

var sW = 0, sH = 0, dW = 0, dH = 0;

$(window).load(function(){
	sW = $(window).width();
	sH = $(window).height();
	dW = document.body.clientWidth;
	dH = $('body').height();

	if(dH < sH){
		$('body').css({
			height: sH
		});
	};
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

// 验证车牌号
	function checkCarNum(str){
		if(!(/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(str))){
	        oTools.alertmess("车牌号输入不合法");
	        return false;
	    };
	}

// 是否为空
	function isNull(str) {
	    if (str == "") {
	    	return true;
		}
	}
// 验证手机
	function checkMobile(str) {
		var patten = /^1\d{10}$/;
		return patten.exec(str);
	}
// 验证用户名
	function checkuser(str){
		var patten = /[\u4E00-\u9FA5]{1,10}/;
		return patten.exec(str);
	}

	(function($){
// -- 文本框
		var $dri = $('#driInfo')
		var tVal = $dri.val();

		if(tVal == '一句话描述自己'){
			$dri.css({
				color: '#999'
			});
		}

		$dri.on('focus', function(){
			if($dri.val() == '一句话描述自己'){
				$dri.val('').css({
					color: '#333'
				});
			}
		});
		$dri.on('blur', function(){
			if($dri.val() == ''){
				$dri.val('一句话描述自己').css({
					color: '#999'
				});
			}
		});
		$dri.on('keydown', function(){
			var $wNum = $('#wNum');
			var len = $dri.val().length;

			$wNum.html(len);

			if(len >= 50){
				oTools.alertmess('最多输入50个文字');
			}
		});

		$('#radioBox').on(oTools.clickEvent, 'label', function(){
			var $_this = $(this);

			$_this.parent().addClass('ac');
			$_this.parent().siblings().removeClass('ac');
		});

		$('.input-line').each(function(k, v){
			var img = new Image();
			img.src = gConfig.imgPath + 'images/delete.png';

			var $_this = $(this);
			var $_input = $_this.find('input');
			var _val = $_input.val();
			var disabled = $_this.find('input').attr('disabled');

			if(_val != '' && !disabled && $_input.attr('type') != 'radio'){
				$_this.append(img);
			}
			$_input.on('keyup', function(){
				var $__this = $(this);
				var __val = $__this.val();

				if(__val != '' && $_input.attr('type') != 'radio'){
					if($__this.parents('.input-line').find('img').size() == 0){
						$__this.parents('.input-line').append(img);
					}
				}else{
					$_this.find('img').remove();
				}
			});
			$_this.on(oTools.clickEvent, 'img', function(){
				var $___this = $(this);

				$___this.siblings().find('input').val('');
				$___this.remove();
			});
		});

	})(Zepto);