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
	
    
    
    网页中的SEO，
    http://jingyan.baidu.com/article/915fc414c5f3d351384b206b.html
    
    angularjs的缺点
    	答：方便的REST,
    		  MVVM救星：
    		  		Model将和ViewModel互动（通过$scope对象），将监听Model的变化。
    		  		这些可以通过View来发送和渲染，由HTML来展示你的代码。
    		  		View可以通过$routeProvider对象来支配，
    		  		所以你可以深度的链接和组织你的View和Controller，
    		  		将他们变成导航URL。AngualrJS同时提供了无状态的Controller，可以用来初始化和控制$scope对象。
    		  数据绑定和依赖注入：
    		  		在MVVM设计模式中的任何东西无论发生任何事情都自动的和UI通信。
    		  		这帮助我们去除了wrapper，getter/setter方法或者class定义。
    		  		AngularJS将帮助我们处理所有的这些内容，
    		  		所以你可以处理数据像处理基本javascript数据类型，
    		  		例如，数组一样简单。当然你也可以通过自定义处理复杂数据。
    		  		正因为所有事情的发生都是自动的，
    		  		所以你不必调用一个main()来执行你的代码，而是通过依赖关系来驱动。
    		  可扩展的html
    		  		可以操作XML一样操作HTML，用无穷的方式来完成标签和属性定义。
    		  		AngularJS通过自己的编译器和directives来完成相关的设置。
    		  使用html模版
    		  企业级别的测试
    		  		Angular的单元测试和Scenario Runner
    		  
    		  
    		  缺点：
    		  		Angular 太笨重了，没有让用户选择一个轻量级的版本，
    		  		，学习曲线陡峭，不支持IE6~8，
    		  		实现机制极其复杂，比如脏检查，性能低。由于跳崖式的更新，学习更加陡峭，
    				
    				在 Controller 里面如果要定时更新一个东西，
    				用 setInterval / setTimeout 是不可以的，要用它自己的 $interval / $timeout，这算是设计缺陷吧。
    
    
    项目文件目录架构
    
    项目中功能拆分，js,css,html
    
    
    //冒泡和捕获的执行示例
    addEventListener("click",callback,false);
  	addEventListener("click",callback,true);//两者的区别
  	
  	
  	捕获，从外到内，冒泡，从内到外
  	sass的举例
		
	new 一个对象时发生了什么	
		
		
	css:
	
	bfc:	
		
	box-sizing:
		1.border-box:		width=border+padding+content	
									为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
		2.content-box:   	width=content  
									在宽度和高度之外绘制元素的内边距和边框。
	
	
	transition:
	animation:
	transform:
	什么时候触发
	
	两列布局，左边一个图片，右边文字，文字只在右边，不在左边，宽度不固定，
	先是宽度固定，然后是宽度不固定，
	overflow:hidden;来解决。
	
	png 和jpg的格式有什么区别，分别在什么情况下使用
	
内容照片基本都是jpg的，就是颜色很丰富的图片基本都是用jpg的，但界面的上因为颜色较少，用png或gif会更小，并且质量也会比jpg高。
	
	png格式各个区别
	
	mediaquery
	
	line,block 区别
	
	
	js:
	
		作用域，
		原型链，
		this
		
		
		//js变量有哪些
		1、用typeof检测js变量类型
		typeof(8) //number
		typeof(true) //boolean
		typeof("abc")	//string
		typeof(abc) 		//undefined
		typeof(function(){})		//function
		typeof([1,2,3])				//object
		typeof(new Number(8))	//object
		typeof(null)					//object
		
		2、typeof只能判断值类型，如何检测object类型
		instanceof
		
		var obj = [];
		obj instanceof Object		//true
		obj instanceof Array			//true
		var func = function(){};
		console.log(func instanceof Object);			//true
		
		
		3、对象都是通过函数创建的
		eg:var a = [1,2]; 
			//等价于
			var a = new Array();
			a[0] = 1;a[1] = 2;
		
		4、函数也是对象，函数也是通过函数创建的
		eg:
			var func = function(x){alert("hello"+x);}	
			var func = new Function('x','alert("hello"+x);'}
			console.log(func("xiaoming"));
			
		5、js对象
			对象只有属性，方法也是属性，属性可以是对象
			可以任意添加属性-------重要的特点
			eg：
				var obj = {
						a:3,
						b:function(){console.log(this.a);},
						c:{num:8}		
				};
		
			eg:
				var func = function(){console.log('xiaoming')}
				func.a = 3;
				func.b = {num:8};
			
			jQuery 的$是个函数，当然也是对象
			typeof($)//function
		
		6、js原型
			1、每个函数都有一个prototype属性
			2、每个对象都有一个__proto__隐式原型
			3、__proto__指向创建函数的prototype
			
			function func(){}
			var f = new func();
			f.a = 8;
			func.prototype.a = 9;
			func.prototype.b = 'ming';
			console.log(f.a);//f的属性
			console.log(f.b);//f的原型的属性
			console.log(f.hasOwnProperty('a'));
			
			var func = function(){}
			var obj = {};
			func.prototype //func{}
			obj.prototype  //undefined
			obj.__proto__	//Object{}
			func.__proto__	//function Empty(){}
			Object.prototype //Object{}
			Function.prototype  //function Empty(){}
		7、js原型链
			var a = {a:'a'};
			function B(){}
			B.prototype = a;
			var b = new B();
			b.b = 'b';
			function C(){};
			C.prototype = new B();
			//C.prototype = b;
			var c = new C();
			//c.prototype = b;
			c.c = 'c';
			console.log(c.a+','+c.b+','+c.c);
			
		8、js原型判断
			//instanceof 判断对象类型
			console.log(Function instanceof Object);
			console.log(Object instanceof Function);
			console.log(Function instanceof Function);
			
			
		call，apply
		参数传递不同，
		技巧：apply,array ,所以apply传数组
		func.call(obj,'ming');
		func.apply(obj,['ming'])
		
		1、apply的好处
		eg:	
			//取最大值函数
			alert(Math.max(1,3,5));
			//不能传数组
			alert(Math.max([1,3,5]));//×
			//多个值传递都要放到参数里
			alert(Math.max.call(null,1,3,5));
			//apply 传数组
			alert(Math.max.call(null,[1,3,5]));
		
			var a1 = [1,2];
			var a2 = [3,4];
			//数组合并，用push，push不能传数组
			a1.push(a2);//[1,2,[3,4]]
			//apply所有参数作为数组传递
			Array.prototype.push.apply(a1,a2);//[1,2,3,4]
		
		
		this实现继承,多重继承
			eg:
				function Parent(){
					this.add = function(a,b){console.log(a+b);}
				}
				function Child(){
					Parent.call(this);
			//		Parent.apply(this,arguments);
				}
				var cls = new Child();
				cls.add(3,2);
		
		原型链实现继承
		function Parent(){ this.add = function(a,b){console.log(a+b);}}
		Parent.prototype.sub = function(a,b){console.log(a-b);}
		function Child(){}
		Child.prototype = new Parent();
		var cls = new Child();
		cls.__proto__.constructor = Child
		cls.add(3,2);
		cls.sub(3,2);
		
		
		
		原型链与call继承区别
		1、call继承相当于类继承，原型链继承相当于组合继承
		2、call继承会复制父类的所有属性，原型链是引用
		3、call继承无法继承父类的原型链，原型链是链式继承
		
		js作用域
		eg:
			var a = 8;
			function func(){console.log(a);}
			function callfunc(f){
				var a = 9;
				f();
			}
			callfunc(func);//8
			//函数定义时确定作用域，而不是由调用的时候来确定的
			
			var obj = {
				a:8,
				func:function(){
					console.log(this.a);
				}	
			}
			//作为对象属性
			obj.func();//8
			//作为独立函数
			var f = obj.func;
			f();//undefined;
			
			
			var a = 8;
			var obj = {
				a:9,
				func:function(){
					function f(){
						console.log(this.a);
					}
					f();
				}
			}
			obj.func();//8
			//obj不是作用域，不会在obj中找
			//作用域只有函数作用域和全局作用域！！！
			
			var a = 8;
			function func(){
				var a =9;
				function func2(){console.log(a);}
				return func2();
			}
			var f = func();
			f();//9
			//创建函数时确定作用域
			
			var a = 8;
			function func(){
				var a =9;
				function func2(){console.log(a);}
				return func2();
			}
			(function(f){
				var a = 10;
				f();
			})(func1);//a= 9;创建函数的作用域决定，而不是调用作用域
			
			var a = 8;
			function func(a){
				return function(){
					console.log(a);
				}
			}
			var f = func(9);
			f();//a = 9;闭包
			
			
			js闭包
			函数执行上下文
			闭包的外层上下文不能释放
			使用闭包会增加内存开销
			
			function func1(){
				var n = 1;
				funcAdd = function(){n+=1;console.log(n);}
				function func2(){alert(n);}
				return func2;
			}
			var result = func1();
			result();//1
			funcAdd();//2 ,闭包的上下文都需要保存
			result();//2
			
			jQuery 闭包运行
			var a = 8;
			(function(window){
				var a = 9;
				console.log(a);
			})(window);
			
			
			
php:
	tcp udp 区别
	php调试用什么
	定义一个常量
	xss csrf
db:
	设计一个表，users,用来表示用户之间的关联，
	筛选出朋友大于100的男性用户
	having,groupby ,
css:
	display visibility区别
	margin,padding;
	加载页面时，让一个元素隐藏
	display各属性区别
	举出平常用到的css在各浏览器间差异的例子，
http:
	状态分别是什么，
	401，403
js:
	单例模式，应用场景
	amd,cmd，
	常用的js
	vue.js
	socket.io
	cdn
	
unix ：0









			
			
			
			常见js面试题
			1、js函数是不是对象？有什么区别
				答：是，是一种特殊的对象，并且所有的对象都是通过函数创建的
			2、js如何实现继承
				答：call,原型
			3、多个js,避免函数名冲突
				答：命名空间，模块开发
			4、
				f = function(){return true;};
				g = function(){return false;};
				(function(){
					if(g() && ([] == ![])){
						f = function(){return false;};
						 function g(){return true;};
						//g = function (){return true;};
					}
				})();	
				console.log(f());//false
				//初始化运行时，已经将f和g改写了，
				所以运行f()时，g已经成了return true;,f也成了return false;
			
			
			
			我用过的插件列表：
				1.superslider  http://www.superslide2.com/
				2.滚动条：http://manos.malihu.gr/jquery-custom-content-scroller/
						注意，要引用mousewheel.min.js
				3.遮罩层，弹出框  layer   http://layer.layui.com/
				4.左右滑块	Ion.RangeSlider  
						http://ionden.com/a/plugins/ion.rangeSlider/demo.html
				5.滑块滚动条	http://refreshless.com/nouislider/  项目用的
				6.颜色选择器	http://www.andreacrofts.codes/spectrum/
				7.jscrollbar https://github.com/daiying-zhang/jquery.jscrollbar
			
			
			问题积累：
				1.AngularJS 数据双向绑定揭秘，怎么实现的？
				2.事件委托
			//	3.live,bind,click ,delegate区别
				4.api按照restful风格设计
				5.前端架构选型
				6.gitflow工作流
				
				