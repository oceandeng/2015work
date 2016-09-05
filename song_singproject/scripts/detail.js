/* 
* @Author: ocean
* @Date:   2015-09-02 16:35:29
* @Last Modified by:   ocean
* @Last Modified time: 2015-09-02 17:23:50
*/

'use strict';

$(document).ready(function(){
	var $vImg = $('.v-img');
	var html = '<div class="play"><a href="" target="_blank"><img src="' + gConfig.path + 'images/play-btn.png" alt="" />'
		html += '</a></div>'
	var vImgW = $vImg.width(),
		vImgH = $vImg.height();

	$vImg.each(function(index, value){
		var $_this = $(this);

		$_this.on('mouseenter', function(e){
			var href = $_this.find('h1').find('a').attr('href');

			if($_this.find('.play').size() == 0){
				$_this.append(html);
			};

			var $play = $_this.find('.play');

			$play.css({
				'position': 'absolute',
				'top': vImgH,
				'left': 0,
				'width': vImgW,
				'height': vImgH,
				'background': 'rgba(0, 0, 0, .8)'
			});

			$play.find('a').css({
				'display': 'block',
				'width': vImgW,
				'height': vImgH
			});

			$play.find('img').css({
				'position': 'absolute',
				'top': '50%',
				'left': '50%',
				'margin': '-36px 0 0 -36px'
			});

			$play.find('a').attr('href', href);

			$play.stop().animate({
				top: 0
			});
		});

		$_this.on('mouseleave', function(e){
			$_this.find('.play').stop().animate({
				top: vImgH
			});
		});
	});
});