$(document).ready(function(){
	$("#fullPage").fullpage({
		anchors: ["firstPage", "secondPage", "3rdPage","4Page","5Page"],
		sectionsColor: ["#1c1e29", "#1BBC9B", "#0eae6c", '#ff671b', '#7BAABE'],
		scrollingSpeed: 700,
		controlArrows: true,
		menu:"#menu",

		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ["首页", "技术锦囊", "实验室","生活感悟","后花园"],

		loopTop: true,
		loopBottom: true,
		
		css3: true
	});
	
	var secondDataOption = {
		"前端":{
	            name:'前端',
	            type:'pie',
	            radius: ['40%', '55%'],
	            data:[
	                {value:4, name:'html&html5'},
	                {value:4, name:'css&css3'},
	                {value:3, name:'JavaScript'},
	                {value:2, name:'node'},
	                {value:3, name:'AngularJS',href:'projects/AngularJS/index.html'},
	                {value:1, name:'React',href:'React.html'},
	                {value:4, name:'less',href:'lessTest.html'},
	                {value:4, name:'Echarts'},
	                {value:1, name:'Framework7',href:'http://framework7.io/get-started/'},
	                {value:1, name:'Ionic',href:'http://ionicframework.com/'},
	                {value:1, name:'Vue.js',href:'http://cn.vuejs.org'},
	                {value:1, name:'fis',href:'http://fis.baidu.com/fis3/index.html'},
	                {value:1, name:'Backbone.js',href:'http://www.zhihu.com/question/19720745'},
	                {value:1, name:'其他',href:'others.html'}
	            ]
	        },
		"后端":{
	            name:'后端',
	            type:'pie',
	            radius: ['40%', '55%'],
	            data:[
	                {value:4, name:'java'},
	                {value:1, name:'php'}
	            ]
	        },
		"数据库":{
	            name:'数据库',
	            type:'pie',
	            radius: ['40%', '55%'],
	            data:[
	                {value:3, name:'MYSQL',href:'SQLList.html'},
	                {value:1, name:'MONGODB'},
	                {value:1, name:'NOSQL'},
	                {value:1, name:'其他',href:''}
	            ]
	        }
	};
	var option =   {
		backgroundColor:'#FFFF99',
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        x: 'left',
	        data:['前端','后端','数据库','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
	    },
	    series: [
	    	{
	            name:'技术体系',
	            type:'pie',
	            selectedMode: 'single',
	            radius: [0, '30%'],
	
	            label: {
	                normal: {
	                    position: 'inner'
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {value:4, name:'前端'},
	                {value:4, name:'后端'},
	                {value:3, name:'数据库'}
	            ]
	        }
	    	,
	        secondDataOption["前端"]
	    ]
	};
	var myChart = echarts.init(document.getElementById('techPieChart'));
	resetPieChart();
	//重置echarts的方法
	function resetPieChart(){
		myChart.setOption(option);
		myChart.resize();
	}
	//暂时只会用click事件来处理
	myChart.on("click",function(param){
		console.log(param);
		var data = param.data;
		if(param.seriesIndex == 0){
			if (data.selected) {
				option.series[1] = secondDataOption[data.name];
			} else{
				option.series.splice(1,1);
			}
			resetPieChart();
		}else if(param.seriesIndex == 1){
			var href = data.href;
			if (href) {
				window.open(href); 
			}
		}
	});
	
	$(".footer_a").on("mouseover",function(){
		$(this).find("img").show();
	});
	$(".footer_a").on("mouseout",function(){
		$(this).find("img").hide();
	});
	
	
	
	
});
