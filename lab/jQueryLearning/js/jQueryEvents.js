$(function(){
	//一次获取一个元素
	var li = $("#liOne");
	var lis = $(".ulShow .ulArea li");
	var ulArea = $(".ulShow .ulArea");
	$(".getOneDom").click(function(){
		console.log(li);
	});
	
	//一次获取多个元素
	$(".getDoms").click(function(){
		console.log(lis);
	});
	//操作一个元素的属性
	$(".setOneDomStyle").click(function(){
		li.css("background-color","red");
	});
	//操作多个元素的属性
	$(".setDomsStyle").click(function(){
		lis.css("border-radius","10px").css("background-color","black");
	});
	
	$(".appendFormToDiv").click(function(){
		var formsDom = $(".forms");
		formsDom.empty();
		var tempHtml = "<table>";
		//讲json对象以表格形式添加到html页面中
		var obj = {"姓名":"小玉","年龄":"24"};
		for (var key in obj) {
			tempHtml+="<tr><td>"+key+"：</td><td>"+obj[key]+"</td></tr>";
		}
		//添加动态表格到html中
		/*for (var i = 0; i < 50; i++) {
			tempHtml+="<tr>"
			for (var j = 0; j < 30; j++) {
				tempHtml+="<td>"+j+"</td>"
			}
			tempHtml+="</tr>";
		}*/
		tempHtml +="</table>";
		formsDom.append(tempHtml);
	});
	
	$(".appendLiToUl").on("click",function(){
		var newLi = $(lis[1]).clone();
		ulArea.append(newLi);
		
	});
	
	$(".removeLiFromUl").on("click",function(){
		var lastLi = ulArea.find("li:last");
		lastLi.remove();
		
	});
	
	
	
	
	
	
	
});
