/* 
* @Author: ocean
* @Date:   2015-09-16 13:35:43
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-13 11:25:36
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
		});

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
		$_this.on('tap', function(){
			location.href = $_this.attr('data-href');
		});
	})
});

// 登录页面单选框
$(function(){
	var seledImg = new Image();
	var nomarImg = new Image();
	var $radioType = $('.radio-type');
	var $selBox = $radioType.find('.radio-box').find('.sel-box');

	nomarImg.onload = function(){

		$selBox.eq(0).append(seledImg);
		$selBox.eq(1).append(nomarImg);

		$('.driver-r').on(oTools.clickEvent, radioFn);
		$('.company-r').on(oTools.clickEvent, radioFn);

		function radioFn(){
			var $_this = $(this);

			$_this.siblings().find('.radio-box').find('.sel-box').append(nomarImg);
			$_this.siblings().find('.radio-box').find('input[type=radio]').removeAttr('checked');
			$_this.find('.radio-box').find('.sel-box').append(seledImg);
			$_this.find('.radio-box').find('input[type=radio]').attr('checked', 'checked');

		}
	}

	seledImg.src = gConfig.imgPath + 'images/radio-select.png';
	nomarImg.src = gConfig.imgPath + 'images/radio-normal.png';

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

// 日期选择
$(function () {
	if($('#treelist').size()){
	    var $tree = $('#treelist');
	    var html = '';
	    var date = new Date();
	    var $placeHolder = $('#placeHolder');

		var startDateArr = gConfig.startDate.split('-');

	    var curYear = parseInt(date.getFullYear());
	    var curMonth = parseInt(startDateArr[1]);
	    // var curMonth = parseInt(date.getMonth() + 1);
	    // var curMonth = 11;

	    if(curMonth <= 9){
	        html += '<li>' + curYear + '年<ul><li>' + curMonth + '月<ul><li>8日</li><li>22日</li></ul></li><li>' + (curMonth + 1) + '月<ul><li>8日</li><li>22日</li></ul></li><li>' + (curMonth + 2) + '月<ul><li>8日</li><li>22日</li></ul></li><li>' + (curMonth + 3) + '月<ul><li>8日</li><li>22日</li></ul></li></ul></li>';
	    }else if(curMonth == 10){
	    	html += '<li>' + curYear + '年<ul><li>' + curMonth + '月<ul><li>8日</li><li>22日</li></ul></li><li>' + (curMonth + 1) + '月<ul><li>8日</li><li>22日</li></ul></li><li>' + (curMonth + 2) + '月<ul><li>8日</li><li>22日</li></ul></li></ul></li><li>' + (curYear + 1) + '年<ul><li>1月<ul><li>8日</li><li>22日</li></ul></li></ul></li>';
	    }else if(curMonth == 11){
	        html += '<li>' + curYear + '年<ul><li>' + curMonth + '月<ul><li>8日</li><li>22日</li></ul></li><li>' + (curMonth + 1) + '月<ul><li>8日</li><li>22日</li></ul></li></ul></li><li>' + (curYear + 1) + '年<ul><li>1月<ul><li>8日</li><li>22日</li></ul></li><li>2月<ul><li>8日</li><li>22日</li></ul></li></ul></li>';
	    }else if(curMonth == 12){
	        html += '<li>' + curYear + '年<ul><li>' + curMonth + '月<ul><li>8日</li><li>22日</li></ul></li></ul></li><li>' + (curYear + 1) + '年<ul><li>1月<ul><li>8日</li><li>22日</li></ul></li><li>2月<ul><li>8日</li><li>22日</li></ul></li><li>3月<ul><li>8日</li><li>22日</li></ul></li></ul></li>';
	    }

	    $tree.append(html);

	    $tree.mobiscroll().treelist({
	        theme: 'mobiscroll' || $.mobiscroll.defaults.theme, //皮肤样式
	        mode: 'scroller', //日期选择模式
	        display: 'modal', //显示方式
	        lang: 'zh',
	        labels: ['year', 'month', 'day'],
	        callback: function(input, data){
	            input.val(data);
	    		var $treeInput = $('#treelist_dummy');
	    		gConfig.dateVal = $treeInput.val();

			    $placeHolder.hide();

			    // 外部执行函数
			    returnCalApplyInfo(gConfig.dateVal);
	        }
	    });
	}
});