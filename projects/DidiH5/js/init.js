
//音乐播放停止代码
var audioOn = true;
var audio = $("#audio")[0];
$(".myAudio").on("tap",function(){
	if(audioOn){
		audio.pause();
		$(this).addClass("stop");
	}else{
		audio.play();
		$(this).removeClass("stop");
	}
	audioOn = !audioOn;
});
function autoPlay(){
	if (audioOn) {
		audio.play();
		$(".myAudio").removeClass("stop");
		$("body").off("touchstart",autoPlay);
	}	
};
autoPlay();
//浏览器不自动循环播放fix
$("body").on("touchstart",autoPlay);


//横竖屏检测
function hengshuping(){
	if(window.orientation == 180 || window.orientation == 0){
		$(".hp").hide();
		$(".pageHome,.swiper-container").show();
	}
	if(window.orientation ==90 || window.orientation ==-90){
		$(".hp").show();
		$(".pageHome,.swiper-container").hide();
	}	
};
hengshuping();
window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', hengshuping, false);

