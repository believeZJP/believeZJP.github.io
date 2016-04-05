/*var can1 = document.getElementById("loop"); 
var ctx1 = can1.getContext("2d");
var canWidth = can1.width;
var canHeight = can1.height;
var img = new Image();
img.src = "img/3.png";
ctx1.clear();
ctx1.save();
ctx1.drawImage(img, 0, 0, canWidth, canHeight);
ctx1.restore();*/

//window.onload 不能使用

document.body.onload = function() {
	var num = 0;
	var FPS = 500;//动画帧频率，
	//图片数组
	var imgArr = ["img/1.jpg", "img/2.jpg", "img/3.png"];
	var can = document.getElementById("loop");
	var ctx = can.getContext("2d");
	var canWidth = can.width;
	var canHeight = can.height;
	var img = new Image();
	//循环绘制图片
	function drawImg() {
		if (num == imgArr.length) {
			num = 0;
		}
		img.src = imgArr[num];
		ctx.clearRect(0, 0, canWidth, canHeight);
		ctx.drawImage(img, 0, 0, canWidth, canHeight);
		num++;
	}

	//添加鼠标移入移出事件
	can.addEventListener("mouseover", onMouseOver, false);
	can.addEventListener("mouseout", onMouseOut, false);

	//鼠标移入，清除定时器
	function onMouseOver(e) {
		clearInterval(inter);
	}
	//鼠标移出，重新启动定时器
	function onMouseOut(e) {
		inter = setInterval(drawImg, FPS);
	}

	var inter = setInterval(drawImg,  FPS);
	//初始绘制一次
	drawImg();

};

/*
$(function(){
	var c=document.getElementById("loop");
	var ctx=c.getContext("2d");
	var canWidth = c.width;
	var canHeight = c.height;
//	var img=document.getElementById("tulip");
	var img =new Image();
	img.src = "img/3.png";
	ctx.drawImage(img,0,0,canWidth,canHeight);
	
});
*/