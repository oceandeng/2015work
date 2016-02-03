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
        if (0 == o ? $(".page1").addClass("page1_hover") : $(".page1").removeClass("page1_hover"), 
            2 == o ? $(".page2").addClass("page2_hover") : $(".page2").removeClass("page2_hover"), 
            3 == o) {
            var s = $CONFIG.offerMonthCount;
            setTimeout(function() {
                e(s)
            }, 500), 
            $(".page3").addClass("page3_hover")
        } else {
            $(".page3").find(".company_num").text("0"), $(".page3").removeClass("page3_hover");
             4 == o ? ($(".page4").addClass("page4_hover"), $(".arrowup").hide()) : ($(".arrowup").show(), $(".page4").removeClass("page4_hover"))
        }
    });
});