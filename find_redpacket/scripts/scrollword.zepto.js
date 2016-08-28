/* 
* @Author: ocean
* @Date:   2015-10-21 16:21:35
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-21 18:29:27
*/

'use strict';

(function($){
	var defaultConfig = {
		speed: 1000
	};

	$.fn.scrollWord = function(config){
		var config = $.extend({}, defaultConfig, config);
		var $this = $(this);
		var timer = null;

		var _li = $this.find('li');
		var _liH = _li.height();
		var _liM = 0;
		var _cloneUlH = $this.height();

		var $cloneList = $this.clone().html();
		$this.append($cloneList);

		if(!timer){
			timer = setInterval(function(){
				
				_liM += _liH;
				var marT = Math.abs(parseInt($this.css('marginTop')));

				if(marT >= _cloneUlH){
					_liM = _liH;
					$this.css({
						marginTop: 0
					});
				}

				$this.animate({
					marginTop: -_liM
				});

				timer = null;
			}, config.speed);
		}
	}

})(Zepto);