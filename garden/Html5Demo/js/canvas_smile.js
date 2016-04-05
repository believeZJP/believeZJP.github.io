window.onload = function(){
	var mycanvas = document.getElementById("myCanvasTag");
	var mycontext = mycanvas.getContext("2d");
	
	//绑定鼠标事件
	mycanvas.onmouseover = function(){
		closeeye();
	};
	mycanvas.onmouseout = function(){
		openeye();
	}
	
	//画脸
	
	mycontext.beginPath();
	mycontext.arc(300,250,200,0,Math.PI*2,true);
	mycontext.closePath();
	mycontext.stroke();
	
	//画左眼
	mycontext.beginPath();
	mycontext.arc(220,150,30,0,Math.PI*2,true);
	mycontext.closePath();
	mycontext.fillStyle = "rgb(100,100,225)";
	mycontext.fill();
	
	//画左边的瞳孔
	mycontext.beginPath();
	mycontext.arc(220,150,10,0,Math.PI*2,true);
	mycontext.closePath();
	mycontext.fillStyle = "rgb(0,0,0)";
	mycontext.fill();
	
	
	//画左眼皮
	mycontext.beginPath();
	mycontext.arc(220,150,30,0,Math.PI,true);
	mycontext.closePath();
	mycontext.fillStyle = "rgb(200,200,200)";
	mycontext.fill();
	
	//画左眼睫毛
	mycontext.strokeStyle = "rgb(0,0,0)";
	lashes(mycontext,198,170,193,185);
	lashes(mycontext,208,177,204,193);
	lashes(mycontext,220,180,220,195);
	lashes(mycontext,232,177,236,193);
	lashes(mycontext,242,170,247,185);
	mycontext.stroke();
	
	openeye();//睁眼
	
	//画右眼睫毛
	mycontext.strokeStyle = "rgb(0,0,0)";
	lashes(mycontext,358,170,353,185);
	lashes(mycontext,368,177,364,193);
	lashes(mycontext,380,180,380,195);
	lashes(mycontext,392,177,396,193);
	lashes(mycontext,402,170,407,185);
	mycontext.stroke();
	
	//画鼻子
	mycontext.beginPath();
	mycontext.arc(300,250,20,0,Math.PI*2,true);
	mycontext.closePath();
	mycontext.stroke();
	
	//画嘴
	mycontext.beginPath();
	mycontext.lineWidth = 10;
	mycontext.moveTo(180,320);
	mycontext.bezierCurveTo(180,420,400,420,400,320);//三次贝塞尔曲线
	mycontext.closePath();
	mycontext.stroke();
	
	//底部文字介绍
	mycontext.font = "microsoft yahei";
	mycontext.fillStyle = "rgb(0,0,0)";
	mycontext.fillText("鼠标放到脸上，眼睛会眨!",10,480);
	
	
}
//画线
function lashes(ctx,x1,y1,x2,y2){
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
}

//闭眼
function closeeye(){
	//合右眼
	var mycanvas = document.getElementById("myCanvasTag");
	var mycontext = mycanvas.getContext("2d");
	mycontext.beginPath();
	mycontext.arc(380,150,30,0,Math.PI*2,true);
	mycontext.closePath();
	mycontext.fillStyle = "rgb(200,200,200)";
	mycontext.fill();
}

//睁眼
function openeye(){
	//睁右眼
	var mycanvas = document.getElementById("myCanvasTag");
	var mycontext = mycanvas.getContext("2d");
	mycontext.beginPath();
	mycontext.arc(380,150,30,0,Math.PI*2,true);
	mycontext.closePath();
	mycontext.fillStyle = "rgb(100,100,225)";
	mycontext.fill();
	//画右眼瞳孔
	mycontext.beginPath();
	mycontext.arc(380,150,10,0,Math.PI*2,true);
	mycontext.closePath();
	mycontext.fillStyle = "rgb(0,0,0)";
	mycontext.fill();
	//画右眼皮
	mycontext.beginPath();
	mycontext.arc(380,150,30,0,Math.PI,true);
	mycontext.closePath();
	mycontext.fillStyle = "rgb(200,200,200)";
	mycontext.fill();
}



	
