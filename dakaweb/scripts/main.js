(function(){
	var cookieFn = {
		getcookie: function(name) {
		    var cookie_start = document.cookie.indexOf(name);
		    var cookie_end = document.cookie.indexOf(";", cookie_start);
		    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
		},
		setcookie: function(cookieName, cookieValue, seconds, path, domain, secure) {
		    var expires = new Date();
		    expires.setTime(expires.getTime() + seconds);
		    document.cookie = escape(cookieName) + '=' + escape(cookieValue)
		            + (expires ? '; expires=' + expires.toGMTString() : '')
		            + (path ? '; path=' + path : '; path=/')
		            + (domain ? '; domain=' + domain : '')
		            + (secure ? '; secure' : '');
		}
	}
	
	window.cookieFn = cookieFn;
})();
// 调用
$(function(){
	var winW = $(window).width(),
		winH = $(window).height();
	function topBg(){
		winW = $(window).width();
		winH = $(window).height();

		var $topBg = $('.top-header-bg').find('img'),
		topBgW = $topBg.width(),
		topBgH = $topBg.height(),
		ratio = topBgW / topBgH;
		var $topHeaderC = $('.top-header-content'),
			topHeaderCH = $topHeaderC.height() + parseInt($topHeaderC.css('padding-top')) + parseInt($topHeaderC.css('padding-bottom'));

		$('.top-header').css({
			height: topHeaderCH
		});


		$topBg.css({
			width: winW,
			height: winW / ratio
		});

		if($topBg.height() < topHeaderCH){
			$topBg.css({
				height: topHeaderCH,
				width: parseInt(ratio * topHeaderCH)
				// marginLeft: ($topBg.width() - parseInt(ratio * topHeaderCH)) / 2
			});
		}

		if(winW < $topBg.width()){
			$topBg.css({
				marginLeft: parseInt((winW - parseInt(ratio * $topBg.height())) / 2)
			});
		}else{
			$topBg.css({
				marginLeft: 0
			});
		}
	}

		// 事件截流
	var processor = {
		timeoutId: null,

		// 实际进行处理的方法
		performProcessing: function(){
			// 实际执行的代码
			topBg();
		},
		// 初始处理调用的方法
		process: function(){
			clearTimeout(this.timeoutId);

			var that = this;
			this.timeoutId = setTimeout(function(){
				that.performProcessing();
			}, 100);
		}
	}

	$(window).load(function(){
		topBg();
	});

	$(window).resize(function(){
		processor.process();
	});

// tips 关闭按钮
	$('#iTipsC').on('click', function(){
		$('#firTips').fadeOut();
	});

});

$(function(){
//gotop
	var obj=document.getElementById("gotop");
	if(!obj){return false;}
	var x=0;
	var fe=$("#gotop");
	window.onscroll=function(){
		x=(document.body.scrollTop||document.documentElement.scrollTop);
		if(x<=300){fe.hide()}else{fe.show()};
	};
	fe.click(function(){$('body,html').animate({scrollTop:0},800);})
});

$(window).load(function(){
	// fir-tips 自动关闭
	// $('#firTips').show().addClass('animated bounceInLeft');
	// setTimeout(function(){
	// 	$('#firTips').fadeOut();
	// }, 10000);


	var isIE7 = false,
		isIE8 = false;

	if(navigator.userAgent.indexOf("MSIE")>0){   
		if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i)=="7."){  
			isIE7 = true;
		}   
		if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8."){//这里是重点，你懂的
			isIE8 = true;
		}   
	} 

	function loadJS(path){
		if(!path || path.length === 0){
			throw new Error('文件路径不能为空！');
		}
		var body = document.getElementsByTagName('body')[0];
		var script = document.createElement('script');
		script.src = path;
		script.type = 'text/javascript';
		body.appendChild(script);
	}

	function dynamic(_this){
		var $_this = $(_this);

		$_this.css({
			marginTop: (750 - $_this.height()) / 2
		})
	}
	$('.m-c-img').each(function(){dynamic.call(this, this)});
	$('.m-c-tit').each(function(){dynamic.call(this, this)});
	if(isIE7){
		loadJS('scripts/ie8.js');
	}

	$('#mainWrap').load('include/content.html', function(){
		var num = 0;
		$('.async-loading').remove();
		$('img').load(function(){
			$('.m-c-img').each(function(){dynamic.call(this, this)});
			$('.m-c-tit').each(function(){dynamic.call(this, this)});
			if(!isIE7 && !isIE8 && num < 1){
				loadJS('scripts/scrollreveal.js');
				num ++;
			}
			// ios Android 下载按钮 鼠标移入移出效果
			$('.p-s-con').find('a').on('mouseenter', function(){
				var $_this = $(this);
				var $img = $_this.find('img');
				var iSrc = $img.attr('src');

				if(/and/.exec(iSrc)){
					$img.attr('src', gConfig.imagePath + 'images/and-icon-a.png');
				}else if(/ios/.exec(iSrc)){
					$img.attr('src', gConfig.imagePath + 'images/ios-icon-a.png');
				}else{

				}
			});
			$('.p-s-con').find('a').on('mouseleave', function(){
				var $_this = $(this);
				var $img = $_this.find('img');
				var iSrc = $img.attr('src');

				if(/and/.exec(iSrc)){
					$img.attr('src', gConfig.imagePath + 'images/and-icon-n.png');
				}else if(/ios/.exec(iSrc)){
					$img.attr('src', gConfig.imagePath + 'images/ios-icon-n.png');
				}else{

				}
			});
		});
	});
});