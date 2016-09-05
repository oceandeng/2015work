/* 
* @Author: ocean
* @Date:   2015-11-17 11:38:31
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-01 18:03:45
*/

'use strict';
var sW = 0, sH = 0, dW = 0, dH = 0;

(function($){
	$(function(){
		sW = $(window).width(),
		sH = $(window).height(),
		dW = document.body.clientWidth,
		dH = document.body.clientHeight;

		if(dH < sH){
			$('body').css({
				height: sH
			});
		};
	});

//-- 列表页面
	$(function(){
		var $adrList = $('.common-list');
		$adrList.each(function(k, v){
			var $_this = $(this);
			var adrListH = $_this.height();

			$_this.find('img').css({
				'margin-top': (adrListH / 2) - 20
			});
			$_this.find('.del-btn').css({
				'height': adrListH - 1,
				'line-height': adrListH + 'px'
			})
		});
	});

//-- 进度页面
	$(function(){
		var $tLine = $('.time-line');
		var tLboxH = 0,
			tLH = 0,
			pOneH = $('.p-one').height(),
			pTwoH = $('.p-two').height(),
			pThrH = $('.p-thr').height(),
			pFouH = $('.p-fou').height();

		if(pFouH){
			tLH = pOneH + pTwoH + pThrH;
			tLboxH = pOneH + pTwoH + pThrH + pFouH;
		}else{
			tLH = pOneH + pTwoH;
			tLboxH = pOneH + pTwoH + pThrH;
		}

		$('.time-line-box').css({
			height: tLboxH
		});

		$tLine.css({
			'height': tLH,
			'margin-top': pOneH / 2
		});

		$('.s-one').css({top: pOneH / 2 - 15});
		$('.s-two').css({top: pOneH + pTwoH / 2 - 15});
		$('.s-thr').css({top: pOneH + pTwoH + pOneH / 2 - 15});
		$('.s-fou').css({top: pOneH + pTwoH + pThrH + pOneH / 2});

	});

// -- tab标签切换
	$(function(){
		var $cTab = $('.common-tab');
		var $cTabTit = $cTab.find('.tab-label');
		var $cTabDet = $cTab.find('.tab-detail');

		$cTabTit.each(function(k, v){
			$(v).on(oTools.clickEvent, function(){
				$cTabTit.removeClass('ac');
				$(v).addClass('ac');

				$cTabDet.each(function(i, n){
					$(n).hide();
					$cTabDet.eq(k).show();
				})
			});
		});

	});
	
// -- 

})(Zepto);