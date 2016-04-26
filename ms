1.判断字符串是否是这样组成的，第一个必须是字母，后面可以是字母、数字、下划线，总长度为5-20
	var c = /^[a-z|A-Z]{1}[/w|_]{4,19}/;

	c.test(‘str’);
2.截取字符串abcdefg的efg
	var a = "abcdefg"
	a.substr(a.length-3,a.length-1)
	"efg"
	
	
	
3.让一个input的背景颜色变成红色
	background-color: red;
	
4。给一个页面，写html css	
	
5。div的高宽等于浏览器可见区域的高宽，浏览器滚动，div始终覆盖浏览器的整个可见区域
		window.onscroll = function(){
            var divObj = document.getElementByIdx_x_x("floatDiv");
            var topDistance = parseInt(document.documentElement.scrollTop + document.body.scrollTop);
            divObj.style.top = topDistance + "px";
        }
		代码说明： window.onscroll 屏幕滚动事件
           document.documentElement.scrollTop 或者 document.body.scrollTop为：网页被卷去的高。
           代码中 document.documentElement.scrollTop + document.body.scrollTop，之所以这么写，是因为：IE,Firefox识别document.documentElement.scrollTop,而在chrome里面，这个则为0，chrome识别document.body.scrollTop。
6。判断一个字符串中出现次数最多的字符，统计这个次数
	var str = “abcdefgaaaaaaddda”;
	var obj = {};
	var arr = [];
	var letter;
	for(var i = 0,len = str.length;i<len;i++){
		letter = str[i];
		if(!obj[letter]){
			obj[letter] = 1;
		}else{
			obj[letter]++;
		}
	}
	var max_key,max_num=0;
	for(key in obj){
		if(max_num <obj[key]){
		max_num = obj[key];
		max_key = key;
	}
	
	document.write(“字母：”+max_key+”　次数：”+max_num);
7。IE与FF脚本兼容性问题
	(1) window.event： 
	表示当前的事件对象，IE有这个对象，FF没有，FF通过给事件处理函数传递事件对象 

	(2) 获取事件源 
	IE用srcElement获取事件源，而FF用target获取事件源 

	(3) 添加，去除事件 
	IE：element.attachEvent(“onclick”, function) element.detachEvent(“onclick”, function) 
	FF：element.addEventListener(“click”, function, true) element.removeEventListener(“click”, function, true) 

	(4) 获取标签的自定义属性 
	IE：div1.value或div1[“value”] 
	FF：可用div1.getAttribute(“value”) 

	(5) document.getElementByName()和document.all[name] 
	IE；document.getElementByName()和document.all[name]均不能获取div元素 
	FF：可以 

	(6) input.type的属性 
	IE：input.type只读 
	FF：input.type可读写 

	(7) innerText textContent outerHTML 
	IE：支持innerText, outerHTML 
	FF：支持textContent 

	(8) 是否可用id代替HTML元素 
	IE：可以用id来代替HTML元素 
	FF：不可以 
	
	