/* 
* @Author: ocean
* @Date:   2015-10-13 11:55:34
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-28 17:10:59
*/

'use strict';

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
	}

	var $pImg = $('#postImg').find('.p-img-box');
	var $pImgp = $('#postImg').find('.p-img-box').find('img');
	var pImgW = $pImg.width();

	$pImg.height(pImgW);

	$pImgp.each(function(k, v){
		var w = $(v).width();
		var h = $(v).height();
		var r = w / h;

		if(h < pImgW){
			$(v).css({
				'max-width': 'none',
				'width': parseInt(pImgW * r),
				'height': pImgW,
				'margin-left': -(parseInt(pImgW * r) - pImgW) / 2
			})
		}
	})

	// 图片大图显示
	var $postImg = $('#postImg');

	$postImg.lightBox && $postImg.lightBox({
		width: sW,
		height: sH,
		cEvent: oTools.clickEvent,
		parentClass: '.p-img-box'
	});

	var nImgW = $('.normal').find('.n-icon').find('img').width(),
		nImgH = $('.normal').find('.n-icon').find('img').height();

	$('.n-icon').css({
		height: nImgW,
		overflow: 'hidden'
	});
	$('.n-icon').find('img').css({
		marginTop: -(nImgH - nImgW) / 2
	});

	var nH = $('.n-icon').height();

	$('.n-info').css({
		'height': nH,
		'overflow': 'hidden',
    	'text-overflow': 'ellipsis'
	});

	$('.activity').find('li').each(function(k, v){
		var $_this = $(this);
		var iH = $_this.find('img').first().height();

		$_this.css({
			height: iH
		})
	});

})

// 页面data-href跳转事件
// $(function(){
// 	var dataHrefEle = $("*[data-href]");
// 	dataHrefEle.each(function(k, v){
// 		var $_this = $(this);
// 		$_this.on(oTools.clickEvent, function(){
// 			location.href = $_this.attr('data-href');
// 		});
// 	})
// });

// 页面data-href跳转事件
$(function(){
    $(document).on(oTools.clickEvent, '*[data-href]', function(){
        var $_this = $(this);

        location.href = $_this.attr('data-href');
    });
});