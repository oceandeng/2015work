/****************************************************
// >> 转盘转动
****************************************************/
$(function() {

    var totalDeg = 360 * 3 + 0;
    var steps = [];
    var lostDeg = [36, 96, 156, 276, 336];
    var prizeDeg = [[6], [186, 306], [66, 126, 246]];
    var prize, sncode;
    var count = 0;
    var now = 0;
    var a = 0.01;
    var outter, inner, timer, i, running = false;
    var totalScore;
    var setDeg = 1;

/****************
// >> 转速
*****************/
    function countSteps() {
        var t = Math.sqrt(2 * totalDeg / a);
        var v = a * t;

        for (var i = 0; i < t; i++) {
            steps.push((2 * v * i - a * i * i) / 2)
        }
        steps.push(totalDeg);
    }

/****************
// >> 转盘转动
*****************/
    function step() {
        outter.style.webkitTransform = 'rotate(' + steps[now++] + 'deg)';
        outter.style.MozTransform = 'rotate(' + steps[now++] + 'deg)';
        if (now < steps.length) {
            if(oTools.isIOS){
                requestAnimationFrame(step)
            }else{
                setTimeout(function(){
                    step();
                }, 30);
            }
        } else {
            running = false;
            setTimeout(function() {
                if (prize != null) {
                    var type = "";
                    if (prize == 1) {
                        type = "一等奖";
                    } else if (prize == 2) {
                        type = "二等奖";
                    } else if (prize == 3) {
                        type = "三等奖";
                    }

                    winned(prize, type);

                } else {
                    oTools.alertmess("谢谢您的参与，下次再接再厉");
                    outter.style.webkitTransform = 'rotate(30deg)';
                    outter.style.MozTransform = 'rotate(30deg)';
                }
            }, 200)
        }
    }

/****************
// >> 转盘转动
*****************/
    function start(deg) {
        deg = deg || lostDeg[parseInt(lostDeg.length * Math.random())];
        running = true;
        clearInterval(timer);
        totalDeg = 360 * setDeg + deg;
        steps = [];
        now = 0;
        countSteps();
        
console.log(steps);

        if(oTools.isIOS){
            requestAnimationFrame(step);
        }else{
            setTimeout(function(){
                step();
            }, 30);
        }
    }

    // window.start = start;
    outter = document.querySelector('#outer');
    inner = document.querySelector('#inner');
    i = 1;

    outter.style.webkitTransform = 'rotate(30deg)';
    outter.style.MozTransform = 'rotate(30deg)';

    $("#inner").on(oTools.clickEvent, function() {
        if (running) return;

        var $tScore = $('#totalScore');
        totalScore = parseInt($tScore.html());

        if(totalScore < 20){
            noPoint('抱歉，您目前的福分还差一点点才能启动大转盘。明天继续签到赚福分吧！！！');
            return;
        }else{
// >> 抽奖完成AJAX
            $.ajax({
                type: 'POST',
                url: 'http://192.168.8.72/demo.php',
                dataType: 'jsonp',
                jsonp: 'callback',
                timeout: 6e3,
                // async: false,
                data: {
                    token: "o7MB9ji5fQRsE0ZoVAMU7SlnRyMI",
                    ac: "activeityuser",
                    score: totalScore,
                    tid: "5",
                    t: Math.random()
                },
                beforeSend: function(){
                    running = true;

                    timer = setInterval(function() {
                        i += 5;
                        outter.style.webkitTransform = 'rotate(' + i + 'deg)';
                        outter.style.MozTransform = 'rotate(' + i + 'deg)';
                    }, 1);
                },
                success: function(data){
                    // 中奖
                    if (data.success) {
                        totalScore = totalScore - 20;
                        prize = data.prizetype;
                        start(prizeDeg[data.prizetype - 1][parseInt(prizeDeg[data.prizetype - 1].length * Math.random())]);
                    } else {
                        // 未中奖
                        totalScore = totalScore - 20;
                        prize = null;
                        start();
                    }
                    // running = false;
                    count++
                },
                complete: function(){
                    $tScore.html(totalScore);
                    // running = true;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    prize = null;
                    start();
                    // running = false;
                    // count++
                }
            });
        }
    })
});

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
function winned(prize, type){
    var closeImg = gConfig.imgPath + '/images/close.png';
    var winned = new Dialog({
        'id': 'winning',
        'type': 'popup',
        'lock':true,
        'lockClose': false,
        'width':'80%',
        'height': 'auto',
        'closeButton': false,
        // 'closeImg': closeImg,
        // 'closeTop': '-20px',
        // 'closeRight': '-20px',
        'animation':'animated bounceInDown',
        'contentStyle': {
            'background': '#fff'
        },
        'onReady': function(){

            var $pTit = $('#prizeTit');
            var $pImg = $('#winning').find('#prizeType');

            $pTit.text(type);

            if(prize == 1){
                $pImg.attr('src', 'images/p-one.png');
            }else if(prize == 2){
                $pImg.attr('src', 'images/p-two.png');
            }else if(prize == 3){
                $pImg.attr('src', 'images/p-thr.png');
            }

            $('#acceptBtn').on(oTools.clickEvent, function(){
                exchange(winned);
            });

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
        speed: 2000
    });
});

/****************************************************
//- 页面data-href跳转事件
****************************************************/
$(function(){
    var dataHrefEle = $("*[data-href]");
    dataHrefEle.each(function(k, v){
        var $_this = $(this);
        $_this.on(oTools.clickEvent, function(){
            location.href = $_this.attr('data-href');
        });
    });
});

/****************************************************
// >> other
****************************************************/
$(function(){
    var $a = $('.award-box');
    var $i = $('.invitation-body');
    var wH = $(window).height();
    var aH = $a.height();
    var iH = $i.height();

    if(aH < wH){
        $a.css({
            height: wH
        })
    }
    if(iH < wH){
        $i.css({
            height: wH
        })
    }

    if(!!$('#taskBtn').size()){
        var tbTop = $('#taskBtn').position().top;

        $('#taskBtn').on(oTools.clickEvent, function(){
            $.scrollTo({
              endY: tbTop,
              duration: 200,
              callback: function(){
                console.log(window.pageYOffset);
              }
            });
        });
    }

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