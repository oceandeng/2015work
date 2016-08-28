'use strict'
document.addEventListener('touchmove', function (e){e.preventDefault()}, false);

$(document).ready(function() {
    var a, 
        o = $(".container"),
        s = parseInt(document.documentElement.clientHeight),
        winW = parseInt(document.documentElement.clientWidth);

    var pImgO = $('.page1').find('.body-bg').find('img')[0];
    var image = new Image();

    image.onload = function(){
        if(winW < 360 && s <= 533){
            pImgO.src = image.src;
        }
    };
    image.src = gConfig.path + 'images/index-p-one-sbg.jpg';

    a = $(".container .sec"),
    a.PagesBox({
        pages: "section",
        axis: "x",
        showDots: true
    }),

    $(".page1").addClass("page1_hover");
    $(".arrow-left").hide();

    a.on("gopage", function(a, o) {
        $(".dotsBox").find('span').removeClass('active');

        if(0 == o){
            $(".page1").addClass("page1_hover");
            $(".arrow-left").hide();
            $(".dotsBox").find('span').eq(o).addClass('active');
        }else{
            $(".page1").removeClass("page1_hover");
        }

        if(1 == o){
            $(".page2").addClass("page2_hover");
            $(".arrow-left").show();
            $(".dotsBox").find('span').eq(o).addClass('active');
            $('.l-t').addClass('animated bounceInLeft');
            $('.r-b').addClass('animated bounceInRight');
        }else{
            $(".page2").removeClass("page2_hover");
            $('.l-t').removeClass('animated bounceInLeft');
            $('.r-b').removeClass('animated bounceInRight');
        }

        if(2 == o){
            $(".page3").addClass("page3_hover");
            $(".dotsBox").find('span').eq(o).addClass('active');
            $(".arrow-right").show();
            $('.content').addClass('animated rollIn');
        }else{
            $(".page3").removeClass("page3_hover");
            $('.content').removeClass('animated rollIn');
        }

        if(3 == o){
            $(".page4").addClass("page4_hover");
            $(".arrow-right").hide();
            $(".dotsBox").find('span').eq(o).addClass('active');
            $('.QRcode').addClass('animated bounceIn');
        }else{
            $(".page4").removeClass("page4_hover");
            $('.QRcode').removeClass('animated bounceIn');
        }
    });

// 分享按钮
    $('#share').on('tap', function(){
        if(oTools.isWechat){
            $.myPlugin.popup({
                screenW: winW,
                screenH: s,
                path: gConfig.path + 'images/share-info.png'
            });
        }else{
            oTools.alertmess('打开浏览器菜单， 点击分享按钮分享给朋友');
        }
    });
});