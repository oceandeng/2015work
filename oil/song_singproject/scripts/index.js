/* 
* @Author: ocean
* @Date:   2015-08-31 10:16:30
* @Last Modified by:   ocean
* @Last Modified time: 2015-09-24 14:57:02
*/

'use strict';

$(document).ready(function(){
	
	drawMap(mapDataOne);
	var $tabNav = $('.tab-nav').find('li');

	$tabNav.each(function(index, value){
		$(value).on('click', function(){
			var $_this = $(this);

			if(!gConfig.drawDone){

				$_this.siblings().removeClass();
				$_this.addClass('active');

				switch(index){
					case 0 :
						drawMap(mapDataOne);
						break;
					case 1 :
						drawMap(mapDataTwo);
						break;
					case 2 :
						drawMap(mapDataThr);
						break;
					case 3 :
						drawMap(mapDataFou);
						break;
					default:
						drawMap(mapDataOne);
						break;
				}
			}
		});
	});

	var tripEnd = $('.part-two').offset().top;

	$('#trip').on('click', function(e){
		$('body').animate({
			scrollTop: tripEnd
		})

		e.preventDefault();
	});

// 选项卡
	var $songerLi = $('.win-tab-nav').find('li');
	var $songerCon = $('.win-tab-box').find('.win-tab-con');

	$songerLi.each(function(index, value){
		var $_this = $(this);

		$_this.on('click', function(e){
			$(this).siblings().removeClass();
			$(this).addClass('active');

			$songerCon.each(function(k, v){
				$(this).hide();

				if(index == k){
					$(this).show();
				}
			});
		});
	});
});