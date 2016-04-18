/****************************************************
// >> PUBLIC
****************************************************/
var sW = 0, sH = 0, dW = 0, dH = 0, cH = 0;

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

// 页面data-href跳转事件
$(function(){
    $(document).on(oTools.clickEvent, '*[data-href]', function(){
        var $_this = $(this);

        location.href = $_this.attr('data-href');
    });
});

// 兼容 placeholder 替换成value
$(function(){
    $('input').not("input[type='password']").each(function() {
        var self = $(this);
        var val = self.attr("placeholder");
            placeholderFn(self, val);
        }
    );
})
// jQuery替换placeholder的处理
function placeholderFn(obj, val) {
    var $input = obj;
    var val = val;
    $input.attr('value', val);
    $input.css({color: '#999'});
    $input.attr({placeholder: ""});
    $input.focus(function() {
        if ($input.val() == val) {
            $(this).attr('value', "");
            $(this).css({color: '#333'});
        }
    }).blur(function() {
        if ($input.val() == "") {
            $(this).attr('value', val);
            $(this).css({color: '#999'});
        }
    });
}