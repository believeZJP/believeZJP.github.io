window.onload = function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var types = ["Arc2D.OPEN","Arc2D.CHORD","Arc2D.PIE"];
	var CLOSE = 0;
	var OPEN = 1;
	
	var FORWARD = 0;
	var BACKWARD = 1;
	var DOWN = 2;
	var UP = 3;
	
	var aw = 20;
	var ah = 20;//动画圆的宽和高
	var x = 30;
	var y = 30;
	var angleStart = 45;
	var angleExtent = 270;
	var mouth = CLOSE;
	var direction = FORWARD;
	
	function step(w,h){
		//计算角度
		if(x+aw >=w-5 && direction ==FORWARD) direction = DOWN;
		if(y+ah >=h-5 && direction ==DOWN) direction = BACKWARD;
		if(x-aw <=5 && direction == BACKWARD) direction = UP;
		if(y-ah <=5 && direction == UP) direction = FORWARD;
		
		//计算开始角度和扩展角度
		if (mouth==CLOSE) {
			angleStart -= 5;
			angleExtent +=10;
		}
		if (mouth == OPEN) {
			angleStart +=5;
			angleExtent -=10;
		}
		if (direction==FORWARD) {
			x+=5;
			y=30;
		}
		if (direction==DOWN) {
			x = w-30;
			y +=5;
		}
		if (direction==BACKWARD) {
			x -=5;
			y = h-30;
		}
		if (direction==UP) {
			x = 30;
			y -= 5;
		}
		if (angleStart ==0) {
			mouth = OPEN;
		}
		if (angleStart >45) {
			mouth = CLOSE;
		}
	}
	
	
	function render(w,h,context){
		//画圆
		context.lineWidth = 5;
		for (var i = 0; i < types.length; i++) {
			context.lineWidth = 5;
			context.strokeStyle = "blue";
			context.beginPath();
			context.arc((i+1)*w/4,(i+1)*h/4,w/10,Math.PI/4,3*Math.PI/2,false);
			if (i==1) {
				context.closePath();
			}
			if (i==2) {
				context.lineTo((i+1)*w/4,(i+1)*h/4);
				context.closePath();
			}
			context.stroke();
			context.fillStyle = "gray";
			context.fill();
		}
		
		
		context.save();
		context.translate(x,y);
		switch(direction){
			case DOWN :context.rotate(Math.PI/2); break;
			case BACKWARD : context.rotate(Math.PI); break;
			case UP :context.rotate(Math.PI*3/2);
		}
		context.beginPath();
		
		context.arc(0,0,20,angleStart*Math.PI/180,angleExtent*Math.PI/180,false);
		context.lineTo(0,0);
		context.closePath();
		context.fillStyle = "blue";
		context.fill();
		context.restore();
		
		
		
	}
	
	var loop = setInterval(function(){
		context.clearRect(0,0,canvas.width,canvas.height);
		render(400,400,context);
		step(400,400);
	},50);
	
	
}
