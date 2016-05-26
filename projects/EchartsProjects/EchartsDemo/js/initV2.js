$(document).ready(function() {
	myChartInit();
	
	window.onresize = function() {
		myChartInit();
	};

	function myChartInit() {
		var winWidth = $(window).width();
		$("#bar").width(winWidth);
		var myChart = echarts.init(document.getElementById('bar'));
		var dataArr = [1570, 1018, 200];
		
		var allPer = (dataArr[dataArr.length-1]/dataArr[0]*100).toFixed(2)+ ' %';//总转化率
		var perArr = [];
		for (var i = 0,il = dataArr.length; i < il-1; i++) {
			perArr.push( (dataArr[i+1]/dataArr[i] * 100).toFixed(2) + ' %');
		}
		
		
		var option = {
			color: ['#9dc6b3'],
			title:{
				show:true,
				right:100,
				text :'总体转化率 :' + allPer,
				testStyle:{
					color:'#516570'
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
		/*	legend: {
				data: ['数据']
			},*/
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
					name: '漏斗',
					type: 'bar',
					label: {
		                normal: {
		                    show: true,
		                    position: 'inside'
		                }
		            },
					barCategoryGap: '60%',
					data:dataArr,
					markPoint: {
						symbol: 'image://img/1.png',
						symbolSize: [90,60],
						symbolOffset: [winWidth/6+'%', -85],
						label:{
							normal:{
								formatter:function(params){
									var data =  function(){
										return perArr;
									}();
									return data[params.dataIndex];
								}
							}
						},
						data: [
							{
								name: '转换率',
//								value: 34.5 ,
								coord: [0, 501]
							},
							{
								name: '转换率',
//								value: 45,
								coord: [1, 500]
							}
						],
						 tooltip: {
		                    formatter: function (param) {
		                    	var perArrObj  = function(){
		                    		return perArr;
		                    	}();
		                        return param.name + ' : ' + (perArrObj[param.dataIndex] || '');
		                    }
		                }
					}
				}
			]
		};
		myChart.setOption(option);
	};

});