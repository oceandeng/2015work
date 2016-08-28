/* 
* @Author: ocean
* @Date:   2016-02-23 10:53:11
* @Last Modified by:   ocean
* @Last Modified time: 2016-02-23 14:10:46
*/

'use strict';

var gConfig = {
	globalPath: location.origin + '/',
    imgPath: location.origin + '/'
}

var dynamicLoad = {
	css: function(path){
		if(!path || path.length === 0){
			throw new Error('文件路径不能为空！');
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	},
	js: function(path){
		if(!path || path.length === 0){
			throw new Error('文件路径不能为空！');
		}
		var body = document.getElementsByTagName('body')[0];
		var script = document.createElement('script');
		script.src = path;
		script.type = 'text/javascript';
		body.appendChild(script);
	}
}