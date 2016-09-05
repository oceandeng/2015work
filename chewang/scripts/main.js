/* 
* @Author: ocean
* @Date:   2015-11-17 11:38:31
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-05 15:55:16
*/

'use strict';
var sW = 0, sH = 0, dW = 0, dH = 0;

(function(){
	$(function(){
		sW = $(window).width(),
		sH = $(window).height(),
		dW = document.body.clientWidth,
		dH = document.body.clientHeight;

		if(dH < sH){
			$('body').css({
				height: sH
			})
		}

        $('html').css({
            background: '#efeff6'
        });
	});

// -- tab标签切换
	$(function(){
		var $cTab = $('.common-tab');
		var $cTabTit = $cTab.find('.tab-label');
		var $cTabDet = $cTab.find('.tab-detail');

		$cTabTit.each(function(k, v){
			$(v).on(oTools.clickEvent, function(){
				$cTabTit.removeClass('ac');
				$(v).addClass('ac');

				$cTabDet.each(function(i, n){
					$(n).hide();
					$cTabDet.eq(k).show();
				})
			});
		});

	});
	
    // 页面data-href跳转事件
    $(function(){
        $(document).on(oTools.clickEvent, '*[data-href]', function(){
            var $_this = $(this);

            location.href = $_this.attr('data-href');
        });
    });

    var $qList = $('.que-list').find('.list-nh-row');

    $qList.each(function(k, v){
        var $_this = $(this);

        $_this.find('.q-tit').on(oTools.clickEvent, function(){
            var $__this = $(this);

            if($__this.parent().find('.q-answer').get(0).style.display != 'block'){
                $__this.css({
                    'background-image': 'url(../images/arr-u.png)'
                })
                $__this.siblings().show();
                $__this.parent().siblings().find('.q-answer').hide();
            }else{
                $__this.css({
                    'background-image': 'url(../images/arr-d.png)'
                })
                $__this.siblings().hide();
            };
        });
    });

    $('#cInfo').on(oTools.clickEvent, function(){
        $(this).addClass('ac');
        $(this).siblings().removeClass('ac');
        $('#pInfoC').hide();
        $('#cInfoC').show();
        $('title').text('终端简介');
    });

    $('#pInfo').on(oTools.clickEvent, function(){
        $(this).addClass('ac');
        $(this).siblings().removeClass('ac');
        $('#cInfoC').hide();
        $('#pInfoC').show();
        $('title').text('运营平台简介');
    });

    $('#cQ').on(oTools.clickEvent, function(){
        $(this).addClass('ac');
        $(this).siblings().removeClass('ac');
        $('#pQc').hide();
        $('#cQc').show();
        $('title').text('终端常见问题');
    });

    $('#pQ').on(oTools.clickEvent, function(){
        $(this).addClass('ac');
        $(this).siblings().removeClass('ac');
        $('#cQc').hide();
        $('#pQc').show();
        $('title').text('平台常见问题');
    });


    if($('#cInfo').hasClass='ac'){
        $('#cInfo').trigger(oTools.clickEvent);
        $('#cQ').trigger(oTools.clickEvent);
    }

    if($('#pInfo').hasClass='ac'){
        $('#pInfo').trigger(oTools.clickEvent);
        $('#pQ').trigger(oTools.clickEvent);
    }

})(Zepto);


/**
 * @普通弹层
 * @param {obj.mess}  显示信息
 * @param {obj.url}   跳转链接
 * @param {obj.fn}    回调函数
 */
function tipsDialog(obj){
    var tips = new Dialog({
        'msg': obj.mess,
        'type': 'alert',
        'lock':true,
        'width':'70%',
        'height': 'auto',
        'top': '40%',
        'closeButton': false,
        'animation':'animated bounceInDown',
        'showButtons': true,
        'submitButton': obj.subTxt,
        'cancelButton': obj.canTxt,
        'bConStyle': {
            'padding': '30px 10px',
            'font-size': '16px'
        },
        'fStyle': {
            'display': 'flex',
            'width': '90%',
            'margin': '0 5% 10px 5%'
        },
        'subStyle': {
            'border': 'none',
            'display': 'block',
            'width': '100%',
            'margin': '0 auto',
            'position': 'relative',
            'z-index': 9,
            'background': '#00479d',
            'height': '50px',
            'color': '#fff',
            'font-size': '20px'
        },
        'canStyle': {
            'border': 'none',
            'display': 'block',
            'width': '100%',
            'margin': '0 auto',
            'position': 'relative',
            'z-index': 9,
            'background': '#999',
            'height': '50px',
            'color': '#fff',
            'font-size': '20px'
        },
        'contentStyle': {
            'background': '#fff',
            'border-radius': '5px'
        },
        'onReady': function(){

        },
        'onSubmit': function(){
            return obj.fn && obj.fn();
        },
        'onClose': function() {

        }
    });
}