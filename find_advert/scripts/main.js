/* 
* @Author: ocean
* @Date:   2016-02-24 17:41:21
* @Last Modified by:   ocean
* @Last Modified time: 2016-04-01 10:55:56
*/

'use strict';

// body 高度
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

    var $p2 = $('.page2');

    if($p2.find('.body-bg').height() < $p2.height()){
        $p2.find('.p-t-t').css({
            'position': 'absolute',
            'bottom': 0
        })
    }
});
// 页面data-href跳转事件
$(function(){
    $(document).on(oTools.clickEvent, '*[data-href]', function(){
        var $_this = $(this);
        location.href = $_this.attr('data-href');
    });
});

document.addEventListener('touchmove', function (e){e.preventDefault()}, false);

$(document).ready(function() {
    var a, 
        o = $(".container"),
        s = parseInt(document.documentElement.clientHeight),
        winW = parseInt(document.documentElement.clientWidth);

    a = $(".container .sec"),
    a.PagesBox({
        pages: "section",
        axis: "y",
        showDots: false
    }),

    $(".page1").addClass("page1_hover");

    a.on("gopage", function(a, o) {
        if(0 == o){
            $(".page1").addClass("page1_hover");
            $(".arrow").show();
        }else{
            $(".page1").removeClass("page1_hover");
            $(".arrow").hide();
        }

        if(1 == o){
            $(".page2").addClass("page2_hover");
            $(".arrow").hide();
        }else{
            $(".page2").removeClass("page2_hover");
            $(".arrow").show();
        }
    });

    if(oTools.isIOS){
        $('.p-tel').find('a').each(function(k, v){
            var telNum = $(this).text();
            $(this).attr('href', 'tel:' + telNum);
        });
    }

    if(oTools.isAndroid){
        if(window.daka){
            $('.p-tel').find('a').on(oTools.clickEvent, function(e){
                var telNum = $(this).text();
                // $(this).attr('href', 'tel:' + telNum);
                window.daka.exec('tel', [telNum]);
                // e.preventDefault();
                return false;
            });
        } else {
            $('.p-tel').find('a').each(function(k, v){
                var telNum = $(this).text();
                $(this).attr('href', 'tel:' + telNum);
            });
        }
    }
});