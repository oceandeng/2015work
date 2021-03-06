/* 
* @Author: ocean
* @Date:   2015-11-24 11:35:56
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-16 14:04:02
*/
'use strict';
(function($){
	function CitySelector(o){
		this.initVal = o.initVal;
		this.firCity = o.firCity;
		this.secCity = o.secCity;
		this.thrCity = o.thrCity;
		this.cityObj = o.cityObj;
		this.myScrollOne = o.myScrollOne;
		this.myScrollTwo = o.myScrollTwo;
		this.myScrollThr = o.myScrollThr;

		this.init();
	};
	CitySelector.prototype.init = function(){
		this.creatDom();
		this.event();
	};
	CitySelector.prototype.creatDom = function(){
		var html = '';

		if(this.initVal != ''){
			var arr = this.initVal.split(' ');
		};
		for(var i = 0, len = this.cityObj['00'].length; i < len; i++){
			for(var j in this.cityObj['00'][i]){

				if(arr && arr[0] == this.cityObj['00'][i][j]){
					html += '<li data-code="' + j + '" class="ac">' + this.cityObj['00'][i][j] + '</li>';
				}else{
					html += '<li data-code="' + j + '">' + this.cityObj['00'][i][j] + '</li>';
				}
			};
		};

		this.firCity.append(html);
		this.myScrollOne.refresh();

		var _this = this;

		if(this.firCity.find('.ac').size() != 0){
			this.myScrollOne.scrollToElement(_this.firCity.find('.ac').get(0), null, null, true);
		}

		if(this.initVal != ''){
			var secCode = this.firCity.find('.ac').attr('data-code');
			var secHtml = '';

			for(var i = 0, len = this.cityObj[secCode].length; i < len; i++){
				for(var j in this.cityObj[secCode][i]){
					if(arr && arr[1] == this.cityObj[secCode][i][j]){
						secHtml += '<li data-code="' + j + '" class="ac">' + this.cityObj[secCode][i][j] + '</li>';
					}else{
						secHtml += '<li data-code="' + j + '">' + this.cityObj[secCode][i][j] + '</li>';
					}
				}
			}

			this.secCity.append(secHtml);
			this.myScrollTwo.refresh();

			if(this.secCity.find('.ac').size() != 0){
				this.myScrollTwo.scrollToElement(_this.secCity.find('.ac').get(0), null, null, true);
			}

			var thrCode = this.secCity.find('.ac').attr('data-code');
			var thrHtml = '';

			if(this.cityObj[thrCode]){
				for(var i = 0, len = this.cityObj[thrCode].length; i < len; i++){
					for(var j in this.cityObj[thrCode][i]){
						if(arr && arr[2] == this.cityObj[thrCode][i][j]){
							thrHtml += '<li data-code="' + j + '" class="ac">' + this.cityObj[thrCode][i][j] + '</li>';
						}else{
							thrHtml += '<li data-code="' + j + '">' + this.cityObj[thrCode][i][j] + '</li>';
						}

					}
				}

				this.thrCity.append(thrHtml);
				this.myScrollThr.refresh();

				if(this.thrCity.find('.ac').size() != 0){
					this.myScrollThr.scrollToElement(_this.thrCity.find('.ac').get(0), null, null, true);
				}		
			}
		}
	};
	CitySelector.prototype.event = function(){
		var _this = this;

		this.firCity.on(oTools.clickEvent, 'li', function(){
			var $_this = $(this);
			var secCode = $_this.attr('data-code');
			var html = '';

			$_this.siblings().removeClass();
			$_this.addClass('ac');

			for(var i = 0, len = _this.cityObj[secCode].length; i < len; i++){
				for(var j in _this.cityObj[secCode][i]){
					html += '<li data-code="' + j + '">' + _this.cityObj[secCode][i][j] + '</li>';
				}
			}

			_this.secCity.html('');
			_this.thrCity.html('');
			_this.secCity.append(html);
			_this.myScrollTwo.refresh();
		});

		this.secCity.on(oTools.clickEvent, 'li', function(){
			var $_this = $(this);
			var thrCode = $_this.attr('data-code');
			var html = '';

			$_this.siblings().removeClass();
			$_this.addClass('ac');

			for(var i = 0, len = _this.cityObj[thrCode].length; i < len; i++){
				for(var j in _this.cityObj[thrCode][i]){
					html += '<li data-code="' + j + '">' + _this.cityObj[thrCode][i][j] + '</li>';
				}
			}

			_this.thrCity.html('');
			_this.thrCity.append(html);
			_this.myScrollThr.refresh();

		});

		this.thrCity.on(oTools.clickEvent, 'li', function(){
			var $_this = $(this);

			$_this.siblings().removeClass();
			$_this.addClass('ac');

		});
	};

	window.CitySelector = CitySelector;

})(Zepto);