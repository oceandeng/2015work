/* 
* @Author: ocean
* @Date:   2015-11-28 19:54:11
* @Last Modified by:   ocean
* @Last Modified time: 2015-11-28 20:08:36
*/

'use strict';

(function($){
// -- 下拉菜单
	$(function(){
		$('#dropDown').on(oTools.clickEvent, function(){
			var $_this = $(this),
				$ul = $_this.find('ul');

			if($_this.hasClass('ac')){
				$ul.hide();
				$_this.removeClass('ac');
			}else{
				$ul.show();
				$_this.addClass('ac');
			}

		});
	});

})(Zepto);