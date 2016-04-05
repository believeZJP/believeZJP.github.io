//大鱼吃果实的特效
var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}

waveObj.prototype.num = 10;//初始值有10个
waveObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;//初始状态下都未激活，不需要绘制
		this.r[i] = 0;
	}
}

waveObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	for (var i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			this.r[i] += deltaTime * 0.04;
			if (this.r[i]>50) {
				this.alive[i] = false;//消失
				break;
			}
			var alpha = 1 - this.r[i] / 50;
			
			//如果活着，则绘制
			//画圆的api
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255,255,255,"+alpha+")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}

waveObj.prototype.born = function(x,y){
	for (var i = 0; i < this.num; i++) {
		if (!this.alive[i]) {
			//生一个出来
			this.alive[i] = true;
			this.r[i] = 10;//有个初始半径
			this.x[i] = x;
			this.y[i] = y;//出生位置确定
			return;
		}
	}
}
