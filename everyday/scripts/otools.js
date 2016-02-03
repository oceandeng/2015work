/* 
* @Author: ocean
* @Date:   2015-07-13 15:53:19
* @Last Modified by:   ocean
* @Last Modified time: 2015-07-13 16:03:19
*/

'use strict';


var ua = window.navigator.userAgent.toLowerCase();

var otools = {
	isAndroid: /android/i.test(ua),
	isIOS: /iphone|ipad|ipod/i.test(ua),
	isWechat: /MicroMessenger/i.test(ua)
}

function alertmess(str){
    var html = '<div class="mess">' + str + '</div>',
        fullW = $(window).width(),
        fullH = $(window).height(),
        twidth = parseInt(fullW * 0.6);

    if($('.mess').size() < 1){
        $('body').append(html);

        $('.mess').css({
            'width' : twidth,
            'min-height': '30px',
            'line-height' : '30px',
            'font-size': '16px',
            'marginLeft' : parseInt(-twidth/2-10),
            'background' : '#333',
            'color' : '#fff',
            'z-index' : 99,
            'position' : 'fixed',
            'left' : '50%',
            'top' : '40%',
            'border-radius' : '5px',
            'text-align' : 'center',
            'padding' : '5px 10px'
        }).show();
    
        setTimeout(function(){
            $('.mess').remove();
        }, 1500);
    }
}