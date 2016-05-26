$(document).ready(function() {

	myChartInit();
	window.onresize = function() {
		console.log(1);
		$("#bar").width(	$(window).width()-200);
		console.log($("#bar").width());
		myChartInit();
	};

	function myChartInit() {
		var myChart = echarts.init(document.getElementById('bar'));
		var option = {
			color: ['#9dc6b3'],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: ['数据']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['APP访问', '设备操作', '煮饭']
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [

				{
					name: '数据',
					type: 'bar',
					barCategoryGap: '60%',
					data: [1570, 1018, 862],
					markPoint: {
						symbol: 'roundRect',
						symbolSize: 90,
//						symbolOffset: ['550%', 0],
						symbolOffset: ['305%', -85],
						data: [{
								name: '两个坐标之间的标线',
								coord: [0, 500]
							}, {
								coord: [1, 500]
							}

						]

					},
					markLine: {
						symbol: ['', 'arrow'], //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
						symbolSize: [15, 15],
						symbolOffset: ['25%', '50%'],
						label: {
							normal: {
								position: 'middle',
								//							formatter: '{b}: {d}, {a}, {c}'
							},
							emphasis: {
								position: 'middle'
							}
						},
						lineStyle: {
							normal: {
								type: 'solid',
								width: 5
							}
						}
						,
						data: [
							[{
								name: '两个坐标之间的标线',
								coord: [1, 200]
							}, {
								coord: [2, 300]
							}],
							[{
								name: '两个屏幕坐标之间的标线',
								coord: [0, 200]

							}, {
								coord: [1, 300]
							}]

						]
					}
				}

			]
		};
		myChart.setOption(option);
	};

});