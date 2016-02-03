/* 
* @Author: ocean
* @Date:   2015-11-18 11:45:39
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-18 10:23:35
*/

'use strict';

/************************************************************
// -- 底部菜单滚动隐藏
*************************************************************/
// (function($){
// 	var pos = {
// 			startY: 0,
// 			moveY: 0,
// 			endY: 0
// 		}

// 	var $bNav = $('#bottomNav');
// 	var bNavH = $bNav.height();

// 	var processor = new Processor(function(e){
// 		// console.log(e && e.target.body.scrollTop);
// 		var bodyTop = e && e.target.body.scrollTop;

// 		var $this = $(window);

// 		$this.on('touchstart', function(e){
// 			pos.startY = e.changedTouches[0].pageY
// 		});

// 		$this.on('touchmove', function(e){
// 			pos.moveY = e.changedTouches[0].pageY
// 		});

// 		$this.on('touchend', function(e){
// 			pos.endY = e.changedTouches[0].pageY
// 		});

// 		if(pos.endY < pos.startY){
// 			$bNav.animate({
// 				bottom: -bNavH
// 			})
// 		}
// 		if(pos.endY > pos.startY){
// 			$bNav.animate({
// 				bottom: 0
// 			})
// 		}
// 		if(bodyTop > 0 && bodyTop < 10){
// 			$bNav.animate({
// 				bottom: 0
// 			})
// 		}
// 	});

// 	$(window).on('scroll', function(e){
// 			processor.process(e);
// 	});

// })(Zepto);

/************************************************************
// -- 单选按钮
*************************************************************/
$(function(){

	var $oBox = $('#outBox'),
		$iBox = $('#inBox');

	$oBox.on('tap', function(){
		var $this = $(this);

		if($this.hasClass('close-one')){
			$this.removeClass();
			$this.addClass('open-one');
		}else{
			$this.removeClass();
			$this.addClass('close-one');
		}

		if($iBox.hasClass('close-two')){
			$iBox.removeClass();
			$iBox.addClass('open-two');
		}else{
			$iBox.removeClass();
			$iBox.addClass('close-two');
		}
    });
});

/************************************************************
// -- 头部fixed
*************************************************************/
(function($){
	$(window).load(function(){
		var topH = $('.i-top-nav').height();

		$('.i-sum').css({
			'padding-top': topH
		})
	});
})(Zepto);

/************************************************************
// -- tab标签切换
*************************************************************/
$(function(){
	var $cTab = $('.tab');
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