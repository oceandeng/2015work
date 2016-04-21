
/****************************************************
// >> 填手机号兑换
****************************************************/
function exchange(popup){
        var btn = $(this);
        var mobile = $("#mobile").val();
        if (mobile == '') {
            oTools.alertmess("请输入手机号码");
            return
        }
        var regu = /^[1][0-9]{10}$/;
        var re = new RegExp(regu);

        if (!re.test(mobile)) {
            oTools.alertmess("请输入正确手机号码");
            return
        }

        var submitData = {
            mobile: mobile,
            action: "setTel"
        };
        $.post('index.php?ac=activityuser', submitData, function(data) {
            if (data.success == true) {
                oTools.alertmess("提交成功，谢谢您的参与");
                // 页面跳转
                window.location.href = gConfig.receivedURL;
                // 关闭获奖弹层
                // popup.close();
                return
            } else {

            }
        }, "json").error(function(){
            
        });
}

// 中奖后弹窗
function winned(prize){
    var closeImg = gConfig.imgPath + '/images/close.png';
    var winned = new Dialog({
        'id': 'winning',
        'type': 'popup',
        'lock':true,
        'lockOpacity': '85',
        // 'lockClose': false,
        'width':'80%',
        'top': '20%',
        'closeButton': false,
        // 'closeImg': closeImg,
        // 'closeTop': '-20px',
        // 'closeRight': '-20px',
        'animation':'animated bounceInDown',
        'contentStyle': {
            'background': 'none'
        },
        'onReady': function(){

        },
        'onClose': function() {
            // 关闭回调
            // alert('close popup');
        }
    });
}

// 中奖后弹窗
function losted(){
    var losted = new Dialog({
        'id': 'losted',
        'type': 'popup',
        'lock':true,
        'lockOpacity': '85',
        'top': '10px',
        // 'lockClose': false,
        'width':'80%',
        'closeButton': false,
        // 'closeImg': closeImg,
        // 'closeTop': '-20px',
        // 'closeRight': '-20px',
        'animation':'animated bounceInDown',
        'contentStyle': {
            'background': 'none'
        },
        'onReady': function(){

        },
        'onClose': function() {
            // 关闭回调
            // alert('close popup');
        }
    });
}

// 提示下载APP弹窗
function downloadApp(){
    var closeImg = gConfig.imgPath + '/images/close.png';
    var download = new Dialog({
        'id': 'downloadApp',
        'type': 'popup',
        'lock':true,
        'width':'80%',
        'height': 'auto',
        'closeImg': closeImg,
        'closeTop': '-20px',
        'closeRight': '-20px',
        'animation':'animated bounceInDown',
        'contentStyle': {
            'background': '#fff'
        },
        'onReady': function(){
            $('#closeDownload').on(oTools.clickEvent, function(){
                download.close();
            });
        },
        'onClose': function() {
            // 关闭回调
            // alert('close popup');
        }
    });
}

// 没有积分
function noPoint(mess){
    var closeImg = gConfig.imgPath + '/images/close.png';
    var noPoint = new Dialog({
        'msg': mess,
        'type': 'alert',
        'lock':true,
        'width':'80%',
        'height': 'auto',
        'animation':'animated bounceInDown',
        'showButtons': true,
        'submitButton': '我知道了',
        'cancelButton': false,
        'contentStyle': {
            'background': '#fff'
        },
        'onReady': function(){},
        'onClose': function() {
            // 关闭回调
            // alert('close popup');
        }
    });
}

// 领取福分成功弹层
function received(mess, time){
    var closeImg = gConfig.imgPath + '/images/close.png';
    var tipsbg = gConfig.imgPath + '/images/fu-score-bg.png';
    var received = new Dialog({
        'msg': mess,
        'type': 'tips',
        'time': time || 2000,
        'tipsbg': tipsbg,
        'lock':true,
        'lockOpacity': 90,
        'width':'80%',
        'height': 'auto',
        'top': '40%',
        'animation':'animated zoomIn',
        'contentStyle': {
            'background': 'none'
        },
        'onReady': function(){},
        'onClose': function() {
            // 关闭回调
            // alert('close popup');
        }
    });
}

// 中奖规则弹窗
function ruleDialog(prize, type){
    var closeImg = gConfig.imgPath + '/images/close.png';
    var rule = new Dialog({
        'id': 'wrapper',
        'type': 'popup',
        'lock':true,
        'lockClose': false,
        'width':'100%',
        'height': '100%',
        'top': '0',
        'closeButton': true,
        'closeImg': closeImg,
        'closeTop': '15px',
        'closeRight': '20px',
        'closeBtnW': '25px',
        'closeBtnH': '25px',
        'contentStyle': {
            'background': '#fff',
        },
        'onReady': function(){
            var myScroll;
            (function(){
                myScroll = new IScroll('#wrapper', {
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    bounce: false
                });
            })();
        },
        'onClose': function() {}
    });
}

// 领取福分
$('.button-box').on(oTools.clickEvent, '.receive-btn', function(){
    var $this = $(this);

console.log($this);

    received('成功领取50福分');

});

function randomNum(start, end){
    return Math.floor(Math.random() * (end - start)) + start;
}

/****************************************************
//- 文字滚动信息
//- li低于5条全部显示  5条滚动显示
****************************************************/
$(function(){
    var $goodList = $('#goodList');
    var glSize = $goodList.find('li').size();

    // if(glSize < 5){
    //     $goodList.parents('.good-news').css({
    //         'overflow': 'visible',
    //         'height': 'auto'
    //     })
    // }else{
    //     $('#goodList').scrollWord({
    //         speed: 2000
    //     });
    // }

    $('#goodList').scrollWord({
        speed: 30
    });
});

/****************************************************
//- 页面data-href跳转事件
****************************************************/
$(function(){
    $(document).on(oTools.clickEvent, '*[data-href]', function(){
        var $_this = $(this);

        location.href = $_this.attr('data-href');
    });
});

/****************************************************
// >> other
****************************************************/
var sW = 0, sH = 0, dW = 0, dH = 0;

$(window).load(function(){
    sW = $(window).width();
    sH = $(window).height();
    dW = document.body.clientWidth;
    dH = $('body').height();

    if(dH < sH){
        $('body').css({
            height: sH
        });
    }
});

$(function(){
    $('#share').on(oTools.clickEvent, function(){
        if(oTools.isWechat){
            $.myPlugin.popup({
                screenW : winW,
                screenH : winH,
                path : gConfig.path + '/images/share-info.png'
            });
        }else{
            oTools.alertmess('打开浏览器菜单，点击分享按钮分享给朋友');
        }
    });

});