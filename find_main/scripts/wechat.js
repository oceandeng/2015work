wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: jssdk.appId, // 必填，公众号的唯一标识
    timestamp: jssdk.timestamp, // 必填，生成签名的时间戳
    nonceStr: jssdk.noncestr, // 必填，生成签名的随机串
    signature: jssdk.signature,// 必填，签名，见附录1
    jsApiList: [
        'onMenuShareTimeline',//分享到朋友圈
        'onMenuShareAppMessage',//分享给朋友
        'onMenuShareQQ',//分享到QQ
        'onMenuShareWeibo'//分享到腾讯微博
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
var sharedata = {
    title:'[title]',
    desc: '[desc]',
    link:'[link]',
    imgUrl:'[imgurl]'
};
wx.ready(function(){
    wx.onMenuShareTimeline({
        title: sharedata.desc, // 分享标题
        link: sharedata.link, // 分享链接
        imgUrl: sharedata.imgUrl,
        success: function () {
            // 用户确认分享后执行的回调函数
            //alert('分享成功');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //alert('分享失败');
        }
    });
    wx.onMenuShareAppMessage({
        title: sharedata.title, // 分享标题
        desc: sharedata.desc, // 分享描述
        link: sharedata.link, // 分享链接
        imgUrl: sharedata.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            //alert('分享成功');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //alert('分享失败');
        }
    });
    wx.onMenuShareQQ({
        title: sharedata.title, // 分享标题
        desc: sharedata.desc, // 分享描述
        link: sharedata.link, // 分享链接
        imgUrl: sharedata.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            //alert('分享成功');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //alert('分享失败');
        }
    });
    wx.onMenuShareWeibo({
        title: sharedata.title, // 分享标题
        desc: sharedata.desc, // 分享描述
        link: sharedata.link, // 分享链接
        imgUrl: sharedata.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            //alert('分享成功');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //alert('分享失败');
        }
    });
});