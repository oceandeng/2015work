/* 
* @Author: ocean
* @Date:   2015-11-17 12:01:58
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-06 13:17:10
*/

'use strict';

// 验证车牌号
	function checkCarNum(str){
		if(!(/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(str))){
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

// 检验身份证

	function isIdCard(str) {
	    // var patrnOne = /^\d{15}$/;
	    // var patrnTwo = /^\d{17}[\dX]{1}$/;
	    var patten = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	    if(!patten.exec(str)){
	        return false;
	    }
	    return true;
	}