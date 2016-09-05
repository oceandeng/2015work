(function( $ ) {
    $.fn.circliful = function(options) {
        var settings = $.extend({
            // These are the defaults.
            foregroundColor: "#fa6087",
            backgroundColor: "#eee",
            fillColor: false,
            width: 10,
            forewidth: 10,
            dimension: 200,
            size: 15, 
            percent: 50,
            endPercent: 100,
            sarcr: 10,
            showValue: "showValue", //新增 动态数值变化值显示标签ID
            animationStep: 1.5
        }, options );
        return this.each(function() {
                var dimension = settings.dimension;
                var text = '';
                var info = '';
                var width = settings.width;
                var forewidth = settings.forewidth;
                var size = settings.size;
                var sarcr = settings.sarcr;
                var percent = settings.percent / 100;
                var endPercent = settings.endPercent;
                var fgcolor = settings.foregroundColor;
                var bgcolor = settings.backgroundColor;
                var icon = '';
                var animationstep = settings.animationStep;
                var endQuota = parseFloat(settings.endQuota);
                var fullQuota = parseFloat(settings.fullQuota);
                var decimal = endQuota.toFixed(2).toString().split('.')[1];
                var showValue = settings.showValue; //赋值
                $(this).addClass('circliful');

                $(this).css({
                  'width': dimension,
                  'margin': '0 auto',
                  'position': 'relative'
                });

                var canvas = $('<canvas></canvas>').html('您的浏览器不支持canvas').attr({ 'width': dimension*2, 'height': dimension*2 }).css({'position': 'absolute', 'top': 0, 'z-index': 0, 'width': dimension, 'height': dimension}).prependTo($(this)).get(0);

                if(typeof window.G_vmlCanvasManager != 'undefined'){
                    canvas = window.G_vmlCanvasManager.initElement(canvas);　　//IE8兼容getContext
                    var context = canvas.getContext('2d');
                }else{
                    var context = canvas.getContext('2d');
                }

              var x = canvas.width / 2;
              var y = canvas.height / 2;
              var degrees = percent * 360.0;
              var radians = degrees * (Math.PI / 180);
              var radius = canvas.width / 2.5;
              var startAngle = 2.3 * Math.PI;
              var endAngle = 0;
              var counterClockwise = false;
              var curPerc = animationstep === 0.0 ? endPercent : 0.0;
              var curStep = Math.max(animationstep, 0.0);
              var circ = Math.PI * 2;
              var quart = Math.PI / 2;
              var type = '';
              var fill = false;

              if($(this).data('type') != undefined) {
                    type = $(this).data('type');
                     
                    if(type == 'half') {
                        var startAngle = 2.0 * Math.PI;
                        var endAngle = 3.13;
                        var circ = Math.PI * 1.0;
                        var quart = Math.PI / 0.996;
                    }
                }
                 
                if($(this).data('fill') != undefined) {
                    fill = $(this).data('fill');
                } else {
                    fill = settings.fillColor;
                }
              //animate foreground circle
              function animate(current) {
                /**
                 * [修改] 设置圆心动态数据变化值
                 * showValue 为显示动态值的html标签的ID
                 * 这里 parseInt(current*100) 取整数，他的最大值为 endPercent的值
                 **/
                var showQuota = parseInt(fullQuota * current);
                var commasQuota = addCommas(showQuota);
                $("#"+showValue).html(commasQuota + '.' + decimal);

                /**
                 * [修改] 判断值是否超过圆形的一半，并修改圆形颜色              *
                 **/
                if(current < 0.3){
                    fgcolor = '#ff9b95';
                }else if(current >= 0.3 && current < 0.6){
                    fgcolor = '#ff6e66';
                }else{
                    fgcolor = '#f54b41';
                }
                 
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.save();                 
                context.beginPath();
                context.arc(x, y, radius, endAngle, startAngle, false);
                context.lineWidth = width - 1;      
                // line color
                context.strokeStyle = bgcolor;
                context.stroke();
                context.restore();
                if(fill) {
                    context.fillStyle = fill;
                    context.fill();
                }
                context.save();                 
                context.beginPath();
                context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
                context.lineWidth = forewidth;
                // line color
                context.strokeStyle = fgcolor;
                context.stroke();
                context.restore();
                
                // var hudu = ((circ) * current);
                // context.save();
                // context.beginPath();
                // context.arc(x + Math.sin(hudu) * (radius - 16), y - Math.cos(hudu) * (radius - 16), sarcr, 0*Math.PI, 2*Math.PI);
                // context.fillStyle = fgcolor;
                // context.fill();
                // context.restore();

                if (curPerc < endPercent) {
                     curPerc += curStep;
                     if(window.requestAnimationFrame){
                         requestAnimationFrame(function () {
                            /**
                             * [修改] 降低圆形进度条速度
                             **/
                            // setTimeout(function(){
                                // animate(Math.min(curPerc, endPercent) / 100);
                                animate(Math.min(curPerc, endPercent) / 100);
                            // }, 40);
                         });
                     }else{
                        setTimeout(function(){
                            // animate(Math.min(curPerc, endPercent) / 100);
                            animate(Math.min(curPerc, endPercent) / 100);
                        }, 40);
                     }
                }
                if(curPerc > endPercent){
                  // var endCommasQuota = addCommas(endQuota);
                  // $("#"+showValue).html(endCommasQuota);
                  $("#"+showValue).html(settings.endQuota);
                }
             }
             animate(curPerc / 100);
        });
    };
    function addCommas(nStr){
        nStr += '';
        // x = nStr.split('.');
        x1 = nStr;
        // x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1;
    }
}(Zepto));

(function($){
  $(function(){
    var sW = $(window).width(),
      sH = $(window).height();

        var cupCount = 10;
            // ncCount = 80;
          var ncCount = (Number(gConfig.endQuota) / Number(gConfig.fullQuota) * 100).toFixed(2);
        var myStat2Color = cupCount > 50 ? '#ff9b95' : '#e94331';

        $('#quotaCan').circliful({
            dimension: sW,
            endPercent: ncCount,
            showValue: "scoreNum",
            foregroundColor: myStat2Color,//556b2f
            width: 2,
              forewidth: 8,
              backgroundColor: "#19273f",
              sarcr: 10,
              fullQuota: gConfig.fullQuota,
              endQuota: gConfig.endQuota
        });
  });
})(Zepto);