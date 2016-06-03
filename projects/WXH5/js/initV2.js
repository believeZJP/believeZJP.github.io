		var list = [{
			content: document.getElementById('pic1')
		}, {
			content: document.getElementById('pic2')
		}];
		/*var list = [{
			content: 'img/bg03.png'
		}, {
			content: 'img/bg02.png'
		}];*/
		/*var list = [{
			content: document.querySelector("#pic1")
		}, {
			content: 'img/bg02.png'
		},{
			content: document.querySelector("#pic1")
		}, {
			content: 'img/bg02.png'
		}
		];*/
		var S;
		initSlider();
		function initSlider() {
//			document.querySelector("#pic2").style.display = "block";
//			document.querySelector("#pic1").style.display = "block";
			
			S = new iSlider({
				dom: document.getElementById('iSlider-wrapper'),
				data: list,
				isLooping: 1,
				animateTime: 800, // ms
				fillSeam:true,
//				isOverspread: 1,
				oninitialized: initCall
			});
			S.hold();//刚开始不可以拖动;
		}
		function initCall(){
			window.setTimeout(function() {
				//以下显示遮罩层
				var winHeight2 = document.documentElement.clientHeight;
				var winHeight = window.screen.height;
				
				winHeight = winHeight2;
				
//				var winHeight = "";
//				document.getElementsByClassName("islider-pic")[0].scrollHeight;
//				var str ="<br/>li的高度"+ winHeight+"screenHeight"+winHeight+"__clientHeight:"+winHeight2+""+"innerHeight"+window.innerHeight;
				var flag = false;
				var gap = 0;
		/*		if(winHeight>winHeight2){
					flag = true;
					gap = winHeight - winHeight2;
					winHeight = winHeight2;
				}*/
//				document.getElementById("msg").textContent  = "差距"+gap+str;
				console.log(winHeight);
//				console.log(winHeight +":"+winHeight2);
				var mask = document.getElementsByClassName("mask")[0];
				mask.style.height = winHeight + "px";
				mask.style.display = "block";
				//判断屏幕和实际图片的缩放比
				var rate = parseInt((winHeight/1334)*800);
				
				if(flag){
					rate += gap;
				}
				rate = parseInt(rate)+"px";
				mask.getElementsByClassName("guidArea")[0].style.top = rate;
				
				
				window.setTimeout(function() {
					S.unhold();//可以拖动
					//删除遮罩层
					mask.style.display = 'none';
					//添加手势指引
					var guide = document.getElementsByClassName("guideGesture")[0];
					var rate2 = (winHeight/1334)*982;
					if(flag){
						rate2 += gap;
					}
					
					guide.style.top = parseInt(rate2)+"px";
					guide.style.display = "block";
				}, 2000);
			}, 500);
		}
		S.on('slide', slideCallBack);
		function slideCallBack(num, dom) {
			var gesture = document.getElementsByClassName("guideGesture")[0];
			gesture.style.display = "none";
			S.off("slide",slideCallBack);
		}