/* 
* @Author: ocean
* @Date:   2015-10-13 11:55:34
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-12 10:37:59
*/

'use strict';

var sW = 0, sH = 0, dW = 0, dH = 0, cH = 0;

$(window).load(function(){
	sW = $(window).width();
	sH = $(window).height();
	dW = document.body.clientWidth;
	dH = $('body').height();

    if(dH < sH){
		$('body').css({
			height: sH
		});
	}

});

/****************************************************
//- 文字滚动信息
//- li低于5条全部显示  5条滚动显示
****************************************************/
$(function(){
    var $goodList = $('#goodList');
    var glSize = $goodList.find('li').size();

    // if(glSize < 5){
    //     $goodList.parents('.good-news').css({
    //         'overflow': 'visible',
    //         'height': 'auto'
    //     })
    // }else{
    //     $('#goodList').scrollWord({
    //         speed: 2000
    //     });
    // }
    if($goodList.size() != 0){
	    $goodList.scrollWord({
	        speed: 2000
	    });
    }
});
// 页面data-href跳转事件
$(function(){

    $(document).on(oTools.clickEvent, '*[data-href]', function(){
        var $_this = $(this);

        location.href = $_this.attr('data-href');
    });
});

/**
 * @翻牌效果
 * @param {obj._this}        this的Zepto对象
 * @param {obj.pTit}         中奖文字
 * @param {obj.prizetype}    几等奖
 */
function toogleRotate(obj){

	var	$f = obj._this.find('.front'),
		$b = obj._this.find('.back');

	if(obj.prizetype){

        switch (obj.prizetype){
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }

        obj._this.data('prized', true);

        obj.img && $b.find('img').attr('src', obj.img.src);
        obj.url && obj._this.parent().data('href', obj.url);
        
	}

	var patten = /\d+/g;
	var fAngleStr = $f.get(0).style.webkitTransform;
	var bAngleStr = $b.get(0).style.webkitTransform;

	if(!!fAngleStr){
		var fAngle = parseInt(fAngleStr.match(patten)[0]);
		var bAngle = parseInt(bAngleStr.match(patten)[0]);
	}

	if(fAngle%180 == 0 && !!fAngle){
		$f.get(0).style.webkitTransform = 'rotateY(' + (fAngle - fAngle%180 + 180) + 'deg)';
		$b.get(0).style.webkitTransform = 'rotateY(' + (bAngle - bAngle%180 + 180) + 'deg)';
	}else{
		$f.get(0).style.webkitTransform = 'rotateY(' + 180 + 'deg)';
		$b.get(0).style.webkitTransform = 'rotateY(' + 0 + 'deg)';
	}
}

/**
 * @open other
 * @param {_this}  this的Zepto对象
 */
function openOther(_this){
    var $siblingsEle = _this.parent().siblings().find('.flipper');

    $siblingsEle.each(function(k, v){
        var $_this = $(this);
        var sPrized = $_this.data('prized');

        if(!sPrized){
            toogleRotate({
                '_this': $_this
            });
        }
    });
}

/**
 * @关闭其他按钮点击事件
 * @param {_this}  this的Zepto对象
 */
function shutBtn(obj){
    var $siblingsEle = obj._this.parent().siblings().find('.flipper');

    $siblingsEle.each(function(k, v){
        var $_this = $(this);

        if(!$_this.data('opend') && obj.img){
            $_this.find('.back').find('img').attr('src', obj.img);
        }

    });

    if(obj.open){
        openOther(obj._this);
    }

    $siblingsEle.each(function(k, v){
        var $_this = $(this);
        var sPrized = $_this.data('prized');

        if(!sPrized){
            $_this.data('prized', 'true');
        }
        if(!sPrized && obj.url){
            $_this.data('href', obj.url);
        }
    });
}

/**
 * @中奖弹层
 * @param {obj.mess}  显示信息
 * @param {obj.url}   跳转链接
 * @param {obj.fn}    回调函数
 */
function awardDialog(obj){
    var closeImg = gConfig.imgPath + '/images/close.png';

    var winned = new Dialog({
        'id': 'prizePopup',
        'type': 'popup',
        'lock':true,
        'width':'100%',
        'height': 'auto',
        'top': '10%',
        'closeImg': closeImg,
        'closeBtnW': '30px',
        'closeBtnH': '30px',
        'closeTop': '0',
        'closeRight': '50px',
        'animation':'animated bounceInDown',
        'showButtons': true,
        'submitButton': obj.btnTxt,
        'subStyle': {
        	'border': 'none',
            'display': 'block',
        	'width': '60%',
            'margin': '-80px auto 0 auto',
            'position': 'relative',
            'z-index': 9,
        	'background': '#ffca00',
            'height': '50px',
        	'border-radius': '5px',
        	'color': '#d11f02',
            'font-size': '20px'
        },
        'cancelButton': false,
        'contentStyle': {
            'background': 'none'
        },
        'onReady': function(){

        },
        'onSubmit': function(){
            if(obj.close){
                winned.close();
                return;
            }
            if(obj.prizetype != 4){
        	   location.href = obj.url;
            }else{
                winned.close();
            }
        	return false;
        },
        'onClose': function() {
            obj.fn && obj.fn();
        }
    });
}

/**
 * @没中奖弹层
 * @param {obj.mess}  显示信息
 * @param {obj.url}   跳转链接
 * @param {obj.fn}    回调函数
 */
function noAwardDialog(obj){
    var closeImg = gConfig.imgPath + '/images/close.png';

    var winned = new Dialog({
        'id': 'noPrizePopup',
        'type': 'popup',
        'lock':true,
        'width':'70%',
        'height': 'auto',
        'top': '30%',
        'closeImg': closeImg,
        'closeBtnW': '30px',
        'closeBtnH': '30px',
        'closeTop': '-50px',
        'closeRight': '0',
        'animation':'animated bounceInDown',
        'showButtons': true,
        'submitButton': obj.btnTxt,
        'subStyle': {
            'border': 'none',
            'display': 'block',
            'width': '90%',
            'margin': '-80px auto 0 auto',
            'position': 'relative',
            'z-index': 9,
            'background': '#ffca00',
            'height': '50px',
            'border-radius': '5px',
            'color': '#d11f02',
            'font-size': '20px'
        },
        'cancelButton': false,
        'contentStyle': {
            'background': 'none'
        },
        'onReady': function(){},
        'onSubmit': function(){
            if(obj.close){
                winned.close();
                return;
            }
            if(obj.prizetype != 4){
               location.href = obj.url;
            }else{
                winned.close();
            }
            return false;
        },
        'onClose': function() {
            obj.fn && obj.fn();
        }
    });
}

/**
 * @普通弹层
 * @param {obj.mess}  显示信息
 * @param {obj.url}   跳转链接
 * @param {obj.fn}    回调函数
 */
function tipsDialog(obj){
    var closeImg = gConfig.imgPath + '/images/close-s.png';

    var tips = new Dialog({
        'msg': obj.mess,
        'type': 'alert',
        'lock':true,
        'width':'70%',
        'height': 'auto',
        'top': '40%',
        'closeImg': closeImg,
        'closeBtnW': '20px',
        'closeBtnH': '20px',
        'closeTop': '10px',
        'closeRight': '10px',
        'animation':'animated bounceInDown',
        'showButtons': true,
        'submitButton': obj.btnTxt,
        'bConStyle': {
            'padding': '40px 10px 20px 10px',
            'font-size': '16px'
        },
        'subStyle': {
            'border': 'none',
            'display': 'block',
            'width': '100%',
            'margin': '0 auto',
            'position': 'relative',
            'z-index': 9,
            'background': '#de3120',
            'height': '50px',
            'border': '2px solid #b92314',
            'border-radius': '5px',
            'color': '#fff',
            'font-size': '20px'
        },
        'cancelButton': false,
        'contentStyle': {
            'background': '#fff',
            'border-radius': '5px'
        },
        'onReady': function(){

        },
        'onSubmit': function(){
            if(obj.close){
                tips.close();
                return;
            }
            if(obj.prizetype != 4){
               location.href = obj.url;
            }else{
                tips.close();
            }
            return false;
        },
        'onClose': function() {
            obj.fn && obj.fn();
        }
    });
}

/**
 * @添加手机号弹层
 * @param {obj.xx}  xxx
 */
function inviteDialog(fn, btnTxt){
    var closeImg = gConfig.imgPath + '/images/close-s.png';

    var invitePhone = new Dialog({
        'type': 'input',
        'width': '80%',
        'showButtons': true,
        'submitButton': btnTxt || '确定',
        'cancelButton': false,
        'bConStyle': {
            'padding': '50px 10px 20px 10px',
            'font-size': '16px'
        },
        'footStyle': {

        },
        'bConStyle': {
            'padding': '50px 10px 20px 10px'
        },
        'iStyle': {
            'width': '90%',
            'height': '50px',
            'line-height': '50px',
            'padding': '0 2%',
            'border-radius': '5px',
            'border': '1px solid #ccc',
            'text-align': 'center',
            'font-size': '16px'
        },
        'subStyle': {
            'border': 'none',
            'display': 'block',
            'width': '98%',
            'margin': '0 auto',
            'position': 'relative',
            'z-index': 9,
            'background': '#de3120',
            'height': '50px',
            'border': '2px solid #b92314',
            'border-radius': '5px',
            'color': '#fff',
            'font-size': '20px'
        },
        'closeImg': closeImg,
        'closeBtnW': '20px',
        'closeBtnH': '20px',
        'closeTop': '10px',
        'closeRight': '10px',
        'lock': true,
        'lockColor': '#212936',
        'animation':'animated bounceInDown',
        'contentStyle': {
            'background': 'rgba(242, 242, 242, 1)',
            'color': '#fff',
            'margin': '0 auto',
            'min-height': '60px',
            'border-radius': '5px',
            'box-shadow': '1px 1px 5px #ccc;',
            'z-index': 999,
        },
        'onSubmit': function(){
            return fn && fn();
        }
    });
}


// function rotate(_this){
// 	var	$f = _this.find('.front'),
// 		$b = _this.find('.back');

// 	var patten = /\d+/g;
// 	var fAngleStr = $f.get(0).style.webkitTransform;
// 	var bAngleStr = $b.get(0).style.webkitTransform;

// 	if(!!fAngleStr){
// 		var fAngle = parseInt(fAngleStr.match(patten)[0]);
// 		var bAngle = parseInt(bAngleStr.match(patten)[0]);
// 	}

// 	if(fAngle%180 == 0 && !!fAngle){
// 		$f.get(0).style.webkitTransform = 'rotateY(' + (fAngle - fAngle%180 + 180) + 'deg)';
// 		$b.get(0).style.webkitTransform = 'rotateY(' + (bAngle - bAngle%180 + 180) + 'deg)';
// 	}else{
// 		$f.get(0).style.webkitTransform = 'rotateY(' + 180 + 'deg)';
// 		$b.get(0).style.webkitTransform = 'rotateY(' + 0 + 'deg)';
// 	}
// }