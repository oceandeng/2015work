/* 
* @Author: ocean
* @Date:   2015-12-23 12:33:18
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-23 13:18:35
*/

'use strict';
var sW = 0, sH = 0, dW = 0, dH = 0, cH = 0;
$(window).load(function(){
	sW = $(window).width();
	sH = $(window).height();
	dW = document.body.clientWidth;
	dH = $('body').height();
    cH = $('.i-content').size() && $('.i-content').height() + $('.i-content').position().top;

    if(dH < cH){
        $('body').css({
            height: cH
        })
    }else if(dH < sH){
		$('body').css({
			height: sH
		});
	}
	var $adrList = $('.common-list');
	$adrList.each(function(k, v){
		var $_this = $(this);
		var adrListH = $_this.height();

		$_this.find('.del-btn').css({
			'height': adrListH - 1,
			'line-height': adrListH + 'px'
		})
	});
	var dragDel = new DragDel();
		dragDel.enable();
		var myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true, bounce: false });

	// $('#wrapper').css({
	// 	top: $('.tips').height()
	// });
});