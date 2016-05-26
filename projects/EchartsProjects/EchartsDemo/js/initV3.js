$(document).ready(function() {
	myChartInit();
	
	window.onresize = function() {
		myChartInit();
	};

	function myChartInit() {
		var winWidth = $(window).width();
		$("#bar").width(	winWidth);
		var myChart = echarts.init(document.getElementById('bar'));
//		var dataArr = [1570, 1018,1017,1016,1015];
		var dataArr = [1570, 1018,1017,1016,1015,1014,1013, 1012,1011,1010];
//		var dataArr = [1570, 1018,1017,1016];
		
		var allPer = (dataArr[dataArr.length-1]/dataArr[0]*100).toFixed(2)+ ' %';//总转化率
		var perArr = [];
		var pointData = [];
		for (var i = 0,il = dataArr.length; i < il-1; i++) {
			perArr.push( (dataArr[i+1]/dataArr[i] * 100).toFixed(2) + ' %');
			var obj = {
				name: '转换率',
				coord: [i, 500]
			}
			pointData.push(obj);
		}
		//计算图片位置的偏移量
		var picDom = [];
		var picWidthReal = '';
		var picWidth = (winWidth-winWidth*0.03-40)/dataArr.length*0.3*2*(0.8);
		picWidthReal = picWidth;
		//思路：echarts每个柱状的宽度的1/3 ,是图片的一半，再乘以二是整个图片的宽度，为了美观，乘以0.9
		if(picWidth>90){
			picWidth = 90;
		}
		console.log(picWidthReal + "--"+picWidth);
		picDom.push(picWidth);
		picDom.push(60);		
		picWid = (winWidth-winWidth*0.03-40)/dataArr.length/2;
//		picWid = (winWidth-winWidth*0.03-40)/dataArr.length/2-picWidth/2;
		console.log(picWid);
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
			grid: {
				left: '1%',
				right: '2%',
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
						symbolSize: picDom,
						symbolOffset: [picWid, -85],
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
						data:pointData,
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