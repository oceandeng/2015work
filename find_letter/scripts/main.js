// body 高度
var sW = 0, sH = 0, dW = 0, dH = 0, cH = 0;
$(window).load(function(){
	sW = $(window).width();
	sH = $(window).height();
	dW = document.body.clientWidth;

    // 首页动画
    if($('.index-word').size() > 0){
        var $iWord = $('.index-word'),
            iWordH = $('.index-word-img')[0].offsetHeight;

        $iWord.css({'height': 0}).animate({
            height: iWordH
        }, {
            duration: 10000
        });
    }

    var $replyCon = $('.reply-con'),
        $replyH = $('.reply-h'),
        $writeH = $('.write-h'),
        $writeCon = $('.write-con');

    if($replyH.size() > 0){
        $replyH.css({
            height: $replyCon.height()
        })
    }

    if($writeH.size() > 0){
        $writeH.css({
            height: $writeCon.height()
        })
    }

    dH = $('body').height();

    if(dH < sH){
        $('body').css({
            height: sH
        });
    }
});
// 页面data-href跳转事件
$(function(){
    $(document).on(oTools.clickEvent, '*[data-href]', function(){
        var $_this = $(this);
        location.href = $_this.attr('data-href');
    });
});

// 发送信息成功弹层
function sendSuccess(){
    var sendSuccess = new Dialog({
        'id': 'sendSuccess',
        'type': 'popup',
        'lock':true,
        'width':'80%',
        'closeButton': false,
        'animation':'animated bounceInDown',
        'contentStyle': {
            'background': 'none'
        },
        'onReady': function(){},
        'onClose': function() {
            // 关闭回调
            shareFn();
        }
    });

    $(document).on(oTools.clickEvent, '#shartBtn', function(e){
        sendSuccess.close();
    });
}

// 微信分享弹层
function shareFn(){
    if(oTools.isWechat){
        $.myPlugin.popup({
            screenW : $(window).width(),
            screenH : $(window).height(),
            path : '../images/share-info.png'
        });
    }else{
        oTools.alertmess('打开浏览器菜单，点击分享按钮分享给朋友');
    }
}