var dataForWeixin = {
        title: "",
        link: location.href,
        MsgImg: '',
        desc: ""
    },
    shareData = {
        title: dataForWeixin.title,
        link: dataForWeixin.link,
        img_url: dataForWeixin.MsgImg,
        desc: dataForWeixin.desc
    };

wx.config({
    appId: jssdk.appId,
    nonceStr: jssdk.nonceStr,
    signature: jssdk.signature,
    timestamp: jssdk.timestamp,
    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
})

wx.ready(function() {
    
    wx.onMenuShareAppMessage({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.img_url,
        trigger: function() {},
        success: function() {

        },
        cancel: function() {},
        fail: function() {}
    });

    wx.onMenuShareTimeline({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.img_url,
        trigger: function() {},
        success: function() {
            
        },
        cancel: function() {},
        fail: function() {}
    })
});
