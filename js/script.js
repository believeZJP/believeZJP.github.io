$(document).ready(function(){
	$("#fullPage").fullpage({
		anchors: ["firstPage", "secondPage", "3rdPage","4Page","5Page"],
		sectionsColor: ["#C63D0F", "#1BBC9B", "#7E8F7C", '#4BBFC3', '#7BAABE'],
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
});
