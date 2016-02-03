/* 
* @Author: ocean
* @Date:   2015-07-28 14:37:05
* @Last Modified by:   ocean
* @Last Modified time: 2015-07-28 17:04:32
*/

'use strict';

// var winW = window.screen.width,
// 	winH = window.screen.height;
var winW = document.body.scrollWidth,
	winH = document.body.scrollHeight;

var canvas = query('#headerBg')[0];
var cctx = canvas.getContext('2d');

canvas.width = winW;
canvas.height = winH;

var buff = document.createElement('canvas');
var bctx = buff.getContext('2d');
var image = new Image();

buff.width = canvas.width;
buff.height = canvas.height;

image.onload = function(){
	if(image.height < canvas.height){
		bctx.drawImage(image, -(canvas.height * image.width / image.height - canvas.width) / 2, 0, canvas.height * image.width / image.height, canvas.height);
	}else{
		bctx.drawImage(image, 0, 0, canvas.width, canvas.width * image.height / image.width);
	}
	
	cctx.drawImage(buff, 0, 0);
    StackBlur.canvasRGB(canvas, 0, 0, canvas.width, canvas.height, gConfig.blur);
}

image.src = gConfig.path + gConfig.headerBg;



function query(tag){
	return document.querySelectorAll(tag);
}