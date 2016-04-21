! function() {
    var a = { getcookie: function(a) {
            var b = document.cookie.indexOf(a),
                c = document.cookie.indexOf(";", b);
            return -1 == b ? "" : unescape(document.cookie.substring(b + a.length + 1, c > b ? c : document.cookie.length)) }, setcookie: function(a, b, c, d, e, f) {
            var g = new Date;
            g.setTime(g.getTime() + c), document.cookie = escape(a) + "=" + escape(b) + (g ? "; expires=" + g.toGMTString() : "") + (d ? "; path=" + d : "; path=/") + (e ? "; domain=" + e : "") + (f ? "; secure" : "") } };
    window.cookieFn = a }(), $(function() {
    function a() { b = $(window).width(), c = $(window).height();
        var a = $(".top-header-bg").find("img"),
            d = $(".top-header"),
            e = a.width(),
            f = a.height(),
            g = e / f,
            h = $(".top-header-content"),
            i = h.height() + parseInt(h.css("padding-top")) + parseInt(h.css("padding-bottom")),
            j = $(".logo").height();
        630 > c && $(".t-h-c-l-tit").css({ marginTop: j }), d.css({ height: c - $("header").height() }), i = d.height(), a.css({ width: b, height: b / g }), a.height() < i && a.css({ height: i, width: parseInt(g * i) }), a.css(b < a.width() ? { marginLeft: parseInt((b - parseInt(g * a.height())) / 2) } : { marginLeft: 0 });
        var k = $(".top-header-content").height();
        $(".top-header-content").css({ paddingTop: (i - k + 60) / 2 }) }
    var b = $(window).width(),
        c = $(window).height(),
        d = { timeoutId: null, performProcessing: function() { a() }, process: function() { clearTimeout(this.timeoutId);
                var a = this;
                this.timeoutId = setTimeout(function() { a.performProcessing() }, 100) } };
    $(window).load(function() { a() }), $(window).resize(function() { d.process() }), $("#iTipsC").on("click", function() { $("#firTips").fadeOut() }) }), $(function() {
    var a = document.getElementById("gotop");
    if (!a) return !1;
    var b = 0,
        c = $("#gotop");
    window.onscroll = function() { b = document.body.scrollTop || document.documentElement.scrollTop, 300 >= b ? c.hide() : c.show() }, c.click(function(a) { $("body,html").animate({ scrollTop: 0 }, 800), a.preventDefault() }) }), $(window).load(function() {
    function a(a) {
        var b = $(a);
        b.css({ marginTop: (750 - b.height()) / 2 }) }
    var b = !1,
        c = !1;
    navigator.userAgent.indexOf("MSIE") > 0 && ("Microsoft Internet Explorer" == navigator.appName && "7." == navigator.appVersion.match(/7./i) && (b = !0), "Microsoft Internet Explorer" == navigator.appName && "8." == navigator.appVersion.match(/8./i) && (c = !0)), $(".m-c-img").each(function() { a.call(this, this) }), $(".m-c-tit").each(function() { a.call(this, this) }), $("#mainWrap").load("include/content.html", function() { $(".async-loading").remove(), $("img").load(function() { $(".m-c-img").each(function() { a.call(this, this) }), $(".m-c-tit").each(function() { a.call(this, this) }), $(".p-s-con").find("a").on("mouseenter", function() {
                var a = $(this),
                    b = a.find("img"),
                    c = b.attr("src"); /and/.exec(c) ? b.attr("src", gConfig.imagePath + "images/dakaweb/and-icon-a.png") : /ios/.exec(c) && b.attr("src", gConfig.imagePath + "images/dakaweb/ios-icon-a.png") }), $(".p-s-con").find("a").on("mouseleave", function() {
                var a = $(this),
                    b = a.find("img"),
                    c = b.attr("src"); /and/.exec(c) ? b.attr("src", gConfig.imagePath + "images/dakaweb/and-icon-n.png") : /ios/.exec(c) && b.attr("src", gConfig.imagePath + "images/dakaweb/ios-icon-n.png") }) }), dynamicInster() }) });