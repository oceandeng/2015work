/* 
* @Author: ocean
* @Date:   2015-08-17 11:24:01
* @Last Modified by:   ocean
* @Last Modified time: 2015-08-20 15:26:45
*/

'use strict';
/* 
是否为空
*/
function isNull(str) {
    if (str == "") {
    	return true;
	}
}
/*
验证中文姓名 (汉字和数字1-10位)
*/
function isCnName(str) {
    var patrn = /^[0-9\u4e00-\u9fa5]{1,10}$/;
    if(!patrn.exec(str))
    {
        return false;
    }
    return true;
}
/*
检查输入手机号码是否正确
*/
function checkMobile(str) {
	var patten = /^1\d{10}$/;
	return patten.exec(str);
}
/*
检验身份证
*/
function isIdCard(str) {
    // var patrnOne = /^\d{15}$/;
    // var patrnTwo = /^\d{17}[\dX]{1}$/;
    var patten = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if(!patten.exec(str)){
        return false;
    }
    return true;
}

/*
验证主逻辑
*/
$(function(){

	var flag = false;
	$('#submitBtn').on('tap', submitfn);

	function submitfn(){
		var uNameVal = oTools.trim($('#name').val()),
			uMobileVal = oTools.trim($('#mobile').val()),
			uCardVal = oTools.trim($('#idCard').val().toUpperCase());
		var formObj = {
			'uName': uNameVal,
			'uMobile': uMobileVal,
			'uCard': uCardVal
		};

		if(!flag){
			validate(formObj, ajaxfn);
		}
	}

	function validate(obj, fn){
		// 验证姓名
		if(isNull(obj.uName)){
			oTools.alertmess('请填写姓名！');
			return;
		}else if(obj.uName.length > 50){
			oTools.alertmess('名字过长！限50字符!');
			return;
		}
		// else if(!isCnName(obj.uName)){
		// 	oTools.alertmess('请输入汉字和数字，限10字符!');
		// 	return;
		// }
		// 验证手机号
		if(isNull(obj.uMobile)){
			oTools.alertmess('请填写手机号！');
			return;
		}else if(!checkMobile(obj.uMobile)){
			oTools.alertmess('手机号有误！');
			return;
		}
		// 验证身份证
		if(isNull(obj.uCard)){
			oTools.alertmess('请填写身份证号！');
			return;
		}else if(!isIdCard(obj.uCard)){
			oTools.alertmess('身份证输入有误！');
			return;
		}
		// 通过验证
		flag = true;
		fn && fn(obj);
	}

	function ajaxfn(formObj){
		$.ajax({
			url: gConfig.ajaxUrl,
			type: 'POST',
			data: formObj,
			dataType: 'json',
			beforeSend: function(){
				if($('#canvas').size() < 1){
					showLoading();
				}
				$('#canvas').show();
			},
			success: function(res){
				$('#canvas').hide();
	            if(res.redirect == 1){
	              location.href = res.url;
	            }else{
	              oTools.alertmess(res.msg);
	            }
			},
			error: function(){
				$('#canvas').hide();
				flag = false;
			},
			complete: function(){
				$('#canvas').hide();
				flag = false;
			}
		})
	}

	// loading
	function showLoading(){
		$('<canvas id="canvas"></canvas>').appendTo('body');
		$('#canvas').css({
			'border-radius':'5px',
			'background':'rgba(0,0,0,0.8)',
			'z-index': 999,
			'position': 'fixed',
			'top': '20%',
			'left': '50%',
			'margin-left': -40
		});
		loading({
			"id": "canvas",
			"width": 5,
			"height": 20
		});
	}
});