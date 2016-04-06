
/**
 * 经验：
 * 1.图片要先加载出来，否则会导致js执行的时候，图片还没有，无法绘制
 * 2.js要写在window.onload之后，
 * 3.window.onload 比 document.body.onload早，等图片加载完再执行js，必须用document.body.onload
 * 4.当然也可以用$(function(){   });
 * 5.也可用$(document).ready(function(){   });
 **/
//$(function(){	

document.body.onload = function() {
	var num = 0;
	var FPS = 500;//动画帧频率，
	//图片数组
	var imgArr = $(".imgArea img");
//	var imgArr = ["img/1.jpg", "img/2.jpg", "img/3.png"];
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
		img.src = imgArr[num].src;
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
//});