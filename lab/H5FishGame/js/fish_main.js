var can1,can2,ctx1,ctx2;
var lastTime,deltaTime; //上一次的时间，每一帧的间隔时间
document.body.onload = game;

var bgPic = new Image();
var ane;
var fruit;
var mom;
var baby;

var mx,my;//鼠标位置


var babyTail = [];//小鱼尾巴的图片数组
var babyEye = [];//眼睛的图片数组
var babyBody = [];//小鱼身体

var momTail = [];//大鱼尾巴对象数组
var momEye = [];//大鱼眼睛

var momBodyOra =[];//大鱼橙色身体
var momBodyBlue = [];//大鱼蓝色身体

var data ;
var wave;
var halo;

var dust;//漂浮物
var dustPic = [];//漂浮物的图片数组
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;//先给一个初始值
	gameloop();
}

function init(){
	can1 = document.getElementById("canvas1");//鱼、垃圾、UI、圆圈
	can2 = document.getElementById("canvas2");//背景、海葵、果实
	ctx1 = can1.getContext("2d");
	ctx2 = can2.getContext("2d");
	//设置默认字体
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";
	
	can1.addEventListener("mousemove",onMouseMove,false);
	
	bgPic.src = "./img/fish/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;
	//初始化海葵
	ane = new aneObj();
	ane.init();
	
	fruit = new fruitObj();
	fruit.init();
	
	mom = new momObj();
	mom.init();
	
	baby = new babyObj();
	baby.init();
	
	//初始化鼠标位置
	mx = canWidth * 0.5;
	my = canHeight * 0.5;
	
	for (var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "img/fish/babyTail"+i+".png"
	}
	
	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src  = "img/fish/babyEye"+i+".png";
	}
	//小鱼身体图片数组初始化
	for (var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "img/fish/babyFade"+i+".png";
	}
	
	//大鱼尾巴
	for (var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = "img/fish/bigTail"+i+".png"
	}
	//大鱼眼睛
	for (var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src  = "img/fish/bigEye"+i+".png";
	}
	
	data = new dataObj();//分值计算的类
	
	//大鱼身体颜色变化数组初始化
	for (var i = 0; i < 8; i++) {
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "img/fish/bigSwim"+i+".png"
		momBodyBlue[i].src = "img/fish/bigSwimBlue"+i+".png"
	}
	wave = new waveObj();
	wave.init();
	
	halo = new haloObj();
	halo.init();
	
	//初始化漂浮物的图片数组
	for (var i = 0; i < 7; i++) {
		this.dustPic[i] = new Image();
		this.dustPic[i].src = "img/fish/dust"+i+".png";
	}
	dust = new dustObj();
	dust.init();
	
}

function gameloop(){
	requestAnimationFrame(gameloop);//优于setinterval 和settimeout,自动根据机器性能执行帧频率
	var now = Date.now();
	deltaTime = now -lastTime;
	lastTime = now;
	if (deltaTime > 40) {
		deltaTime = 40;//用于切换标签，引发deltaTime过大，导致果实变的特别大的问题。
	}
	drawBackground();	
	
	ane.draw();//每次刷新都绘制海葵
	fruitMonitor();//每次都要判断果实数量
	fruit.draw();//绘制果实
	
	//先要清除画布上的所有内容
	ctx1.clearRect(0,0,canWidth,canHeight);
	//绘制大鱼
	mom.draw();
	//绘制小鱼
	baby.draw();
	//大鱼果实碰撞检测
	momFruitsCollision();
	//大鱼小鱼碰撞检测
	momBabyCollision();
	
	//分数的绘制
	data.draw();
	
	//大鱼吃果实圆圈的绘制
	wave.draw();
	//大鱼救小鱼的圆圈绘制
	halo.draw();
	
	dust.draw();//漂浮物的绘制
}


function onMouseMove(e){
	if (!data.gameOver) {//游戏没结束，才能用鼠标控制大鱼，
		if (e.offsetX || e.layerX) {
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
		
	}
}
