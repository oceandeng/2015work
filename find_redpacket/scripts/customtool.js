/* 
* @Author: ocean
* @Date:   2015-05-15 14:53:50
* @Last Modified by:   ocean
* @Last Modified time: 2015-12-17 13:23:02
*/
'use strict'
var ua = navigator.userAgent.toLowerCase();

var oTools = {
    isAndroid: /android/i.test(ua),
    isIOS: /iphone|ipad|ipod/i.test(ua),
    isWechat: /MicroMessenger/i.test(ua),
    clickEvent: "ontouchstart" in document.documentElement ? "tap" : "click",
    alertmess: function(str, time){
        var html = '<div class="mess">' + str + '</div>',
            fullW = $(window).width(),
            fullH = $(window).height(),
            twidth = parseInt(fullW * 0.8);

        if($('.mess').size() < 1){
            $('body').append(html);

            $('.mess').css({
                'width' : twidth,
                'min-height': '30px',
                'line-height' : '30px',
                'font-size': '16px',
                'marginLeft' : parseInt(-twidth/2-10),
                'background' : 'rgba(0, 0, 0, .8)',
                'color' : '#fff',
                'z-index' : 99999,
                'position' : 'fixed',
                'left' : '50%',
                'top' : '40%',
                'border-radius' : '5px',
                'text-align' : 'center',
                'padding' : '5px 10px'
            }).fadeIn();

            setTimeout(function(){
                $('.mess').fadeOut(function(){
                    $('.mess').remove();
                });
            }, time || 2000);
        }
    },
    trim: function(str){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    animateEnd: function($ele, fn){
        var events = ["animationend", "webkitAnimationEnd", "mozAnimationEnd", "MSAnimationEnd", "oanimationend"];

        for(var i = 0; i < events.length; i ++){
            $ele.on(events[i], function(){
                fn && fn();
            })
        }
    },
    transitionEnd: function($ele, fn){
        var events = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "otransitionend", "transitionend"];

        for(var i = 0; i < events.length; i ++){
            $ele.on(events[i], function(){
                fn && fn();
            });
        }
    }
}