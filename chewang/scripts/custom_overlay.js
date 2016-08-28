
// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, obj){
    this._point = point;
    this._time = obj.time;
    this._speed = obj.speed;
    this._status = obj.status;
    this._pos = obj.pos;
}

ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = '999';
    div.style.backgroundColor = "#fff";
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = '5px';
    div.style.boxShadow = '1px 1px 3px #333';
    div.style.color = "#333";
    div.style.padding = "5px 10px";
    div.style.width = "200px";
    div.style.lineHeight = "18px";
    div.style.MozUserSelect = "none";
    div.style.fontFamily = "Microsoft YaHei";
    div.style.fontSize = "14px";

    var lOne = this._d1 = document.createElement("div");
    lOne.style.padding = "3px 0";
    div.appendChild(lOne);
    lOne.appendChild(document.createTextNode('上报时间  ' + this._time));

    var lTwo = this._d2 = document.createElement("div");
    lTwo.style.padding = "3px 0";
    div.appendChild(lTwo);
    lTwo.appendChild(document.createTextNode('车 速  ' + this._speed));

    var lThr = this._d3 = document.createElement("div");
    lThr.style.padding = "3px 0";
    div.appendChild(lThr);
    lThr.appendChild(document.createTextNode('车辆状态  ' + this._status));

    var lFou = this._d4 = document.createElement("div");
    lFou.style.padding = "3px 0";
    div.appendChild(lFou);
    lFou.appendChild(document.createTextNode('位 置  ' + this._pos));

    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url(" + gConfig.imgPath + "images/label.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "18px";
    arrow.style.height = "11px";
    arrow.style.left = "0";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);

    map.getPanes().labelPane.appendChild(div);

    var divH = div.offsetHeight;
    var divW = div.offsetWidth;

    div.style.marginTop = - divH + 'px';
    div.style.marginLeft = - divW / 2 + 'px';
    arrow.style.top = divH - 2 + "px";
    arrow.style.marginLeft = divW / 2 - 9 + 'px';

    return div;
}
ComplexCustomOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top  = pixel.y - 30 + "px";
}