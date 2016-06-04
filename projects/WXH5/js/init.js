var list = [{
			content: 'img/bg03.png'
		}, {
			content: 'img/bg02.png'
		}];
		var S;
		initSlider();
		function initSlider() {
			S = new iSlider({
				dom: document.getElementById('iSlider-wrapper'),
				data: list,
				isLooping: 1,
				animateTime: 800, // ms
				isOverspread: 1,
				oninitialized: initCall
			});
			S.hold();//刚开始不可以拖动;
		}
		function initCall(){
			window.setTimeout(function() {
				console.log("2s以后输出");
				//以下显示遮罩层
				var winHeight = window.screen.height;
				var mask = document.getElementsByClassName("mask")[0];
				mask.style.height = winHeight + "px";
				document.getElementsByClassName("mask")[0].style.display = "block";
				window.setTimeout(function() {
					S.unhold();//可以拖动
					//删除遮罩层
					mask.style.display = 'none';
					//添加手势指引
					document.getElementsByClassName("guideGesture")[0].style.display = "block";
				}, 2000);
			}, 2000);
			console.log('加载完了');
		}
		S.on('slide', slideCallBack);
		function slideCallBack(num, dom) {
			var gesture = document.getElementsByClassName("guideGesture")[0];
			gesture.style.display = "none";
			S.off("slide",slideCallBack);
		}