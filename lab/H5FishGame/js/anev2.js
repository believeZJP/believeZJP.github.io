//海葵的js
//动画 二次贝塞尔曲线，正弦曲线
var aneObj = function(){
	//起始点，控制点，结束点
	this.rootx = [];//起始x,y 为固定，在底部
	//控制点在起始点正上方，不用定义
	this.headx = [];//海葵x点的值
	this.heady = [];//结束点y
	this.alpha = 0;
	this.amp = [];//每个海葵的振幅
}

aneObj.prototype.num = 50;
//为每一个海葵初始化x,和高
aneObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.rootx[i] = i*16 + Math.random()*20;//[0,1)
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
//		this.len[i] = 200 + Math.random() * 50;
	}
}
aneObj.prototype.draw = function(){
	
	this.alpha += deltaTime * 0.0008;//调整摇摆的频率 
	var l = Math.sin(this.alpha);//[-1,1]
	
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	//每个海葵都一样，在外边设置即可。
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	for (var i = 0; i < this.num; i++) {
		//beginPath,moveTo,lineTo,stroke ,strokeStyle,lineWidth,lineCap,globalAlpha
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];//记录当前海葵的位置
		//此处可以调整海葵控制点的高度
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
	//save,restore说明：在这两个之间的设置只会在这两个之间起作用。
}
