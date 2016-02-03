##PUBLIC
variable    ***gConfig***
	
	@type {object}
	@param {gConfig.imgPath}  服务端图片资源的绝对地址   gConfig.imgPath + '/images/*.jpg'
	@param {gConfig.prizeURL} 抽奖数据接口地址 下面AJAX直接访问的这个全局变量

data-href=""

	@全局跳转链接 替换<a>标签~ 防止iPhone点透


##my_packet.html

***
###拆红包按钮控制
variable 	***prized***  对应 data-prize="" 自定义属性

	@type {boolean}
	@Initial {false}
	@data-prized的值, true时点击拆红包不触发事件; 

calss 		***open***

	@添加后红包为打开状态;

	1.用户自己拆过一次红包所有的 都设为 <div class="flipper" data-prized="***true***">
	使用户自己不能再次点击
	2.默认打开用户不可点击<div class="flipper ***open***" data-prized="***true***">
	3.其他用户关闭的要设为 <div class="flipper" data-prized="***false***">

data-href="" 自定义属性 页面跳转链接

data-opend="" 自定义属性 红包是否已翻转

	@type {boolean}    <div class="flipper" data-opend="***true***" data-prized="***true***">
	@Intaial {false}
	@红包自动翻牌时 检测  true 不翻   false 翻
***

***
###function 		toogleRotate(obj);

	@点击拆红包后翻牌效果
	@param {obj._this} 		this 的Zepto对象
	@param {obj.pTit} 		暂时没用
	@param {obj.img} 		根据AJAX返回中奖值，更改翻牌图片链接 
	@param {obj.url} 		给父级元素添加data-href链接
	@param {obj.prizetype} 	AJAX中将值


###function 		shutBtn(obj);

	@关闭其他按钮点击事件及自动翻牌
	@param {obj._this} 		this 的Zepto对象
	@param {obj.open} 		true 为 翻开其他的所有邻居元素 反之
	@param {obj.img} 		设置其他翻开图片链接
	@param {obj.url} 		给邻居元素添加data-href链接


###function 		awardDialog(obj);

	@中奖弹层
	@param {obj.url} 		弹层按钮链接	
	@param {obj.btnTxt} 	按钮文字
	@param {obj.prizetype}  AJAX中将值
	@param {obj.fn} 		弹层关闭回调


***
###AJAX

	@res.success
		中奖值为 true 否则没有这个值
	@res.prizetype
		中奖等级 1，2，3，分别为一，二，三等奖； 4 为没中奖
	@res.getover
		当天的奖项被抢光 值为 true 否则没有这个值
	@res.lastday
		最后一天的奖项被抢光 值为 true 否则没有这个值
	@res.slow
		请求时和别人冲突 值为 true 否则没有这个值
***


##invite.html

***
function  ***inviteDialog(exchange);***

	@点击 添加手机号 按钮后, 弹出输入手机号窗口；
	@param {exchange} 点确定回调函数, return true 关闭弹窗 return false 不关闭弹窗