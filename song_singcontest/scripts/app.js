'use strict'
document.addEventListener('touchmove', function (e){e.preventDefault()}, false);
document.addEventListener('touchstart', function (e){e.preventDefault()}, false);

$(document).ready(function() {
    var a,
        o = $(".container"),
        s = parseInt(document.documentElement.clientHeight),
        winW = parseInt(document.documentElement.clientWidth);

    if(winW < 360 && s <= 533){
        var pImgO = $('.page1').find('.body-bg').find('img');
        pImgO.attr('src', gConfig.path + 'images/index-p-one-sbg.jpg');
    }

    a = $(".container .sec"),
    a.PagesBox({
        pages: "section",
        axis: "x"
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
        }else{
            $(".page4").removeClass("page4_hover");
        }
    });

	$('div[data-href]').each(function(i, v){
		var $_this = $(this);
		var href = $(this).attr('data-href');

		$_this.on('tap', function(){
			location.href = href;
		});
	});

});