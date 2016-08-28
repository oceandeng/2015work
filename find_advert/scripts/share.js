//分享信息
window.share={
	title : '好专线带车司机火热招募中',
	desc : '好专线带车司机火热招募中',
	icon : getRootPath() + '/expert_ad/images/share-icon.jpg',
	url : getRootPath() + '/expert_ad/index.html'
};

/*得到根目录*/
function getRootPath(){
	var p = location.pathname.split('/'),w='';
	//用来判断url是否有项目名
	(p[1]=='ad-mobile-api') && (w = '/'+p[1]);
	return location.protocol + '//' + location.host + w;
}

// #################以下是微信分享
var _wxConfig={
	debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	appId: '', // 必填，公众号的唯一标识
	timestamp: '', // 必填，生成签名的时间戳
	nonceStr: '', // 必填，生成签名的随机串
	signature: '',// 必填，签名
	jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
};

wx.ready(function(){
	//分享到朋友圈
	wx.onMenuShareTimeline({
	    title: window.share.title, 
	    link: window.share.url, 
	    imgUrl: window.share.icon, 
	    success: function () { 
	    },
	    cancel: function () { 
	    }
	});

	//分享给朋友
	wx.onMenuShareAppMessage({
	    title: window.share.title,
	    desc: window.share.desc,
	    link: window.share.url,
	    imgUrl: window.share.icon,
	    // type: '', // 分享类型,music、video或link，不填默认为link
	    // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () {
	    },
	    cancel: function () {
	    }
	});

	//分享到qq
	wx.onMenuShareQQ({
	    title: window.share.title,
	    desc: window.share.desc,
	    link: window.share.url,
	    imgUrl: window.share.icon,
	    success: function () {
	    },
	    cancel: function () {
	    }
	});

	//分享到qq空间
	wx.onMenuShareQZone({
	    title: window.share.title,
	    desc: window.share.desc,
	    link: window.share.url,
	    imgUrl: window.share.icon,
	    success: function () {
	    },
	    cancel: function () {
	    }
	});

	//分享到腾讯微博
	wx.onMenuShareWeibo({
	    title: window.share.title,
	    desc: window.share.desc,
	    link: window.share.url,
	    imgUrl: window.share.icon,
	    success: function () {
	    },
	    cancel: function () {
	    }
	});
});

//微信签名
function wxSignature(){
	$.ajax({
		type: 'POST',
		url: location.protocol + '//' + location.host + '/hd-mobile-api/hdApi/wxSignature',
		dataType: 'JSON',
		timeout: 6e3,
		data : {'url' : window.location.href},
		success: function(data){
			if (data != null && data != '') {
				var vo = JSON.parse(data);
				_wxConfig.appId = vo.appId;
				_wxConfig.timestamp = vo.timestamp;
				_wxConfig.nonceStr = vo.nonceStr;
				_wxConfig.signature = vo.signature;

				wx.config(_wxConfig);
			}
		}
	});
}
// 微信签名
// wxSignature();
//#################以上是微信分享