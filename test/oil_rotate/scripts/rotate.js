/*
* @Author: ocean
* @Date:   2016-04-05 13:38:48
* @Last Modified by:   ocean
* @Last Modified time: 2016-04-12 18:02:56
*/

/****************************************************
// >> 转盘转动
****************************************************/
$(function() {

    var totalDeg = 360 * 3 + 0;
    var steps = [];
    var lostDeg = [36, 96, 156, 276, 336];
    var prizeDeg = [66, 246];
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
                    winned(prize);
                } else {
                    losted();
                    // oTools.alertmess("谢谢您的参与，下次再接再厉");
                    outter.style.webkitTransform = 'rotate(36deg)';
                    outter.style.MozTransform = 'rotate(36deg)';
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

        var $chance = $('#chance');
        var chance = parseInt($chance.html());

        if(chance < 1){
            noPoint('抱歉，您的机会用完了！！！');
            return;
        }else{
// >> 抽奖完成AJAX
            $.ajax({
                type: 'POST',
                url: 'http://192.168.10.164/interface/demo.php',
                dataType: 'jsonp',
                jsonp: 'callback',
                timeout: 6e3,
                // async: false,
                data: {
                    token: "o7MB9ji5fQRsE0ZoVAMU7SlnRyMI",
                    ac: "activeityuser",
                    chance: chance,
                    tid: "5",
                    t: Math.random()
                },
                beforeSend: function(){
                    running = true;

                    timer = setInterval(function() {
                        i += 5;
                        outter.style.webkitTransform = 'rotate(' + i + 'deg)';
                        outter.style.MozTransform = 'rotate(' + i + 'deg)';
                    }, 30);
                },
                success: function(res){
                    // 中奖
                    if (res.prizetype == 2) {
                        prize = res.prizetype;
                        start(prizeDeg[parseInt(2 * Math.random())]);
                    } else {
                        // 未中奖
                        start();
                    }
console.log(chance);
                    chance--;
                    $chance.html(chance);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    prize = null;
                    start();
                }
            });
        }
    })
});
