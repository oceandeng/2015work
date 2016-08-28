/* 
* @Author: ocean
* @Date:   2015-10-21 16:21:35
* @Last Modified by:   ocean
* @Last Modified time: 2016-04-05 16:13:55
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
		var _ulW = 0;
		var speed = 1;

		var _li = $this.find('li');
		var _liW = _li.width();
		var _liM = 0;
		var _cloneUlW = 0;

		$this.find('li').each(function(k, v){
			var $_this = $(v);
			_cloneUlW += $_this.width() + parseInt($_this.css('padding-right'));
		});

		var $cloneList = $this.clone().html();
		$this.append($cloneList);

		$this.find('li').each(function(k, v){
			var $_this = $(v);
			_ulW += $_this.width() + parseInt($_this.css('padding-right'));
		});

		$this.css({
			width: _ulW
		})

		if(!timer){
			timer = setInterval(function(){
				
				_liM += speed;
				var marL = Math.abs(parseInt($this.css('marginLeft')));


				if(marL >= _cloneUlW){
					_liM = 0;
					$this.css({
						marginLeft: 0
					});
				}

				$this.animate({
					marginLeft: -_liM
				});

				timer = null;
			}, config.speed);
		}
	}

})(Zepto);