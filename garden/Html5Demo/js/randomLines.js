window.onload = function(){
	var can = document.getElementById("lines");
	var con = can.getContext("2d");
	var x,y,x2,y2,r,g,b;
	setInterval(line,1000);

	function line(){
				con.save();
		x = Math.floor(Math.random()*190+Math.floor(Math.random()*190));
		y = Math.floor(Math.random()*190+Math.floor(Math.random()*190));
		x2 = Math.floor(Math.random()*190+Math.floor(Math.random()*190));
		y2 = Math.floor(Math.random()*190+Math.floor(Math.random()*190));
		r = Math.floor(Math.random()*255);
		g = Math.floor(Math.random()*255);
		b = Math.floor(Math.random()*255);
		con.moveTo(x,y);
		con.lineTo(x2,y2);
		con.strokeStyle = "rgb("+r+","+g+","+b+")";
		con.lineWidth = Math.floor(Math.random()*6);
		con.stroke();

		con.restore();
		
	}
	
	var clearBtn = document.getElementById("clearLines");
	clearBtn.onclick = function(){
		con.clearRect(0,0,can.width,can.height);
	}
	
}