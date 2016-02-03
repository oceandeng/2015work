/* 
* @Author: ocean
* @Date:   2015-11-19 10:57:53
* @Last Modified by:   ocean
* @Last Modified time: 2015-11-25 17:30:58
*/

'use strict';
(function($){
// 办卡页面
	var $cardT = $('.card-type');
	var cardBoxH = $cardT.find('.card-box').height();
	// var p = parseInt($cardT.find('.card-box').css('padding'));

	$cardT.find('.c-sel').find('img').css({
		marginTop: (cardBoxH / 2) - 20
	});
	
	var selImg = new Image();

	selImg.onload = function(){
		$('.card-type').on(oTools.clickEvent, '.card-box', function(){
			var $_this = $(this);

			$_this.siblings().find('.c-sel').html('');
			$_this.find('.c-sel').html(selImg);

			$_this.find('.c-sel').find('img').css({
				marginTop: (cardBoxH / 2) - 20
			});

		});
	}

	selImg.src = gConfig.imgPath + 'images/selected.png';

})(Zepto);