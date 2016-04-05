//果实的js
var fruitObj = function(){
	this.alive = [];//水果池
	//果实的成熟和未成熟的状态区分
	this.orange = new Image();
	this.blue = new Image();
	//初始坐标要保存起来
	this.x = [];
	this.y = [];
	this.aneNO = [];
	this.spd = [];//每个果实都有不同的上升速度
	this.l = [];//每一个出生时的大小
	this.fruitType = [];//果实类型那个的数组
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;
		this.spd[i] = Math.random()*0.017 + 0.003//[0.003,0.02)
		this.fruitType[i] = "";//初始化为空
		this.born(i);
	}
	this.orange.src = "img/fish/fruit.png";
	this.blue.src = "img/fish/blue.png";
}

fruitObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {
		//开始画果实
		//找到一个海葵，长大，向上飞
		if (this.alive[i]) {//如果是活的，则长大，等
			
			//添加海葵分类图片
			if (this.fruitType[i] == "blue") {
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}
			
			//海葵逐渐长大
			if(this.l[i] <=14){//长大到一定程度就不再长
				var NO = this.aneNO[i];
				
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				
				this.l[i] += this.spd[i] * deltaTime;//保证游戏的流畅，凡是遇到时间变量相关的，记得用deltaTime
			}else{
				//长大以后就开始往上飘
				this.y[i] -= this.spd[i] * 7 * deltaTime;
			}
	//		ctx2.drawImage(this.orange,this.x[i]- this.orange.width *0.5,this.y[i] - this.orange.height *0.5);//要减去每个图片的宽高的1/2
			ctx2.drawImage(pic,this.x[i]- this.l[i] *0.5,this.y[i] - this.l[i] *0.5,this.l[i],this.l[i]);//随着长大的过程，图片大小也要发生变化
			
			if(this.y[i] < 10){//如果飘出去了，则置死
				this.alive[i] = false;
			}
		}
		
		
		
	}
}
//生成一个海葵
fruitObj.prototype.born = function(i){
	//可以在这里加一个去重的方法，生成的就不再生成了TODO 
//	var aneId = Math.floor(Math.random() * ane.num);
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	
//	this.x[i] = ane.headx[aneId];
//	this.y[i] = ane.heady[aneId];
//	this.x[i] = ane.x[aneId];
//	this.y[i] = canHeight - ane.len[aneId];
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran <0.2){
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}
}
//果实被吃掉
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

//果实监视器，使果实控制在一定数量内
function fruitMonitor(){
	var num = 0;
	for (var i=0;i<fruit.num;i++) {
		if(fruit.alive[i]) num++; 
	}
	if (num<15) {
		//生成一个果实
		sendFruit();
		return;
	}
}
//生成果实的方法
function sendFruit(i){
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}





fruitObj.prototype.update = function(){
	var num = 0;
	
}
