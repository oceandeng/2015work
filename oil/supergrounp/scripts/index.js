$(document).ready(function() {
    function e(e) {
        var a, 
            o, 
            s = e > 20 ? 500 / 25.01 : e;
        
        e > 0 && (a = 0, o = setInterval(function() {
            var t = parseInt(parseFloat(a) + parseFloat(e / s));
            a = t, t >= e ? ($(".page3 .company_num").text(e), clearInterval(o)) : $(".page3 .company_num").text(t)
        }, 50.01))
    }
    var a, 
        o = $(".container"),
        s = parseInt(document.documentElement.clientHeight),
        titPic = parseInt(document.querySelector('#titPic').clientHeight),
        imagePic = parseInt(document.querySelector('#imagePic').clientHeight);

    $("body").css({
        "font-size": 32 * s / 1136 + "px"
    }), 

    a = $(".container .sec"), 
    a.PagesBox({
        pages: "section"
    }), 
    $(".page1").addClass("page1_hover");
    a.on("gopage", function(a, o) {
        if(0 == o){
            $(".page1").addClass("page1_hover");
            $(".arrowup").find('img').attr('src', '../images/arrow-w.png');
        }else{
            $(".page1").removeClass("page1_hover"); 
        }

        if(1 == o){
            $(".page2").addClass("page2_hover");
            $(".arrowup").find('img').attr('src', '../images/arrow.png');
        }else{
            $(".page2").removeClass("page2_hover");
        }

        if(2 == o){
            $(".page3").addClass("page3_hover"), $(".arrowup").hide();
        }else{
            $(".page3").removeClass("page3_hover"), $(".arrowup").show();
        }

    });
});