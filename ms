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
	
	
	
	
百度面试题：
1、html常见行内元素有哪些？
		解析：
		块级元素：div  , p  , form,   ul,  li ,  ol, dl,    h1~h6,    fieldset,  hr,   table
   		行内元素：span,   strong,   em,  br,  img ,  input,  label,  select,  textarea,  cite, 
   		行内元素与块级元素有什么不同？

		块级元素和行内元素的区别是，块级元素会占一行显示，而行内元素可以在一行并排显示。
		
		通过样式控制，它们可以相互转换。
		
		1.尺寸-块级元素和行内元素之间的一个重要的不同点
		
		设置宽度width 无效。
		设置高度height 无效，可以通过line-height来设置。
		设置margin 只有左右margin有效，上下无效。
		设置padding 只有左右padding有效，上下则无效。 
2、input的readonly和disabled有什么区别？
	disabled和readonly这两个属性有一些共同之处，比如都设为true，则form属性将不能被编辑，
	往往在写js代码的时候容易混合使用这两个属性，其实他们之间是有一定区别的：

    如果一个输入项的disabled设为true，则该表单输入项不能获取焦点，
    用户的所有操作（鼠标点击和键盘输入等）对该输入项都无效，
    最重要的一点是当提交表单时，这个表单输入项将不会被提交。
    
    而readonly只是针对文本输入框这类可以输入文本的输入项，
    如果设为true，用户只是不能编辑对应的文本，但是仍然可以聚焦焦点，
    并且在提交表单的时候，该输入项会作为form的一项提交。 		
    
3、html5新增了哪些标签，input新增了哪些类型
	HTML5 新增结构元素分为主体结构元素和非主体结构元素
	
	1.主体结构元素包括 article、section、nav、aside、time
	2.非主体结构元素包括 header、hgroup、footer、address
	
	在HTML5中，input元素新增了一些类型，
	有email邮件类型、number数字类型、range数字滑动条、url地址类型、date日期类型及search搜索类型。
	
4、用css实现div.left,div.right左右等高布局
	div.parent> div.left+div.right
	.parent{
		height:200px;
	}	
	.left,.right{
		float:left;
		height:inherit;
	}	
	上网搜：等高布局http://www.3lian.com/edu/2011/11-13/15365.html

5、css的伪类有哪些
		:active 	向被激活的元素添加样式。 
		:focus 	向拥有键盘输入焦点的元素添加样式。
		:hover 	当鼠标悬浮在元素上方时，向元素添加样式。 	
		:link 	向未被访问的链接添加样式
		:visited 	向已被访问的链接添加样式
		:first-child 	向元素的第一个子元素添加样式
		:lang 	向带有指定 lang 属性的元素添加样式
		
6、写出程序运行的结果？
	alert(typeof(null))      object
	alert(typeof(undefined))    undefined
	alert(typeof(NaN))				number
	alert(NaN == undefined)				false
	
	var str = "123abc"
	alert(typeof(str++))			number	//此时输出str++为NaN
	alert(str)							NaN
	
	-----------------------
	var x =1,y=z=0;
	function add(n){
		return n = n + 1;
	}
	y = add(x);		//2
	z = add(x);		//2
	--------------------
	var myObject = {
		num:2,
		add:function(){
			this.num = 3;
			(function(){
				alert(this.num);			//undefined
				this.num = 4;
			})();
			alert(this.num);				//3
		}
	}
	myObject.add();//先 是undefined，然后是3
	-------------------------
	
	var i =0;
	for(i =0;i++<3;){
		setTimeout(function(){
			return function(){console.log(i);}
		}(),0);
	}
	//输出23，3个4，继续执行输出26，3个4；
	
	
	
7、js的继承方式有哪几种？


8、写出一个给数组排重的函数
		function unique(arr) {
		  var ret = []
		  var hash = {}
		
		  for (var i = 0; i < arr.length; i++) {
		    var item = arr[i]
		    var key = typeof(item) + item
		    if (hash[key] !== 1) {
		      ret.push(item)
		      hash[key] = 1
		    }
		  }
		
		  return ret;
		}

9、写出一个函数序列号出URL上问号的参数
	例如：URL = http://3g.baidu.com?search=list&user=john&page=news
	解出：{"search":"list","user":"john","page":"news"}	
	
	
	
随便问的：
	jsonp原理及简单实现：
	
	http://www.travisup.com/post/index/28
	
    typeof 会返回几种类型
	    typeof(1): number
		typeof(NaN): number
		typeof(Number.MIN_VALUE): number
		typeof(Infinity): number
		typeof("123"): string
		typeof(true): boolean
		typeof(window): object
		typeof(document): object
		typeof(null): object
		typeof(eval): function
		typeof(Date): function
		typeof(sss): undefined
		typeof(undefined): undefined
    
    
    网页中的SEO，
    
    angularjs的缺点
    
    项目文件目录架构
    
    项目中功能拆分，js,css,html
    
    
    //冒泡和捕获的执行示例
    addEventListener("click",callback,false);
  	addEventListener("click",callback,true);//两者的区别
  	
  	sass的举例
		
	new 一个对象时发生了什么	
		