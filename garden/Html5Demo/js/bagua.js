window.onload = function(){
	var ctx = document.getElementById("bagua").getContext("2d");
	
	//绘制白色半圆
	ctx.beginPath();
	ctx.arc(200,200,80,1.5*Math.PI,Math.PI/2,false);
	ctx.fillStyle = "white";
	ctx.closePath();
	ctx.fill();
	
	//黑色半圆
	ctx.beginPath();
	ctx.arc(200,200,80,Math.PI/2,Math.PI*1.5,false);
	ctx.fillStyle = "black";
	ctx.closePath();
	ctx.fill();
	
	//绘制黑色小圆
	ctx.beginPath();
	ctx.arc(200,240,40,0,Math.PI*2,true);
	ctx.fillStyle = "black";
	ctx.closePath();
	ctx.fill();
	
	//绘制白色小圆
	ctx.beginPath();
	ctx.arc(200,160,40,0,Math.PI*2,true);
	ctx.fillStyle = "white";
	ctx.closePath();
	ctx.fill();
	
	//绘制黑色小圆心
	ctx.beginPath();
	ctx.arc(200,160,5,0,Math.PI*2,true);
	ctx.fillStyle = "black";
	ctx.closePath();
	ctx.fill();
	
	//绘制白色小圆心
	ctx.beginPath();
	ctx.arc(200,240,5,0,Math.PI*2,true);
	ctx.fillStyle = "white";
	ctx.closePath();
	ctx.fill();
	
	
	
}
