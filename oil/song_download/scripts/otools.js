/* 
* @Author: ocean
* @Date:   2015-07-06 16:11:13
* @Last Modified by:   ocean
* @Last Modified time: 2015-07-28 11:23:24
*/

'use strict';

var ua = window.navigator.userAgent.toLowerCase();

var oTools = {
    // 版本检测
	isAndroid: /android/i.test(ua),
	isIOS: /iphone|ipad|ipod/i.test(ua),
	isWechat: /MicroMessenger/i.test(ua),
    
    $: function(s){
        return document.querySelectorAll(s);
    },
    addDomLoaded: function(fn){
    	if(document.addEventListener){
			document.addEventListener('DOMContentLoaded', function(){
				fn();
				document.removeEventListener('DOMContentLoaded');
			}, false);
		}
    }
    
};