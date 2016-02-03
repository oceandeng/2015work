/* 
* @Author: ocean
* @Date:   2015-08-28 10:23:37
* @Last Modified by:   ocean
* @Last Modified time: 2015-09-10 15:15:21
*/

'use strict';

var myIconS = 24;

var map = new BMap.Map('container');
// map.disableScrollWheelZoom(true);     //禁用滚轮放大缩小
// map.setMapStyle({style:'light'});	  //设置皮肤

// 添加带有定位的导航控件
var navigationControl = new BMap.NavigationControl({
	// 靠左上角位置
	anchor: BMAP_ANCHOR_TOP_LEFT,
	// LARGE类型
	type: BMAP_NAVIGATION_CONTROL_LARGE,
	// 启用显示定位
	enableGeolocation: true
});
map.addControl(navigationControl);

var todayTimestamp = getTodayTimestamp();

// 绘制mark、 Polyline
function drawMap(mapData){
	gConfig.drawDone = true;

	var dateArr = [];
	var nowPoint = 0;

	for(var data in mapData){
		dateArr.push(getTimestamp(mapData[data].date));
	}

	for(var j = 0; j < dateArr.length; j++){
		if(todayTimestamp > dateArr[j] && todayTimestamp < dateArr[j + 1]){
			nowPoint = j + 1;
		}
		if(todayTimestamp == dateArr[j]){
			nowPoint = j;
		}
		if(todayTimestamp > dateArr[dateArr.length - 1]){
			nowPoint = dateArr.length - 1;
		}
	}

	var numa = 0, numc = 0;
	// 气泡函数
	function bubble(marker, myCompOverlay, pt, txt){

// console.log(map.getOverlays()[map.getOverlays().length - 1]._city);
// console.log($.inArray('ComplexCustomOverlay', map.getOverlays()));

		addHandler(marker, 'mouseover', function(){
        	var numb = map.getOverlays().length;

// console.log(numb);
// console.log(numc);
// console.log('----');

			if((numa >= numb && numb > numc) || numc == 0){
				var overLs = map.getOverlays().pop();
				map.removeOverlay(overLs);
			}
			
			if(typeof myCompOverlay == "undefined"){
				myCompOverlay = new ComplexCustomOverlay(pt, txt);
			}
		    map.addOverlay(myCompOverlay);
			numa = map.getOverlays().length;

		    addHandler(myCompOverlay._close, 'click', function(){
		    	map.removeOverlay(myCompOverlay);
				numc = map.getOverlays().length;

// console.log(numb);
// console.log(numc);
// console.log('----');

		    });
		});
	};

	// 绘制下一个位置点
	function drawNext(num){

		var pt = new BMap.Point(jFnO(mapData[nowPoint + num].jingWei), jFnT(mapData[nowPoint + num].jingWei));
		var myIcon = new BMap.Icon(gConfig.path + "images/red-next.png", new BMap.Size(myIconS,myIconS));
		var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中	

    	var txt = {'city': mapData[nowPoint + num].city, 'txt': mapData[nowPoint + num].name, 'date': mapData[nowPoint + num].date, 'url': mapData[nowPoint + num].url, 'address': mapData[nowPoint + num].address};
		var myCompOverlay;
		if(num == 0 && !drawBubbleFlag){
			drawBubble(marker, myCompOverlay, pt, txt);
		}
		bubble(marker, myCompOverlay, pt, txt);
	};

	// 绘制当前气泡
	var drawBubbleFlag = false;
	function drawBubble(marker, myCompOverlay, pt, txt){
		if(typeof myCompOverlay == "undefined"){
			myCompOverlay = new ComplexCustomOverlay(pt, txt);
	    	map.addOverlay(myCompOverlay);
		}

	    addHandler(myCompOverlay._close, 'click', function(){
	    	map.removeOverlay(myCompOverlay);
			numc = map.getOverlays().length;

// console.log(numc);
// console.log('----');
	    });

	    drawBubbleFlag = true;
	};

	// 绘制折线
	function drawPolyline(num, polyLine){
		if(num <= nowPoint - 1){
			var polyline = new BMap.Polyline(polyLine.getPath(), {strokeColor:'#ef4104', strokeOpacity: 0.8});   //创建折线
			map.addOverlay(polyline);   //增加折线
		}else{
			var polyline = new BMap.Polyline(polyLine.getPath(), {strokeColor:'#ef4104', strokeOpacity: 0.8, strokeStyle: 'dashed'});   //创建折线
			map.addOverlay(polyline);   //增加折线
		}
	};

	// 清空覆盖物、定位地图
	map.clearOverlays();
	map.centerAndZoom(new BMap.Point(jFnO(mapData[nowPoint].jingWei), jFnT(mapData[nowPoint].jingWei)), 8);

	for(var i in mapData){

		if (i == 0){

			(function(i){
				var p1 = new BMap.Point(jFnO(mapData[i].jingWei), jFnT(mapData[i].jingWei));
				var p2 = new BMap.Point(jFnO(mapData[parseInt(i)+1].jingWei), jFnT(mapData[parseInt(i)+1].jingWei));

				var driving = new BMap.DrivingRoute(map, {
					renderOptions:{
						map: map,
						autoViewport: false
					},
					onMarkersSet: function(marker){
						for(var i = 0; i < marker.length; i ++){
							map.removeOverlay(marker[i].marker);
						}
					},
					onPolylinesSet: function(routes){
						var polyLine = routes[0].getPolyline();
						map.removeOverlay(polyLine);
						
						drawPolyline(i, polyLine);

						// var polyline = new BMap.Polyline(polyLine.getPath(), {strokeColor:'#ef4104', strokeOpacity: 0.8});   //创建折线
						// map.addOverlay(polyline);   //增加折线
					}
				});
				driving.search(p1, p2);

				if(i < nowPoint){
					drawMarker('red-solid');
				}else if(i == nowPoint){
					drawMarker('red-next');
				}else{
					drawMarker('red');
				}
				
				if(i <= nowPoint){
					drawNext(0);
				}
				// else if(nowPoint != 0){
				// 	drawNext(1);
				// }

				function drawMarker(imgName){

					var pt1 = new BMap.Point(jFnO(mapData[i].jingWei), jFnT(mapData[i].jingWei));
					var myIcon1 = new BMap.Icon(gConfig.path + "images/" + imgName + ".png", new BMap.Size(myIconS,myIconS));
					var marker1 = new BMap.Marker(pt1,{icon:myIcon1});  // 创建标注
					map.addOverlay(marker1);              // 将标注添加到地图中

				    var txt = {'city': mapData[i].city, 'txt': mapData[i].name, 'date': mapData[i].date, 'url': mapData[i].url, 'address': mapData[i].address};
					var myCompOverlay;

					bubble(marker1, myCompOverlay, pt1, txt);

					// addHandler(marker1, 'mouseover', function(){
					// 	if(typeof myCompOverlay == "undefined"){
					// 		myCompOverlay = new ComplexCustomOverlay(pt1, txt);
					// 	}
					//     map.addOverlay(myCompOverlay);

					//     addHandler(myCompOverlay._close, 'click', function(){
					//     	map.removeOverlay(myCompOverlay);
					//     });
					// });

					// marker1.addEventListener('mouseout', function(){
					//     map.removeOverlay(myCompOverlay);
					// }, false);

					var pt2 = new BMap.Point(jFnO(mapData[parseInt(i)+1].jingWei), jFnT(mapData[parseInt(i)+1].jingWei));
					var myIcon2 = new BMap.Icon(gConfig.path + "images/" + imgName + ".png", new BMap.Size(myIconS,myIconS));
					var marker2 = new BMap.Marker(pt2,{icon:myIcon2});  // 创建标注
					map.addOverlay(marker2);              // 将标注添加到地图中	
				    
				    var txt2 = {'city': mapData[parseInt(i) + 1].city, 'txt': mapData[parseInt(i) + 1].name, 'date': mapData[parseInt(i) + 1].date, 'url': mapData[parseInt(i) + 1].url, 'address': mapData[parseInt(i) + 1].address};
					var myCompOverlay1;

					bubble(marker2, myCompOverlay1, pt2, txt2);
				}

			})(i);

		}

		if(i > 0 && i < mapData.length - 1){
			(function(i){
				var p3 = new BMap.Point(jFnO(mapData[i].jingWei), jFnT(mapData[i].jingWei));
				var p4 = new BMap.Point(jFnO(mapData[parseInt(i)+1].jingWei), jFnT(mapData[parseInt(i)+1].jingWei));

				var driving = new BMap.DrivingRoute(map, {
					renderOptions:{
						map: map,
						autoViewport: false
					},
					onMarkersSet: function(marker){
						for(var i = 0; i < marker.length; i ++){
							map.removeOverlay(marker[i].marker);
						}
					},
					onPolylinesSet: function(routes){
						var polyLine = routes[0].getPolyline();
						map.removeOverlay(polyLine);


						drawPolyline(i, polyLine);

					}
				});
				driving.search(p3, p4);

				if(i < nowPoint){
					drawMarker('red-solid');
				}else if(i == nowPoint){
					drawMarker('red-next');
				}else{
					drawMarker('red');
				}
				
				if(i <= nowPoint){
					drawNext(0);
				}
				// else if(nowPoint != 0){
				// 	drawNext(1);
				// }

				function drawMarker(imgName){
					var pt = new BMap.Point(jFnO(mapData[i].jingWei), jFnT(mapData[i].jingWei));
					var myIcon1 = new BMap.Icon(gConfig.path + "images/" + imgName + ".png", new BMap.Size(myIconS,myIconS));
					var marker = new BMap.Marker(pt,{icon:myIcon1});  // 创建标注
					map.addOverlay(marker);              // 将标注添加到地图中

			    	var txt = {'city': mapData[i].city, 'txt': mapData[i].name, 'date': mapData[i].date, 'url': mapData[i].url, 'address': mapData[i].address};
					var myCompOverlay;

					bubble(marker, myCompOverlay, pt, txt);

					// var pt2 = new BMap.Point(jFnO(mapData[parseInt(i)+1].jingWei), jFnT(mapData[parseInt(i)+1].jingWei));
					// var myIcon2 = new BMap.Icon(gConfig.path + "images/" + imgName + ".png", new BMap.Size(16,16));
					// var marker2 = new BMap.Marker(pt2,{icon:myIcon2});  // 创建标注
					// map.addOverlay(marker2);              // 将标注添加到地图中					
				}
			})(i);
		}

		if(i == mapData.length - 1){
			(function(i){
				if(i <= nowPoint){
					drawMarker('red-solid');
				}else{
					drawMarker('red');
				}

				function drawMarker(imgName){
					var pt2 = new BMap.Point(jFnO(mapData[i].jingWei), jFnT(mapData[i].jingWei));
					var myIcon2 = new BMap.Icon(gConfig.path + "images/" + imgName + ".png", new BMap.Size(myIconS,myIconS));
					var marker2 = new BMap.Marker(pt2,{icon:myIcon2});  // 创建标注
					map.addOverlay(marker2);              // 将标注添加到地图中	

				    var txt = {'city': mapData[i].city, 'txt': mapData[i].name, 'date': mapData[i].date, 'url': mapData[i].url, 'address': mapData[i].address};
					var myCompOverlay1;

					bubble(marker2, myCompOverlay1, pt2, txt);
				}
			})(i);

			setTimeout(function(){
				gConfig.drawDone = false;
			}, 500);
		}

	}
}

// var txt = "平原县四方物流";
// var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(116.425431,37.180499), txt);
// map.addOverlay(myCompOverlay);

// var point = new BMap.Point(116.404, 39.915);
// map.centerAndZoom(point, 15);

// 创建卡车
// var pt = new BMap.Point(116.425431,37.180499);
// var myIcon = new BMap.Icon(gConfig.path + "images/truck.png", new BMap.Size(130,83));
// var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
// map.addOverlay(marker2);              // 将标注添加到地图中

// var polyline1 = new BMap.Polyline(LngLats, {strokeColor:strokeColor, strokeWeight:strokeWeight,strokeOpacity:0.5});   //创建折线
// map.addOverlay(polyline1);   //增加折线