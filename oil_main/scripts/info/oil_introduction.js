(function(){
	var OilIntroduction = function(){
		this.init();
	};
	
	OilIntroduction.prototype = {
			init:function(){
				this.bindEvent();
				$("ul").toggle();
				$(".upOrDown").attr("src","../images/down.png");
			},
			bindEvent :function(){
				$(".spantop").live('touchend',function(){
					$("ul").not($(this).parent().find("ul")).hide();
					$(".upOrDown").not($(this).parent().find(".upOrDown")).attr("src","../images/down.png");
					if($(this).parent().find("ul").css("display")=="none"){
						$(this).parent().find("ul").show();
						$(this).parent().find(".upOrDown").attr("src","../images/up.png");
					}else{
						$(this).parent().find("ul").hide();
						$(this).parent().find(".upOrDown").attr("src","../images/down.png");
						
					}
				});
			}
	};
	$(function(){
		var oilIntroduction = new OilIntroduction();
		window.oilIntroduction = oilIntroduction;
		
	});
})();