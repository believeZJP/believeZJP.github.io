var momObj = function(){
	this.x;
	this.y;
//	this.bigEye = new Image();
//	this.bigBody = new Image();
//	this.bigTail = new Image();
	this.angle;
	this.momTailTimer = 0;
	this.momTailCount = 0;
	//大鱼眼睛眨动
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;
	
	//大鱼身体序列帧
	this.momBodyCount = 0;
}

momObj.prototype.init = function(){
//	this.x = 0;
//	this.y = 0;
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
//	this.bigEye.src = "img/fish/bigEye0.png";
//	this.bigBody.src = "img/fish/bigSwim0.png";
//	this.bigTail.src = "img/fish/bigTail0.png";
	 
}
momObj.prototype.draw = function(){
	//lerp x ,y 使x,y趋向于一个值运动
	this.x = lerpDistance(mx,this.x,0.98);
	this.y = lerpDistance(my,this.y,0.98);
	
	//delta angle
	//Math.atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;//-PI,PI
	
	//lerp angle大鱼的角度一直趋向于鼠标的角度
	this.angle = lerpAngle(beta,this.angle,0.6);
	
	//尾巴计数器
	this.momTailTimer +=deltaTime;
	if (this.momTailTimer > 50) {
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %=50;
	}
	
	//大鱼眼睛动画
	this.momEyeTimer += deltaTime;
	if (this.momEyeTimer > this.momEyeInterval) {
		this.momEyeTimer %= this.momEyeInterval;
		this.momEyeCount = (this.momEyeCount +1) % 2;
		if(this.momEyeCount == 0){
			this.momEyeInterval = Math.random()*1500 +2000;//[2000,3500)
		}else{
			this.momEyeInterval = 200;
		}
	}
	
	
	
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);//先移动原点，再进行旋转
	//替换大鱼尾巴为动态的
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5 + 30,-momTail[momTailCount].height*0.5);
	//动态绘制小鱼
	var momBodyCount = mom.momBodyCount;
	if (data.double == 1) {
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
		
	}
//	ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
	
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	
//	ctx1.drawImage(this.bigEye,-this.bigEye.width*0.5,-this.bigEye.height*0.5);
	
	ctx1.restore();
}


