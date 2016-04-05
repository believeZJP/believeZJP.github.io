var babyObj = function(){
	this.x;
	this.y;
	this.angle;//小鱼初始化角度
//	this.babyEye = new Image();改成动态的了
	this.babyBody = new Image();
//	this.babyTail = new Image();
	
	this.babyTailTimer = 0;//小鱼尾巴计时器从0开始，计数器从0开始
	this.babyTailCount = 0;
	
	this.babyEyeTimer = 0;//小鱼眼睛计时器，计数器
	this.babyEyeCount  = 0;
	this.babyEyeInterval = 1000;//图片需要持续多长时间
	
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

babyObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
//	this.babyEye.src = "img/fish/babyEye0.png";
	this.babyBody.src = "img/fish/babyFade0.png";
//	this.babyTail.src = "img/fish/babyTail0.png";用动态的来代替
}

babyObj.prototype.draw = function(){
	//小鱼趋向于大鱼运动
	this.x = lerpDistance(mom.x,this.x,0.98);
	this.y = lerpDistance(mom.y,this.y,0.98);
	
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;//-PI,PI
	
	//lerp angle大鱼的角度一直趋向于鼠标的角度
	this.angle = lerpAngle(beta,this.angle,0.6);
	
	//小鱼尾巴的计时器
	this.babyTailTimer += deltaTime;
	if (this.babyTailTimer > 50) {//如果超过50，执行下一帧
		this.babyTailCount = (this.babyTailCount +1 ) % 8;//保持数字在0-7
		this.babyTailTimer %= 50;
	}
	
	//小鱼眼睛的计时
	this.babyEyeTimer += deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {//如果超过50，执行下一帧
		this.babyEyeCount = (this.babyEyeCount +1 ) % 2;//保持数字在0-1
		this.babyEyeTimer %= this.babyEyeInterval;
		if (this.babyEyeCount == 0) {//睁眼，下次闭眼随机
			this.babyEyeInterval = Math.random()*1500 +2000;//[2000,3500)
		}else{//闭眼200ms就睁眼
			this.babyEyeInterval = 200;
			
		}
	}
	
	
	//小鱼身体的绘制
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer >300){
		this.babyBodyCount = this.babyBodyCount +1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			//游戏结束
			data.gameOver = true;
		}
		
	}
	
	
	
	
	
	
	
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
	var babyBobyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBobyCount],-babyBody[babyBobyCount].width*0.5,-babyBody[babyBobyCount].height*0.5);
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	
	ctx1.restore();
	
}
