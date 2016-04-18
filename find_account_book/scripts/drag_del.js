/* 
* @Author: ocean
* @Date:   2015-11-23 15:32:15
* @Last Modified by:   ocean
* @Last Modified time: 2016-04-14 14:03:52
*/

'use strict';

var DragDel = function(){

	var dragging = null,
		diffX = 0,
		diffW = 0;

	var delW = 0;

    var winW = window.screen.width,
        winH = window.screen.height;

	// -- 获取所有父节点
	function getParents(dom){
		var parents = [];
		while(dom.parentNode){
			parents.push(dom.parentNode);
			dom = dom.parentNode;
		}
		return parents;
	}

	function handleEvent(event){

		// 获取位置对象和目标
        var eventPos = event.changedTouches[0];
        var target = event.target;

		switch(event.type){
			case 'touchstart':

				var parents = getParents(target);

				for(var i = 0, len = parents.length; i < len; i++){
					if(parents[i].className && parents[i].className.indexOf('dragdel') > -1){
						dragging = parents[i];
						diffX = eventPos.clientX - parents[i].offsetLeft;
						diffW = parents[i].clientWidth - diffX;

						var siblings = parents[i].parentNode.childNodes;

						for(var j = 0, jlen = siblings.length; j < jlen; j++){
							if(siblings[j].className && siblings[j].className.indexOf('del-btn') > -1){
								delW = siblings[j].offsetWidth;
							}
						}
					};
				}
				break;
			case 'touchmove':
				if(dragging !== null){
					var posLeft = eventPos.clientX - diffX;
                    var posRig = winW - (eventPos.clientX + diffW);


					if(posLeft < 0){
						if(-posLeft < delW){
							dragging.style.left = posLeft + 'px';
						}else if(-posLeft > delW){
							dragging.style.left = -delW + 'px';
						}
					}else if(posRig < 0){
						if(dragging.style.left < 0){
							dragging.style.left = -posRig + 'px';
						}else{
							dragging.style.left = 0;
						}
					}
				}
                event.preventDefault();
				break;
			case 'touchend':
				if(dragging !== null){
					var dragLeft = parseInt(dragging.style.left);
				}

				if(-dragLeft > delW / 2){
					$(dragging).animate({
						left: -delW
					});
				}else{
					$(dragging).animate({
						left: 0
					})
				}
				dragging = null;
				break;
		}
	}

	return {
		enable: function(){
			EventUtil.addHandler(document, "touchstart", handleEvent);
			EventUtil.addHandler(document, "touchmove", handleEvent);
			EventUtil.addHandler(document, "touchend", handleEvent);
		},
		disable: function(){
			EventUtil.removeHandler(document, "touchstart", handleEvent);
            EventUtil.removeHandler(document, "touchmove", handleEvent);
            EventUtil.removeHandler(document, "touchend", handleEvent);
		}
	}
};