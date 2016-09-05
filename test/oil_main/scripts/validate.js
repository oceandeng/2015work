/* 
* @Author: ocean
* @Date:   2015-11-17 12:01:58
* @Last Modified by:   ocean
* @Last Modified time: 2015-11-20 09:55:36
*/

'use strict';

// 验证车牌号
	function checkCarNum(str){
		if(!(/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(str))){
	        oTools.alertmess("车牌号输入不合法");
	        return false;
	    };
	}

// 是否为空
	function isNull(str) {
	    if (str == "") {
	    	return true;
		}
	}
// 验证手机
	function checkMobile(str) {
		var patten = /^1\d{10}$/;
		return patten.exec(str);
	}