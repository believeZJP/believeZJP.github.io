		var list = [
		{
			content: document.getElementById('pic1')
		}, {
			content: document.getElementById('pic2')
		}
		
		,{
			content:  (function () {
                var frag = document.createDocumentFragment();
                var img = new Image();
                frag.className = 'picItem';
                frag.id = 'pic1';
                img.src = "img/bg03.png";
                frag.appendChild(img);
                return frag;
            })()
		}, {
			content: (function () {
                var frag = document.createDocumentFragment();
                var img = new Image();
                frag.className = 'picItem';
                frag.id = 'pic1';
                img.src = "img/bg02.png";
                frag.appendChild(img);
                return frag;
            })()
		}
		];
		/*
		var list = [{
			content: 'img/bg03.png'
		}, {
			content: 'img/bg02.png'
		}];
		*/
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
				isOverspread: 1,
//				 animateType: 'flip',
				oninitialized: initCall
			});
			S.hold();//刚开始不可以拖动;
		}
		function initCall(){
			var maskTime = window.setTimeout(function() {
				window.clearTimeout(maskTime);
				//以下显示遮罩层
				var winHeight = document.documentElement.clientHeight;
				var winWidth = document.documentElement.clientWidth;
				var mask = document.getElementsByClassName("mask")[0];
				mask.style.height = winHeight + "px";
				mask.style.display = "block";
				//判断屏幕和实际图片的缩放比
				var isWX = isWeiXin();
				if(isWX){
					var rate = parseInt((winHeight/1334)*800 - 5 );
					var rateWidth = parseInt((winWidth/750)*384-20);
					var rateLeft = parseInt((winWidth/750)*190 +10);
					var imgHeight = parseInt((winHeight/1334)*186 -11);
				}else{
					var rate = parseInt((winHeight/1334)*800);
					var rateWidth = parseInt((winWidth/750)*384);
					var rateLeft = parseInt((winWidth/750)*190);
					var imgHeight = parseInt((winHeight/1334)*186);
				}
				
				rate = parseInt(rate);
//				var guideArea = mask.getElementsByClassName("guidArea")[0];
//				var guideImg0 = guideArea.getElementsByTagName("img")[0];
//				guideImg0.style.height = imgHeight + "px";
//				guideArea.style.width = rateWidth + "px";
//				guideArea.style.top = rate + "px";
//				guideArea.style.left = rateLeft + "px";
				var guideTime = window.setTimeout(function() {
					window.clearTimeout(guideTime);
					S.unhold();//可以拖动
					//删除遮罩层
					mask.style.display = 'none';
					//添加手势指引
					var guide = document.getElementsByClassName("guideGesture")[0];
//					var rate2 = (winHeight/1334)*987;
//					guide.style.top = parseInt(rate2)+"px";
					guide.style.display = "block";
					S.on('slide', slideCallBack);
				}, 2000);
			}, 2000);
		}
		function slideCallBack(num, dom) {
			var gesture = document.getElementsByClassName("guideGesture")[0];
			gesture.style.display = "none";
			S.off("slide",slideCallBack);
		}
		
		function isWeiXin(){
		    var ua = window.navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		        return true;
		    }else{
		        return false;
		    }
		}




// SHA1
function add(x, y)
{
  return ((x&0x7FFFFFFF) + (y&0x7FFFFFFF)) ^ (x&0x80000000) ^ (y&0x80000000);
}

function SHA1hex(num)
{
  var sHEXChars="0123456789abcdef";
  var str="";
  for(var j=7;j>=0;j--)
    str+=sHEXChars.charAt((num>>(j*4))&0x0F);
  return str;
}

function AlignSHA1(sIn){
  var nblk=((sIn.length+8)>>6)+1, blks=new Array(nblk*16);
  for(var i=0;i<nblk*16;i++)blks[i]=0;
  for(i=0;i<sIn.length;i++)
    blks[i>>2]|=sIn.charCodeAt(i)<<(24-(i&3)*8);
  blks[i>>2]|=0x80<<(24-(i&3)*8);
  blks[nblk*16-1]=sIn.length*8;
  return blks;
}


function rol(num,cnt){
  return(num<<cnt)|(num>>>(32-cnt));
}

function ft(t,b,c,d){
  if(t<20)return(b&c)|((~b)&d);
  if(t<40)return b^c^d;
  if(t<60)return(b&c)|(b&d)|(c&d);
  return b^c^d;
}

function kt(t) {
  return(t<20)?1518500249:(t<40)?1859775393:
    (t<60)?-1894007588:-899497514;
}

function SHA1(sIn)
{
  var x=AlignSHA1(sIn);
  var w=new Array(80);
  var a=1732584193;
  var b=-271733879;
  var c=-1732584194;
  var d=271733878;
  var e=-1009589776;
  for(var i=0;i<x.length;i+=16){
    var olda=a;
    var oldb=b;
    var oldc=c;
    var oldd=d;
    var olde=e;
    for(var j=0;j<80;j++){
      if(j<16)w[j]=x[i+j];
      else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);
      t=add(add(rol(a,5),ft(j,b,c,d)),add(add(e,w[j]),kt(j)));
      e=d;
      d=c;
      c=rol(b,30);
      b=a;
      a=t;
    }
    a=add(a,olda);
    b=add(b,oldb);
    c=add(c,oldc);
    d=add(d,oldd);
    e=add(e,olde);
  }
    SHA1Value=SHA1hex(a)+SHA1hex(b)+SHA1hex(c)+SHA1hex(d)+SHA1hex(e);
  	return SHA1Value.toUpperCase();
}


function SHA2(sIn)
{
  var x=AlignSHA1(sIn);
  var w=new Array(80);
  var a=1732584193;
  var b=-271733879;
  var c=-1732584194;
  var d=271733878;
  var e=-1009589776;
  for(var i=0;i<x.length;i+=16){
    var olda=a;
    var oldb=b;
    var oldc=c;
    var oldd=d;
    var olde=e;
    for(var j=0;j<80;j++){
      if(j<16)w[j]=x[i+j];
      else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);
      t=add(add(rol(a,5),ft(j,b,c,d)),add(add(e,w[j]),kt(j)));
      e=d;
      d=c;
      c=rol(b,30);
      b=a;
      a=t;
    }
    a=add(a,olda);
    b=add(b,oldb);
    c=add(c,oldc);
    d=add(d,oldd);
    e=add(e,olde);
  }
    SHA1Value=SHA1hex(a)+SHA1hex(b)+SHA1hex(c)+SHA1hex(d)+SHA1hex(e);
  	return SHA1Value.toLowerCase();
}