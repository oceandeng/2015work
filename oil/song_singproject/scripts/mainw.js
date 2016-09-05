/* 
* @Author: ocean
* @Date:   2015-09-02 10:55:07
* @Last Modified by:   ocean
* @Last Modified time: 2015-09-24 15:23:02
*/

'use strict';

$(document).ready(function(){

	var $tripTit = $('.trip-con').find('h3');
	var $tripCon = $('.trip-content');
	var $arrow = $tripTit.find('.trip-arrow');

	$tripCon.first().show();
	$arrow.first().css({
		'background-position': '0 -8px'
	});

	$tripTit.each(function(index, value){
		var $_this = $(this);

		$_this.on('tap', function(e){
			var $next = $_this.next();
			var $_arrow = $_this.find('.trip-arrow');

			$arrow.each(function(index, value){
				$(value).css({
					'background-position': '0 0'
				});
			});

			if($next.is(':visible')){
				$_arrow.css({
					'background-position': '0 0'
				});
				$next.hide();
			}else{
				$_arrow.css({
					'background-position': '0 -8px'
				});
				$tripCon.each(function(index, value){
					var $_value = $(value);
					$_value.hide();
				});
				$next.show();
			}

			tripList();
			e.preventDefault();
		});
	});

	var dataHrefEle = $("*[data-href]");
	dataHrefEle.each(function(k, v){
		var $_this = $(this);
		$_this.on('tap', function(){
			location.href = $_this.attr('data-href');
		});
	});

	function tripList(){
		$('.trip-content').each(function(){
			var $_this = $(this);
			var $_this_l =$_this.find('.trip-list');

			$_this_l.each(function(index, value){
				var $__this = $(this);
				var h = $__this.find('.t-park').height();
				// var h = $__this.find('.t-park').get(0).clientHeight;
				var p = parseInt($__this.find('.t-park').css('padding'));

				if(index%2 == 0){
					$__this.css({
						background: '#fff'
					});
				}

				$__this.find('.t-date').css({
					height: h - 2*p
				});
				$__this.find('.t-city').css({
					height: h - 2*p
				});
			});
		});
	}

	tripList();

// 菜单滚动
	function navScorll(obj){
		$(obj.id).on('tap', function(){
			var end = parseInt($(obj.con).position().top);

			$.scrollTo({
			  endY: end,
			  duration: 200,
			  callback: function(){
			    // console.log(window.pageYOffset);
			  }
			});
		});
	}

	navScorll({
		id: '#trip',
		con: '.trip-box'
	});
	navScorll({
		id: '#news',
		con: '.news-box'
	});

// 返回顶部
	var $scrollE = $('#scrollTop');
	var timer = null;

	$scrollE.hide();
	$(window).scroll(function(){
		if(!timer){
			timer = setTimeout(function(){
				var scrollPos = document.body.scrollTop;

			    if(scrollPos > 100){
			    	$scrollE.show();
			    }else{
			    	$scrollE.hide();
			    };

				timer = null;
			}, 300);
		}
	});

	$scrollE.on('tap', function(){
		$.scrollTo({
		  endY: 0,
		  duration: 200,
		  callback: function(){
		    // console.log(window.pageYOffset);
		  }
		});
	});

// AJAX加载
	$('#loadmore').on('tap', function(){		
		ajaxPage();
	});

	$('.news-list').on('tap', 'li', function(){
		// console.log($(this).attr('data-href'));
		location.href = $(this).attr('data-href');
	});

// ajax分页
	var friendP = 1;

	function ajaxPage(obj){
		$.ajax({
			url: gConfig.ajaxUrl,
			type: "GET",
			data: {p: friendP+1},
			timeout: 5e4,
			beforeSend: function(){
				if($('#canvas').size() < 1){
					showLoading();
				}
				$('#canvas').show();
				$('#loadmore').html('..正在加载..').css({
					color: '#b3bac7'
				});
			},
			success: function(res){
				if(res.code == 0){
					var html = '';
					var data = res.data;
					for(i in data){
						html += '<li data-href="' + data[i].link + '"><div class="img"><img src="' + data[i].img + '" alt=""></div><div class="news-con"><h2>' + data[i].tiltle + '</h2><p class="date">' + data[i].date + '</p></div></li>';
	    			}

	    			$('.news-list').find('ul').append(html);
	    			if(!res.hasmore){
						// $('#loadmore').html('没有更多记录了');
	    				$('#loadmore').hide();
	    			}
	   				friendP++;
				}else if(res.code == 1){
					oTools.alertmess(res.msg);
					// $('#loadmore').html('没有更多记录了');
					$('#loadmore').hide();
				}else{
					oTools.alertmess(res.msg);
				}
				//console.log(res);
				$('#canvas').hide();
			},
			error: function(){
				oTools.alertmess('请检查您的网络~');
                $('#canvas').hide();
			},
			complete: function(){
                $('#canvas').hide();
				$('#loadmore').html('加载更多').css({
					color: '#ff3b30'
				});
			}
		})
	}

// 选项卡
	var $songerLi = $('.win-tab-nav').find('li');
	var $songerCon = $('.win-tab-box').find('.win-tab-con');

	$songerLi.each(function(index, value){
		var $_this = $(this);

		$_this.on('click', function(e){
			$(this).siblings().removeClass();
			$(this).addClass('active');

			$songerCon.each(function(k, v){
				$(this).hide();

				if(index == k){
					$(this).show();
				}
			});
		});
	});
});