var dataObj = function(){
	this.fruitNum = 0;
	this.double = 1;//蓝色，分值加倍
	this.score = 0;//总分
	this.gameOver = false;
	this.alpha = 0;
}

dataObj.prototype.reset = function(){
	this.fruitNum = 0;
	this.double = 1;//都恢复默认状态
}
//分数绘制的方法
dataObj.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;
	
	ctx1.save();
	ctx1.fillStyle = "white";
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	ctx1.fillText("SCORE: "+ this.score,w * 0.5,h - 20);
	if(this.gameOver){//游戏结束，绘制
		this.alpha += 0.0005 * deltaTime;
		if (this.alpha > 1) {
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255,255,255,"+this.alpha +")";
		ctx1.fillText("GAME OVER!",w * 0.5,h * 0.5);
	}
	ctx1.restore();//以上设置仅在上面有效，出了restore不再生效
	
	
}
dataObj.prototype.addScore = function(){
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;//加分以后需归零
	this.double = 1;
}
