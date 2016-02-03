/* 
* @Author: ocean
* @Date:   2015-09-01 10:00:26
* @Last Modified by:   ocean
* @Last Modified time: 2015-09-08 16:35:43
*/

'use strict';

function addHandler(element, type, handler){
	if(element.addEventListener){
		element.addEventListener(type, handler, false);
	}else if(element.attachEvent){
		element.attachEvent("on" + type, handler);
	}else{
		element["on" + type] = handler;
	}
}

// 经纬度字符串转换函数
function jFnO(str){
	var arr = str.split(',');
	return arr[0];
}

function jFnT(str){
	var arr = str.split(',');
	return arr[1];
}

// 获取时间戳
function getTimestamp(str){
	if(str != undefined){
		var dateStr = str.replace(/\u5e74|\u6708|\u65e5|\-/g, '/');
		dateStr = dateStr.substring(0, dateStr.length-1);
		var date = new Date(dateStr);
		var timestamp = Date.parse(date) / 1000;

		return timestamp;
	}
}

function getTodayTimestamp(){
	var oDate = new Date();
	var dateStr = oDate.getFullYear() + '/' + (oDate.getMonth()+1) + '/' + oDate.getDate();
	var date = new Date(dateStr);
	var timestamp = Date.parse(date) / 1000;

	return timestamp;
}

// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, text){
	this._point = point;
	this._city = text.city;
	this._text = text.txt;
	this._date = text.date;
	this._address = text.address;
	this._url = text.url;
	this._stays = text.stay;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
	this._map = map;
	var div = this._div = document.createElement("div");
	div.style.position = "absolute";
	div.style.zIndex = '99999';
	div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	div.style.backgroundColor = "#fff";
	div.style.border = "1px solid #ccc";
	// div.style.marginTop = "-80px";
	div.style.borderRadius = '5px';
	div.style.boxShadow = '1px 1px 3px #333';
	div.style.color = "#333";
	div.style.padding = "5px 10px";
	div.style.lineHeight = "18px";
	div.style.whiteSpace = "nowrap";
	div.style.MozUserSelect = "none";
	div.style.fontFamily = "Microsoft YaHei";
	div.style.fontSize = "14px";

	var h2 = this._h2 = document.createElement("h2");
	h2.style.fontWeight = 'bold';
	h2.style.fontSize = '14px';
	div.appendChild(h2);
	h2.appendChild(document.createTextNode(this._city));

	var p = this._p = document.createElement("p");
	div.appendChild(p);
	p.appendChild(document.createTextNode(this._text));

	var add = this._p1 = document.createElement("p");
	add.style.padding = "0 0 5px 0";
	div.appendChild(add);
	add.appendChild(document.createTextNode(this._address));

	var span = this._span = document.createElement("span");
	span.style.color = "#ff4d21";
	div.appendChild(span);
	span.appendChild(document.createTextNode(this._date));

	if(this._url){
		var a = this._a = document.createElement("a");
		a.style.color = "#ff4d21";
		a.style.display = "block";
		a.target = "_blank";
		a.href = this._url;
		div.appendChild(a);
		a.appendChild(document.createTextNode('点击查看现场详情'));
	}

	if(!this._url){
		var stay = this._stay = document.createElement("p");
		stay.style.color = "#707996";
		div.appendChild(stay);
		stay.appendChild(document.createTextNode('敬请期待大篷车到达'));
	}

	var that = this;

	var close = this._close = document.createElement("div");
	var closeImg = new Image();
	closeImg.onload = function(){
		close.style.width = "16px";
		close.style.height = "16px";
		close.style.position = "absolute";
		close.style.right = "5px";
		close.style.top = "5px";
		close.style.backgroundImage = "url(" + closeImg.src + ")";
		close.style.backgroundRepeat = "no-repeat";
		close.style.cursor = "pointer";
		div.appendChild(close);
	}
	closeImg.src = gConfig.path + "images/close.png";

	var arrow = this._arrow = document.createElement("div");
	arrow.style.background = "url(" + gConfig.path + "images/label.png) no-repeat";
	arrow.style.position = "absolute";
	arrow.style.width = "11px";
	arrow.style.height = "10px";
	arrow.style.left = "10px";
	arrow.style.overflow = "hidden";
	div.appendChild(arrow);

	// div.onmouseout = function(){
	//   this.style.backgroundColor = "#EE5D5B";
	//   this.style.borderColor = "#BC3B3A";
	//   this.getElementsByTagName("span")[0].innerHTML = that._text;
	//   arrow.style.backgroundPosition = "0px 0px";
	// }


	map.getPanes().labelPane.appendChild(div);

	var divH = div.offsetHeight;
	
	div.style.marginTop = - divH + 20 + 'px';
	arrow.style.top = divH - 3 + "px";

	return div;
}
ComplexCustomOverlay.prototype.draw = function(){
	var map = this._map;
	var pixel = map.pointToOverlayPixel(this._point);
	this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
	this._div.style.top  = pixel.y - 30 + "px";
}