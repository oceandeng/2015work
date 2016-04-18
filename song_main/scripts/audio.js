/* 
* @Author: ocean
* @Date:   2015-07-16 11:17:09
* @Last Modified by:   ocean
* @Last Modified time: 2015-07-17 16:04:26
*/

'use strict';


//播放器控制面板	
var Control = function(o){
	this.setting         = (typeof o === 'object')? o : {};		
	this.audio           = this.setting.audio;
	this.playBtn         = this.setting.playBtn;
	this.song 			 = this.setting.song;
	this.progressWrap    = this.setting.progressWrap;
	this.progress        = this.setting.progress;
	this.allTimeNode     = this.setting.allTimeNode;	  
	this.currentTimeNode = this.setting.currentTimeNode;  
	this.path            = 'media/';  //歌曲路径（相对于html）
	this.imgPath         = 'data/';   //图片路径（相对于html）
	this.init();
}

Control.prototype = {
	//初始化
	init:function(){
		//播放控制
		this.start = true;
		//定时器
		this.timer = null;
		this.audio.src = null;			

		//可选播放模式
		this.ModeData = [
			{mode:'default',text:'顺序播放模式'},
			{mode:'random',text:'随机播放模式'},
			{mode:'single',text:'单曲循环模式'}
		];
		//默认播放模式
		this.ModeIndex = 0;
		this.playMode = this.ModeData[this.ModeIndex].mode;
	},

	//主控
	mainControl:function(){
		if(!this.audio.src || /null/.test(this.audio.src)){
			this.loadMusic();
		}
		if(this.start){
			this.goPlay();
		}else{
			this.goPause();
		}	
	},
	
	//播放进度选择
	selectTime:function(event){
		var moveTo = event.pageX - this.progressWrap.offset().left;
		this.audio.currentTime = moveTo/parseInt(this.progressWrap.css("width"))*this.audio.duration;
		this.progress.css("width",moveTo+"px");
	},
	
	//自动播放
	autoPlay:function(){
		//监听歌曲结束
		var that = this;
		this.audio.addEventListener('ended', function () {
			if(typeof that.playMode==='string')
			{	//播放模式判断
				switch(that.playMode){
					case 'default': that.oLi = (that.oLi.nextSibling!=null)?that.oLi.nextSibling:that.oUl.childNodes[0];
									break;
					 case 'random': that.oLi = that.oUl.childNodes[Math.round(Math.random()*(that.oUl.childNodes.length-1))];
									break;
					 case 'single': ;
						   default: ;
				}
				// that.loadMusic();
				that.goPlay();
			}else{
				that.oWindow("循环类型不符!");
			}
		}, false);
	},
	
	//转换为时间格式
	timeDispose:function (number) {
		var minute = parseInt(number / 60);
		var second = parseInt(number % 60);
		minute = minute >= 10 ? minute : "0" + minute;
		second = second >= 10 ? second : "0" + second;
		return minute + ":" + second;
	},	
	
	//自定义提示框
	oWindow:function(oText){
		this.oWinObj.show();
		this.oWinObj.html(oText);
		var doc = document.documentElement;
		var oWinX = (doc.clientWidth - this.oWinObj[0].offsetWidth)/2;
		var oWinY = (doc.clientHeight - this.oWinObj[0].offsetHeight-50)/2;
		this.oWinObj.css('left',oWinX+'px');
		this.oWinObj.css('top',oWinY+'px');
		var _this = this;
		setTimeout(function(){_this.oWinObj.hide();},1000)
	},

	//加载要播放的歌曲
	loadMusic:function(){

			this.audio.src = this.path + this.song + '.mp3';
			// $obj = $(this.oLi)
			// var song = $obj.find(".musicData").attr("value");	
			// var pic = $obj.find(".musicData").attr("pic");
			// var title = $obj.find(".musicData").attr("title");
			// this.singerHead.attr("src",this.imgPath + pic)
			// this.audio.src = this.path + song +'.mp3';
			// this.playTitle.html(title);
	},

	//播放时间
	oTime:function(){
		if(this.audio.readyState >=4){
			var currentProgress = Math.round(this.audio.currentTime/this.audio.duration*parseInt(this.progressWrap.css("width")));
			this.progress.css("width",currentProgress+"px");
			this.allTimeNode.html(this.timeDispose(this.audio.duration));
			this.currentTimeNode.html(this.timeDispose(this.audio.currentTime));
		}
	},
	
	//播放
	goPlay:function(){
		if(this.songReady()){
			this.audio.play();
			var _this = this;
			this.goPlayStyle();
			this.timer = setInterval(function(){_this.oTime()},1000)
			this.start = false;
			this.autoPlay();
		}
	},
	
	//暂停
	goPause:function(){
		this.audio.pause();
		this.goPauseStyle();
		clearInterval(this.timer);
		this.start = true;
	},
	
	//播放样式
	goPlayStyle:function(){
		this.playBtn.addClass("pause");
		this.playBtn.removeClass("play");
	},
	
	//暂停样式
	goPauseStyle:function(){
		this.playBtn.addClass("play");
		this.playBtn.removeClass("pause");
	},

	//判断当前是否歌曲列表
	songReady:function(){
		if(!this.audio.src){
			this.oWindow("没有歌曲！");
			return false;
		}else{
			return true;
		}
	},
}

//实例化控制台
var myControl = new Control({
			 audio : document.querySelector("#music"),	//播放器
 	  progressWrap : $("#progressWrap"), 				//歌曲进度条容器
		  progress : $("#progress"),     				//歌曲进度条
	   progressDot : $("progress-dot"),					//歌曲进度条圆点
		   playBtn : $("#playBtn"),   					//主控按钮
   	   allTimeNode : $("#totleTime"),    				//当前时间容器
   currentTimeNode : $("#currentTime"),   				//当前时间容器
   			  song : songConfig.song
});	
$('#playBtn').on('click', function(){
	var $_this = $(this);
	var $_photo = $('.driver-photo');

	myControl.mainControl();

	if($_this.hasClass('play')){
		$_this.find('img').attr('src', 'images/play-btn.png');
		$_photo.find('img').removeClass('circle-infinite');
	}else{
		$_this.find('img').attr('src', 'images/pause-btn.png');
		$_photo.find('img').addClass('circle-infinite');
	}

})