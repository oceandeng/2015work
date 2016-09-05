/* 
* @Author: ocean
* @Date:   2015-12-31 16:43:41
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-05 10:48:18
*/

'use strict';

require.config({
	paths: {
		echarts: './scripts/echarts'
	}
});
require(
	[
		'echarts',
		'echarts/chart/radar',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	],
	function (ec) {
		var myChart = ec.init(document.getElementById('radar'));
		var option = { //可以去官网上根据每个案例不同的option去写各种图形
		    polar: [{    //极坐标 
		        indicator: [{text: 'a',max: 100},
		                    {text: 'b',max: 100},
		                    {text: 'c',max: 100},
		                    {text: 'd',max: 100},
		                    {text: 'e',max: 100}
		                   ],
		        radius: 80,
		        startAngle: 18   // 改变雷达图的旋转度数
		    }],
		    series: [{         // 驱动图表生成的数据内容数组，数组中每一项为一个系列的选项及数据
		        name: '总点击量',
		        type: 'radar',
		        itemStyle: { //图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
		            normal: {
		                areaStyle: {
		                    type: 'default',
		                },
		                color: 'rgba(30, 160, 220, 0.8)'
		            }
		        },
		        data: [{
		            value: [78, 88, 60, 94, 98, 37],
		            name: ''
		        }]
		    }]
		};
		myChart.setOption(option, true);
	}
);