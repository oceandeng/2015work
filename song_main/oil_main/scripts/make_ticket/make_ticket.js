/* 
* @Author: ocean
* @Date:   2015-11-27 14:50:37
* @Last Modified by:   ocean
* @Last Modified time: 2015-11-27 14:53:22
*/

'use strict';
(function(){
// -- 选项卡
	$(function(){
		var $sTab = $('.select-ticket');
		var $sTabTit = $sTab.find('.tab-label');
		var $sTabDet = $('.ticket-tab-con').find('.tab-detail');

		$sTabTit.each(function(k, v){
			$(v).on(oTools.clickEvent, function(){
				$sTabTit.removeClass('ac');
				$(v).addClass('ac');

				$sTabDet.each(function(i, n){
					$(n).hide();
					$sTabDet.eq(k).show();
				})
			});
		});
	});
})(Zepto);