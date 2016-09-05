/* 
* @Author: ocean
* @Date:   2015-12-31 16:43:41
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-05 11:29:23
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
		'echarts/chart/gauge',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	],
	function (ec) {
		var myChart = ec.init(document.getElementById('gauge'));
		var option = {
		    series : [
		        {
		            name:'业务指标',
		            type:'gauge',
		            startAngle:180,
					endAngle:0,
					center : ['50%', '80%'],    // 默认全局居中
        			radius : 100,
		            splitNumber: 5,       // 分割段数，默认为5
		            axisLine: {            // 坐标轴线
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: [[0.4, '#228b22'],[0.8, '#48b'],[1, '#ff4500']],
		                    width: 3
		                }
		            },
		            axisTick: {            // 坐标轴小标记
		                splitNumber: 10,   // 每份split细分多少段
		                length :12,        // 属性length控制线长
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: 'auto'
		                }
		            },
		            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    color: 'auto'
		                }
		            },
		            splitLine: {           // 分隔线
		                show: true,        // 默认显示，属性show控制显示与否
		                length :30,         // 属性length控制线长
		                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
		                    color: 'auto'
		                }
		            },
		            pointer : {
		                width : 5
		            },
		            title : {
		                show : true,
		                offsetCenter: [0, '-40%'],       // x, y，单位px
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    fontWeight: 'bolder'
		                }
		            },
		            detail : {
		                formatter:'{value}%',
		                offsetCenter: [0, 0],
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    color: 'auto',
		                    fontSize : 14,
		                    fontWeight: 'bolder'
		                }
		            },
		            data:[{value: 50, name: ''}]
		        }
		    ]
		};

		option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
		myChart.setOption(option,true);
	}
);