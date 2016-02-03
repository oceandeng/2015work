/* 
* @Author: ocean
* @Date:   2015-11-17 11:38:31
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-31 16:43:52
*/

'use strict';
var sW = 0, sH = 0, dW = 0, dH = 0;

(function(){
	$(function(){
		sW = $(window).width(),
		sH = $(window).height(),
		dW = document.body.clientWidth,
		dH = document.body.clientHeight;

		if(dH < sH){
			$('body').css({
				height: sH
			})
		}
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
	
    // 页面data-href跳转事件
    $(function(){
        $(document).on(oTools.clickEvent, '*[data-href]', function(){
            var $_this = $(this);

            location.href = $_this.attr('data-href');
        });
    });

})(Zepto);

