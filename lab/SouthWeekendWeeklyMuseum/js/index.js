var screen_width = 0, start_pos = 0, move_pos = 0, end_pos = 0;
var detail_screen_width = 0, detail_start_pos = 0, detail_move_pos = 0, detail_end_pos = 0;
// 阻止IOS屏
document.addEventListener('touchmove', function(event) {
    if(event.target.type == 'range') return;
    event.preventDefault();
});

// 调整画面挤满高度
function adjustScreen () {
	var w = $(window).width();
	var h = $(window).height();
	var oringin_w = 3840;
	var oringin_h = 568;
	var rate = h/oringin_h;
	var dest_h = h;
	var dest_w = oringin_w*rate;

	// 赋值
	$('#swipe').css({'width':dest_w,'height':dest_h});
	$('.inner').css({'zoom':rate});
	screen_width = -Math.floor((dest_w-w));

	var dh = $('#detail-wrap').height()-h;
	if(dh>0){
		detail_screen_width = -Math.floor(dh);
	}
	else{
		detail_screen_width = 0;
	}
}

window.onload= function() {
	adjustScreen();
}
$(window).resize(function() {
	adjustScreen();
});

//预加载
var LoadImage = function(obj){
	this.newimages = [];
    this.count = 0;
    this.arr = (typeof obj.imgs!="object")? [obj.imgs] : obj.imgs;
    this.len =this.arr.length;
    this.per=(1/this.len);
    this.loading = obj.loading;
    this.done = obj.done;
    this.Run();
};
LoadImage.prototype.imageloadpost = function() {
	var self = this,num=null;
    self.count++;
    num = self.count*self.per;
    num = parseInt(num*100);
    $('#percent').text(num+'%');

    // 完成loading
    if (self.count==self.len){
    	$('#percent').text('100%');
        $('#swipe').css('opacity',1);
        $('#loading').css('opacity',0);
        setTimeout(function(){
	        $('#loading').remove();
        },1000);
    }
};
LoadImage.prototype.Run = function() {
	var self = this;
    for (var i=0; i<self.arr.length; i++){
        self.newimages[i]=new Image();
        self.newimages[i].src=self.arr[i];
        self.newimages[i].onload=function(){
            self.imageloadpost();
        }
        self.newimages[i].onerror=function(){
            self.imageloadpost();
        }
    }
};

var MyLoadImage = new LoadImage({
	imgs: [
		'http://i3.tietuku.com/c41599c8f75e9313.jpg',
		'img/loading-title.png',
		'img/loading-txt.png',
		'img/loading-box.png',
		'img/logo.png',
		'http://i3.tietuku.com/7b6d97d7a4e15e08.png',
		'img/arrow1.png',
		'img/arrow2.png',
		'http://i1.tietuku.com/eb607354515818d6.png',
		'http://i1.tietuku.com/d199e4c16cb290ca.png',
		'http://i1.tietuku.com/3cab861637c4f73d.png',
		'http://i1.tietuku.com/8698aa6c2a63ce73.png',
		'http://i3.tietuku.com/bd11b94a67a038ac.png',
		'http://i1.tietuku.com/a46c7aa6ec2cb305.png',
		'http://i3.tietuku.com/cc818763c5af3c33.png',
		'http://i1.tietuku.com/71db5a14460f8e97.png',
		'http://i1.tietuku.com/f46b17a581bc4b17.png',
		'http://i1.tietuku.com/ec4a04af9ed8b6a5.png',
		'img/firstlight.png',
		'img/firstlightbar.png',
		'img/lightoff.png',
		'img/lighton.png',
		'img/stairtips.png',
		'img/stairtips2.png',
		'img/stone.png',
		'img/share-tips.png',
		'img/detail-wallhd.png',
		'img/detail-close.png',
		'img/detail-light.png',
		'img/detail-lightbar.png',
		'img/share-arrow.png'
		]
});

// 音频播放
document.getElementById('audio').play();

// 翻页效果
$('#swipe').bind('touchstart', function(e) {
	start_pos = e.touches[0].clientX;
	if(start_pos>0||start_pos<screen_width){return;}
});
$('#swipe').bind('touchmove', function(e) {
	move_pos = e.touches[0].clientX - start_pos + end_pos;
	if(move_pos>0||move_pos<screen_width){e.preventDefault();return;}
	$(this)[0].style.webkitTransform = "translateX("+move_pos+"px)";
});
$('#swipe').bind('touchend', function(e) {
	if(move_pos>0){end_pos = 0;return;}
	else if(move_pos<screen_width){end_pos = screen_width;return;}
	else{
		end_pos = move_pos;
	}
});

// 大图浮层
$('#detail-wrap').bind('touchstart', function(e) {
	detail_start_pos = e.touches[0].clientY;
	if(detail_start_pos>0||detail_start_pos<detail_screen_width){return;}
});
$('#detail-wrap').bind('touchmove', function(e) {
	detail_move_pos = e.touches[0].clientY - detail_start_pos + detail_end_pos;
	if(detail_move_pos>0||detail_move_pos<detail_screen_width){e.preventDefault();return;}
	$(this)[0].style.webkitTransform = "translateY("+detail_move_pos+"px)";
});
$('#detail-wrap').bind('touchend', function(e) {
	if(detail_move_pos>0){detail_end_pos = 0;return;}
	else if(detail_move_pos<detail_screen_width){detail_end_pos = detail_screen_width;return;}
	else{
		detail_end_pos = detail_move_pos;
	}
});

// btn
$('.hook').bind('click',function (e) {
	$('#detail-wrap').removeClass('detail-wrap-hide');
	// 大图浮层动画0.9变1，因此高度要补回去10/9和误差
	var wraph = $('#detail-wrap').height()*10/9 + 10;
	var h = $(window).height();
	var dh = wraph-h;
	if(dh>0){
		detail_screen_width = -Math.floor(dh);
	}
	else{
		detail_screen_width = 0;
	}
});
$('.btn-share').bind('touchstart',function(e) {
	$('#share-wrap').removeClass('hide');
});
$('#share-wrap').bind('touchstart',function(e) {
	$('#share-wrap').addClass('hide');
});
$('#detail-wrap .close').bind('touchstart',function(e) {
	$('#detail-wrap').addClass('detail-wrap-hide');
});