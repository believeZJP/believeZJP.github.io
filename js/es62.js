
/*
 * 函数的扩展
 * 
 * 函数参数的默认值
rest参数
扩展运算符
严格模式
name 属性
箭头函数
绑定 this
尾调用优化
函数参数的尾逗号
 */

//5.name属性 返回该函数的函数名
function foo(){}
foo.name;
//	对匿名函数,es5返回空字符串,es6返回实际的函数名
var f = function(){}
//es5
f.name;// ""
//es6
f.name; //"f"

(new Function).name; //Function构造函数返回函数的实例，name的值为anonymous

function foo(){}	//bind返回的函数，name会加 bound
foo.bind({}).name;	//bound foo
(function(){}).bind({}).name;		//bound

/****
 * 6.箭头函数  !!!!!!!!!!!!!
 * 终于看到箭头函数啦啦啦啦啦啦啦啦
 * 
 */

//基本用法
var f = v => v;
//等同于
var f = function(v){
	return v;
}

var f = () => 5;
//等同于
var f = function(){
	return 5;
}

var sum = (sum1, sum2) => sum1 + sum2;

var sum = function(sum1, sum2){
	return sum1+sum2;
}

//如果函数代码块多于一行, 用大括号括起来，并使用return;
var sum = (sum1, sum2) => { return sum1+sum2;}

var getTempItem = id => ({id: id, name: 'Temp'});

//箭头函数与变量解构结合使用
const full = {first, last} => first + ' ' + last;

function full(person){
	return person.first + ' ' + person.last;
}

//eg：
const isEven = n => n%2==0;
const square = n => n*n;

//	简化回调函数
[1,2,3].map(function(x){
	return x*x;
});
[1,2,3].map(x => x*x);

var result = values.sort(function(a, b){
	return a-b;
});

var result = values.sort((a, b) => a-b);

// rest参数与箭头函数结合
const numbers = (...nums) => nums;
numbers(1,2,3,4,5);

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1,2,3,4,5);

//注意事项！！！！！！！！！
/*
 * (1) 函数体内的this，是定义时所在的对象，不是使用时所在的对象（this对象指向是固定的）
 * (2) 不可以当做构造函数，也就是不可以使用new命令，否则会抛出一个异常
 * (3) 不可以使用arguments对象，该对象在函数体内不存在，可以用Rest参数代替。
 * (4) 不可以使用yield 命令 ，箭头函数不能用作Generator函数
 * 
 */
//this 实例
function foo(){
	setTimeout(() => {
		console.log('id:', this.id);
	}, 100);
}
var id = 21;
foo.call({id:43});
/*
 * 上面代码中，setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。
 */

//箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
function Timer(){
	this.s1 = 0;
	this.s2 = 0;
	//箭头函数
	setInterval(() => this.s1++, 1000);
	//普通函数
	setInterval(function(){
		this.s2++;
	}, 1000);
}
var timer = new Timer();
setTimeout(() => console.log('s1:', timer.s1), 3100);
setTimeout(() => console.log('s2:', timer.s2), 3100);

/**
 * 上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100毫秒之后，timer.s1被更新了3次，而timer.s2一次都没更新。
 */

//箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。
//下面是一个例子，DOM事件的回调函数封装在一个对象里面。
var handler = {
	id: '123456',
	init: function(){
		document.addEventListener('click', event => this.doSomething(event.type), false);
	},
	doSomething: function(type){
		console.log('Handing ' + type + ' for ' + this.id);
	}
}
handler.init();//Handing click for 123456

/***
 * this指向的固定化，并不是因为箭头函数内部有绑定this的机制，
 * 实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。
 * 正是因为它没有this，所以也就不能用作构造函数。
 */




 //箭头函数转成es5代码
//es6
function foo(){
	setTimeout(() => {
		console.log('id:' , this.id);
	}, 100);
}
//es5
function foo(){
	var _this = this;
	setTimeout(function(){
		console.log('id:' + _this.id);
	}, 100);
}


function foo(){
	return () => {
		return () => {
			return () =>{
				console.log('id:', this.id);
			};
		};
	};
};
var f= foo.call({id:1});	//id:1
var t1 = f.call({id:2})()();	//id:1
var t2 = f().call({id: 3})();	//id:1
var t3 = f()().call({id: 4});	//id:1
/**
 * 上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。
 */

//除了this, arguments，super,new.target在箭头函数中也不存在，指向外层函数的对应变量。

function foo(){
	setTimeout(()=> {
		console.log('args:', arguments);
	}, 100);
}

foo(2, 4, 5, 6);

//	箭头函数没有自己的this,不能用call(), apply(), bind() 这些方法去改变this的指向
(function() {
	return [
		(() => this.x).bind({x: 'inner'})()
	];
}).call({x: 'outer'});//["outer"]
//上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。


//长期以来，JavaScript语言的this对象一直是一个令人头痛的问题，在对象方法中使用this，必须非常小心。箭头函数”绑定”this，很大程度上解决了这个困扰。



//嵌套的箭头函数

function insert(value){
	return {into: function(array){
		return {after: function(afterValue){
			array.splice(array.indexOf(afterValue)+1, 0, value);
		}};
	}};
}
insert(2).into([1, 3]).after(1);//[1, 2, 3]

//用箭头函数改写
let insert = (value) => ({into: (array) => ({after: function(afterValue) => {
	array.splice(array.indexOf(afterValue) + 1, 0, value);
	return array;
}})});


// 部署管道机制（pipeline）例子		这个比较困难~~~
const pipeline = (...funcs) =>
	val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a+1;
const mult2 = a => a*2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5);// 12

//可以采用下面的写法
const plus1 = a => a+1;
const mult2 = a => a*2;
mult2(plus1(5));// 12

//	改写λ演算
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

//es6写法
var fix = f => (x => f(v => x(x)(v)))
					  (x => f(v => x(x)(v)));


/**
 * 7. 绑定this
 *	箭头函数可以绑定this,减少了显示绑定this对象的写法（call、apply、bind）
 * 但箭头函数并不适用于所有场合。
 * 
 * es7提出 函数绑定（funciton bind）运算符
 * 来取代call,apply,bind.
 * 
 * 函数绑定运算符是并排的两个冒号(::),左边是一个对象，右边是一个函数
 * 会自动将左边的对象，作为上下文环境即this对象，绑定到右边的函数上面。
 */

foo::bar;
bar.bind(foo);

foo::bar(...arguments);
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key){
	return obj::hasOwnProperty(key);
}


// 如果双冒号左边为空，右边是一个对象的话，则将该方法绑在该对象上。
var method = obj::obj.foo;
//等同于 
var method = ::obj.foo;

let log = ::console.log;
var log = console.log.bind(console);

//由于双冒号返回的是原对象，可以采用链式写法
//例1
import {map, takeWhile, forEach} from 'iterlib';
getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));

//例二
let { find, html } = jake;

document.querySelectorAll("div.myClass")
::find("p")
::html('hahaha');


/**
 * 8.尾调用
 * 指某个函数的最后一步是调用另一个函数
 * 我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），
 * 保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，
 * 还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。
 * 如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。
 * 所有的调用帧，就形成一个“调用栈”（call stack）。
 * 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，
 * 因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，
 * 取代外层函数的调用帧就可以了。
 */

function f() {
	let m = 1;
	let n =2;
	return g(m+n);
}
f();

// 等同于
function f() {
	return g(3);
}
f();

// 等同于
g(3);

/**
 * 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
 * 如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。
 * 这就是“尾调用优化”的意义。
 */

function addOne(a) {
	var one = 1;
	function inner(b) {
		return b + one;
	}
	return inner(b);
}
//上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。

/**
 *	尾递归
 *	递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。
 *	但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
 *
 */

function factorial(n) {
	if(n===1)return 1;
	return factorial(n-1)*n;
}
factorial(5);
// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorial(n, total) {
	if(n===1) return total;
	return factorial(n-1, n*total);
}
factorial(5, 1);


//	非尾递归Fibonacci数列
function Fibonacci(n) {
	if(n <= 1) return 1;
	return Fibonacci(n-1) + Fibonacci(n-2);
}

Fibonacci(10);// 89
Fibonacci(100);
Fibonacci(500);

//尾递归 Fibonacci数列

function Fibonacci2(n, ac1=1, ac2 = 1) {
	if(n <= 1) return ac2;
	return Fibonacci2(n-1, ac2, ac1+ac2);
}
Fibonacci2(100);//573147844013817200000
Fibonacci2(1000);//7.0330367711422765e+208
Fibonacci2(10000);//Infinity


//递归函数的改写
/*尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。
 * 做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。
 * 比如上面的例子，阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。
 * 这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？
 * 
 * 两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。
 * 
 * 通过一个正常形式的阶乘函数factorial，调用尾递归函数tailFactorial，看起来就正常多了。
 * 
 * 第二种方法就简单多了，就是采用 ES6 的函数默认值。
 */
function tailFactorial(n, total){
	if(n===1)return total;
	return tailFactorial(n-1, n*total);
}

function factorial(n){
	return tailFactorial(n, 1);
}

factorial(5);

/*
 *函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
 * 
 * */

function currying(fn, n){
	return function(m){
		return fn.call(this, m, n);
	}
}
function tailFactorial(n, total){
	if(n ===1) return total;
	return tailFactorial(n-1, n*total);
}
const factorial = currying(tailFactorial, 1);
factorial(5);//120

//方法二。采用默认值
function factorial(n, total =1){
	if(n === 1) return total;
	return factorial(n-1, n*total);
}
factorial(5);//120

/*总结一下，递归本质上是一种循环操作。
 * 纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。
 * 对于其他支持“尾调用优化”的语言（比如Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。
 */

/**
 *	严格模式
 * es6的尾调用优化只在严格模式下开启，正常模式下无效。
 * 因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈
 * - func.arguments:返回调用函数时的参数；
 * - func.caller: 返回调用当前函数的那个函数
 * 
 * 尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。
 * */
function restricted(){
	'use strict';
	restricted.caller;
	restricted.arguments;
}
restricted();

//正常模式下尾递归优化的实现
//原理：尾递归之所以要优化，原因是调用栈太多，造成溢出，只要减少调用栈，就不会溢出。
//可以采用‘循环’，换掉‘递归’

function sum(x, y){
	if(y > 0){
		return sum(x+1, y-1);
	}else{
		return x;
	}
}
sum(1, 100000);//Uncaught RangeError: Maximum call stack size exceeded
//上面代码中，sum是一个递归函数，参数x是需要累加的值，参数y控制递归次数。一旦指定sum递归100000次，就会报错，提示超出调用栈的最大次数。

//蹦床函数 (trampoline)，可以将递归转为循环执行
function trampoline(f){
	while (f && f instanceof Function){
		f = f();
	}
	return f;
}

//上述代码是蹦床函数的一个实现。
/*
 	注意这里是返回一个函数，然后执行该函数，而不是在函数里面调用函数
 	这样就避免了递归执行，从而消除了调用栈过大的问题。
 * */

function sum(x, y){
	if(y > 0){
		return sum.bind(null, x+1, y-1);
	}else{
		return x;
	}
}
//sum函数的每次执行，都会返回自身的另一个版本。

trampoline(sum(1, 100000));

//以下懵逼%……%

//蹦床函数并不是真正的尾递归优化，下面的实现才是
function tco(f){
	var value;
	var active = false;
	var accumulated = [];
	
	return function accumulator(){
		accumulated.push(arguments);
		if(!active){
			active = true;
			while(accumulated.length){
				value = f.apply(this, accumulated.shift());
			}
			active = false;
			return value;
		}
	};
}

var sum = tco(function(x, y){
	if(y > 0){
		return sum(x+1, y-1)
	}else{
		return x;
	}
});
sum(1, 100000);

/**
 * 上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。
 * 默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。
 * 然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；
 * 而accumulated数组存放每一轮sum执行的参数，总是有值的，
 * 这就保证了accumulator函数内部的while循环总是会执行。
 * 这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。
 */

//9.	尾逗号

//ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。
//此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

//之前
function clownsEverywhere(
  param1,
  param2
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar'
);

//es6
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);
//这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。

/***
 * 终于把函数的扩展看完了，幸好坚持下来了，确实好多内容啊，也见到了很多平时没有见到的东西，
 * 学到了箭头函数，解构，绑定this，各种优化，值得再看一遍。
 */



/**
 * 对象的扩展
 * 属性的简洁表示法
	属性名表达式
	方法的 name 属性
	Object.is()
	Object.assign()
	属性的可枚举性
	属性的遍历
	__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
	Object.keys()，Object.values()，Object.entries()
	对象的扩展运算符
	Object.getOwnPropertyDescriptors()
	Null 传导运算符
 */


//1. 属性的简洁表示法
//ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。
var foo = 'bar';
var baz = {foo};

//baz  Object {foo: "bar"}
//等同于
var baz = {foo: foo};


function f(x, y){
	return {x, y};
}

// 等同于
function f(x, y){
	return {x: x, y: y};
}
f(1, 2);//Object {x: 1, y: 2}

//方法也可以简写
var o = {
	method(){
		return "hello";
	}
};
//等同于
var o = {
	method: function(){
		return "hello";
	}
};


var birth = "2017-5-11 13:24:16";
var Person = {
	name: 'es6',
	birth,
	//等同于birth: birth,
	hello(){
		console.log('我的名字是', this.name);
	}
	//等同于：hello: function(){console.log('');}
}
//用于函数的返回值，非常方便
function getPoint(){
	var x = 1, y = 2;
	return {x, y};
}
getPoint();//Object {x: 1, y: 2}

// CommonJS模块输出变量,非常适合用简洁写法
var ms = {};
function getItem(key){
	return key in ms ? ms[key] : null;
}
 function setItem(key, value){
 	ms[key] = value;
 }
 function clear(){
 	ms = {};
 }

module.exports = {getItem, setItem, clear};
//等同于
module.exports = {
	getItem: getItem,
	setItem: setItem,
	clear: clear
};

//属性的赋值器(setter)和取值器(getter),也是采用这种写法
var cart = {
	_wheels: 4,
	get wheels(){
		return this._wheels;
	},
	set wheels(value){
		if(value< this._wheels){
			throw new Error('数值太小了！');
		}
		this._wheels = value;
	}
}

cart.wheels = 6;
cart.wheels;//6


//简洁写法的函数名总是字符串，即使是关键字
var obj = {
	class () {}
};
//等同于
var obj = {
	'class': function(){}
}
//这里不会将class当做关键字解析，而是作为字符串
//如果某个方法的值是一个Generator函数，前面需要加上星号。
var obj = {
	* m(){
		yield 'hello world';
	}
}


/*
 * 2.属性名表达式
 */

//JavaScript定义对象的属性,两种方法
obj.foo = true;//直接用标识符
obj['a'+'bc'] = 123;//用表达式，表达式要放在方括号内

//es5
var obj = {
	foo: true,
	abc: 123
};
//es6
let propKey = 'foo';
let obj = {
	[propKey]: true,
	['a'+'bc']:123
};

var lastWord = 'last word';
var a = {
	'first word': 'hello',
	[lastWord]: 'world'
};
a['first word'];// hello
a[lastWord];//world
a['last word'];//world

//表达式可用于定义方法名
let obj = {
	['h'+'ello'](){
		return 'hi';
	}
};
obj.hello();

//属性名表达式与简洁表示法不能同时使用
var foo = 'bar';
var bar = 'abc';
var baz = {[foo]};// Uncaught SyntaxError: Unexpected token }

var baz = {[foo]: 'abc'};

//属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}


/**
 * 3. 方法的name属性
 */

const person = {
	sayName(){
		console.log('hello!');
	}
}
person.sayName.name;//"sayName"

//如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，
const obj = {
	get foo(){},
	set foo(x){}
};
obj.foo.name;//Cannot read property 'name' of undefined
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name;//"get foo"
descriptor.set.name;//"set foo"


//两种特殊情况：
//bind方法创造的函数，name属性返回bound加上原函数的名字；
//Function构造函数创造的函数，name属性返回anonymous。
(new Function()).name //"anonymous"
var doSomething = function(){
	//...
};
doSomething.bind().name;//"bound doSomething"

/*
 * 4. Object.is()
 * ES5比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。
 * 它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
	ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。
	Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
 */

Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

//不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

//es5实现Object.is
Object.defineProperty(Object, 'is',{
	value: function(x, y){
		if(x === y){
			//针对+0 不等于-0情况
			return x !== 0 || a/x ===1/y;
		}
		//针对NaN情况
		return x !== x && y !== y;
	},
	confirgurable:true,
	enumberable: false,
	writable: true
});


/**
 * 5. Obejct.assign();
 * 对象的合并
 * 将源对象（source）的所有可枚举属性，复制到目标对象（target)
 * 第一个参数是目标对象，后面的参数都是源对象。
 */

var target = {a:1};
var source1 = {b:2};
var source2 = {c:3};

Object.assign(target, source1, source2);
target	//Object {a: 1, b: 2, c: 3}

typeof Object.assign(2) //"object"
Object.assign(undefined)//报错
Object.assign(null)//报错  Cannot convert undefined or null to object

let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true


//Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。


var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
obj2.a.b //2

var target = {a: {b: 'c', d:'e'}};
var source = {a: {b:'hello'}}
Object.assign(target, source);
//{ a: { b: 'hello' } }

//用途
//1.为对象添加属性
//将x, y赋给Point类的对象实例
class Point{
	constructor(x, y){
		Object.assign(this, {x, y});
	}
}

//2.为对象添加方法
Object.assign(SomeClass.prototype, {
	someMethod(arg1, arg2){
		...
	},
	anotherMethod(){
		...
	}
});
//等同于
SomeClass.prototype.someMethod = function(arg1, arg2){
	...
}
SomeClass.prototype.anotherMethod = function(arg1, arg2){
	...
}

//3.克隆对象
function clone(origin){
	return Object.assign({}, origin);
}
//缺点，只能克隆原始对象自身的值，不能克隆它继承的值
//以下可以保持继承链
function clone(origin){
	let originProto = Object.getPrototypeOf(origin);
	return Object.assign(Object.create(originProto), origin);
}

//4. 合并多个对象
const merge = (target, ...sources) => Object.assign(target, ...sources);
//合并后返回一个新对象
const merge = (...sources) => Object.assign({}, ...sources);

//5. 为属性指定默认值
const DEFAULTS = {
	logLevel: 0,
	outputFormat: 'html'
};
function processContent(options){
	options = Object.assign({}, DEFAULTS, options);
	console.log(options);
}
processContent({a:234,b:423})//{logLevel: 0, outputFormat: "html", a: 234, b: 423}

//由于存在浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。

const DEFAULTS = {
  url: {
    host: 'example.com',
    port: 7070
  },
};

processContent({ url: {port: 8000} })
//会替换所有url对象,url.host就不存在了。


//6.属性的可枚举性  描述对象的enumerable属性，称为”可枚举性“
//Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象
let obj = {foo: 123};
Object.getOwnPropertyDescriptor(obj, 'foo');

/**
 * for...in循环：只遍历对象自身的和继承的可枚举的属性
Object.keys()：返回对象自身的所有可枚举的属性的键名
JSON.stringify()：只串行化对象自身的可枚举的属性
Object.assign()，会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。


这四个操作之中，只有for...in会返回继承的属性。
实际上，引入enumerable的最初目的，就是让某些属性可以规避掉for...in操作。
比如，对象原型的toString方法，以及数组的length属性，就通过这种手段，不会被for...in遍历到。

!!!!!!  之前扩展Array时遇到过这个问题，扩展了一个方法，用for...in的话会有toString属性出现……坑坑坑~~！~~

操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。
* */


/**
 * 7. 属性的遍历(5种方法)
 * （1）for...in   循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
 * （2）Object.keys(obj)包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
 * （3）Object.getOwnPropertyNames(obj) 包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
 * （4）Object.getOwnPropertySymbols(obj)	包含对象自身的所有Symbol属性。
 * （5）Reflect.ownKeys(obj) 包含对象自身的所有属性，不管属性名是Symbol或字符串，也不管是否可枚举。
 * 
 * 遍历次序：
 * 首先遍历所有属性名为数值的属性，按照数字排序。
	其次遍历所有属性名为字符串的属性，按照生成时间排序。
	最后遍历所有属性名为Symbol值的属性，按照生成时间排序。
 */
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })//["2", "10", "b", "a", Symbol()]


/**
 * 8.__proto__属性，Object.setPrototypeOf(),Object.getPrototypeOf()
 * 
 * __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。,建议不要使用
 * 用Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。
 */

//es5
var obj = Object.create(someOtherObj);
obj.method = function(){...}

//es6
var obj = {
	method: function(){...}
}
obj.__proto__ = someOtherObj;

//__proto__实现原理：调用Object.prototype.__proto__
Object.defineProperty(Object.prototype, '__proto__', {
	get() {
		let _thisObj = Object(this);
		return Object.getPrototypeOf(_thisObj);
	},
	set(proto){
		if(this === undefined || this === null){
			throw new TypeError();
		}
		if(!isObject(this)){
			return undefined;
		}
		if(!isObject(proto)){
			return undefined;
		}
		let status = Reflect.setPrototypeOf(this, proto);
		if(!status){
			throw new TypeError();
		}
	}
});

function isObject(value){
	return Object(value) === value;
}
//如果一个对象本身部署了__proto__属性，则该属性的值就是对象的原型。
Object.getPrototypeOf({ __proto__: null })

//语法
Object.setPrototypeOf(object, prototype)
//用法
var o = Object.setPrototypeOf({}, null);
//等同于
function(obj, proto){
	obj.__proto__ = proto;
	return obj;
}

//eg
let proto = {};
let obj = {x: 10};
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 30;
obj.x;
obj.y;
obj.z;


//例子
let proto = {};
let obj = {x:10};
Object.setPrototypeOf(obj, proto);
proto.z = 20;
proto.y = 40;

obj.x;//10
obj.y;//40
obj.z;//20

//Object.getPrototypeOf(); 	读取一个对象的原型对象

//eg:
function Retangle(){
//	...
}
var rec = new Retangle();
Object.getPrototypeOf(rec) === Retangle.prototype //true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Retangle.prototype 	//false

/**
 * 9. Object.keys(), Object.values(), Object.entries()
 * Object.keys():返回数组，成员是参数对象自身的(不含继承的)所有可遍历(enumerable)属性的键名
 *
 */

var obj = {foo:'bar', baz:42};
Object.keys(obj);	//["foo", "baz"]



let {keys, values, entries} = Object;
let obj = {a: 1, b: 2, c: 3};

for(let key of keys(obj)){
	console.log(key);//'a', 'b', 'c'
}
for(let value of values(obj)){
	console.log(value);// 1, 2, 3
}
for(let [key, value] of entries(obj)){
	console.log([key, value]);// ['a', 1], ['b', 2], ['c', 3]
}


/**
 * 10. 对象的扩展运算符
 * 解构赋值
 * 扩展运算符
 */

let {x, y, ...z} = {x:1, y:2, a:3, b: 4};

x//1,
y//2,
z// { a: 3, b: 4 }

//由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
let { x, y, ...z } = null; // 运行时错误
let { x, y, ...z } = undefined; // 运行时错误

// 解构赋值必须是最后一个参数，否则会报错。

let { ...x, y, z } = obj; // 句法错误
let { x, ...y, ...z } = obj; // 句法错误

// 注意，解构赋值的拷贝是浅拷贝!!!!!!!


var o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...{ y, z } } = o;
x // 1
y // undefined
z // 3



// 上面代码中，变量x是单纯的解构赋值，所以可以读取对象o继承的属性；
// 变量y和z是双重解构赋值，只能读取对象o自身的属性，所以只有变量z可以赋值成功。


// 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。

function baseFunction({ a, b }) {
	// ...
}
function wrapperFunction({ x, y, ...restConfig }) {
	// 使用x和y参数进行操作
	// 其余参数传给原始函数
	return baseFunction(restConfig);
}
//函数wrapperFunction在baseFunction的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。

/**
 * 扩展运算符
 * 用于取出参数对象的所有可遍历属性，拷贝到当前对象中
 *
 */
let z = {a:3, b:4};
let n = {...z};
n// { a: 3, b: 4 }

let aClone = {...a};
//等同于Object.assign
let aClone = Object.assign({}, a);

// 扩展运算符可以用于合并两个对象
let ab = {...a, ...b};
//等同于
let ab = Object.assign({}, a, b);

//同名覆盖
let aWithOverrides = {...a, x:1, y:2};
//等同于
let aWithOverrides = {...a, ...{x:1, y:2}};

let x = 1, y = 2, aWithOverrides = {...a, x, y};

let aWithOverrides = Object.assign({}, a, {x:1, y:2});


//用来修改现有对象的部分属性很方便
let newVersion = {
	...previousVersion,
	name: 'New Name' //重载name属性
};
//以上，只修改了name属性，其他都是直接复制


let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);


// 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。

// 并不会抛出错误，因为x属性只是被定义，但没执行
let aWithXGetter = {
	...a,
	get x() {
		throws new Error('not thrown yet');
	}
};

// 会抛出错误，因为x属性被执行了
let runtimeError = {
	...a,
	...{
		get x() {
			throws new Error('thrown now');
		}
	}
};

// 如果扩展运算符的参数是null或undefined，这两个值会被忽略，不会报错。

let emptyObject = { ...null, ...undefined }; // 不报错


/**
 * 11. Object.getOwnPropertyDescriptor();
 * 返回某个对象自身属性（非继承属性）的描述对象（descriptor)
 *	es6引入了Object.getOwnPropertyDescriptors方法，
 *	返回指定对象所有自身属性（非继承属性）的描述对象。
 *	目的：解决Object.assign()无法正确拷贝get属性和set属性的问题
 */

var obj = {p: 'a'};
Object.getOwnPropertyDescriptor(obj, 'p');
//{value: "a", writable: true, enumerable: true, configurable: true}

function getOwnPropertyDescriptors(obj){
	const result = [];
	for(let key of Reflect.ownKeys(obj)){
		result[key] = Object.getOwnPropertyDescriptor(obj, key);
	}
	return result;
}



const source = {
	set foo(value){
		console.log(value)
	}
}
const target1 = {};
Object.assign(target1, source);

Object.getOwnPropertyDescriptors(target1, 'foo');

// foo	:	Object  configurable:	true enumerable	:	true value	:	undefined writable	:	true
//上述代码中sourc的foo是一个赋值函数，用了Object.assign，结果foo为undefined，
//因为Object.assign方法总是拷贝一个属性的值， 而不会拷贝它背后的赋值方法或取值方法

//解决方法：Object.getOwnPropertyDescriptors和Object.defindProperties,可以实现正确拷贝
const source = {
	set foo(value){
		console.log(value)
	}
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo');

//es6写法
const shallowMerge = (target, source) =>
	Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));

//用处2：配合Object.create，将对象属性克隆到一个新对象，属于浅拷贝
const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

//或者
const shallowClone = (obj) => Object.create(
	Object.getPrototypeOf(obj),
	Object.getOwnPropertyDescriptors(obj)
);


//一个对象集成另一个对象
const obj = {
	__proto__: prot,
	foo: 123
};

//es6写法
const obj = Object.ceate(prot);
obj.foo = 123;

//或
const obj = Object.assign(
	Object.create(prot),{
		foo:123
	}
);
//用Object.getOwnPropertyDescriptors()实现
const obj = Object.create(
	prot,
	Object.getOwnPropertyDescriptors({foo:123})
);


// Object.getOwnPropertyDescriptors()也可以用来实现Mixin(混入)模式
let mix = (object) => ({
	with: (...mixins) => mixins.reduce(
		(c, mixin) => Object.create(
			c, Object.getOwnPropertyDescriptors(mixin)
		),object
	)
});

//multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = min(c).with(a, b);
//上述代码中a,b 被混入了c

/**
 * 12. Null传导运算符
 * 以前要读取message.body.user.firstName，安全写法
 * const firstName = (message && message.body && message.body.user && message.body.user.firstName) || 'default';
 *
 * 这种层层判断非常麻烦， 所以引入Null传导运算符（Null propagation operator）?.  简化以上写法
 *“Null 传导运算符”有四种用法。

 		obj?.prop // 读取对象属性
 		obj?.[expr] // 同上
 		func?.(...args) // 函数或对象方法的调用
 		new C?.(...args) // 构造函数的调用
 */

const firstName = message?.body?.user?.firstName || 'default';
//上面代码中的?.有一个返回null或undefined，就会再往下运算，直接返回undefined

// 如果 a 是 null 或 undefined, 返回 undefined
// 否则返回 a.b.c().d
a?.b.c().d

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
// 否则执行 a.b = 42
a?.b = 42

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
delete a?.b








/**
 * Symbol  从根本上防止属性名的冲突
 * Symbol 值通过Symbol函数产生，凡是属性名属于Symbol，就是独一无二的。
 * 属性名的值可以是字符串，也可以是Symbol类型
 */

/*
 * JavaScript 原始数据类型
 * 前六种：undefined， null，布尔值(Boolean), 字符串(String), 数值(Number), 对象(Object);
 * 第七种：Symbol(表示独一无二的值)
 * 
 */

let s = Symbol();
typeof s;	//"symbol",表名s是Symbol类型

//Symbol函数前不能用new,
//Symbol参数只是对当前Symbol值的描述，相同参数的返回值不相同
//没有参数
var s1 = Symbol();
var s2 = Symbol();
s1 === s2;//false;

//有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');
s1 === s2;//false

//Symbol值不能与其他值进行运算
var sym = Symbol('My symbol');
'you symbol is ' + sym;//Cannot convert a Symbol value to a string
//`your symbol is ${sym}`;


//Symbol 可以转化为布尔值,但不能转化为数值

var sym = Symbol();
Boolean(sym);//true
!sym //false
if(sym){
	//...
}
//以下报错
//Number(sym)   sym +2;


/**
 * 2.作为属性名
 * 
 */

var mySymbol = Symbol();
//第一种写法
var a = {};
a[mySymbol] = 'Hello!';

//第二种写法
var a = {
	[mySymbol]: 'Hello!'
};

//第三种写法
var a = {};
Object.defineProperty(a, mySymbol, {value: 'Hello!'});

//以上写法得到的结果
a[mySymbo];//"Hello!"

//Symbol值作为属性名，不能用点运算符
var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';
a[mySymbol] //undefined ，用了点后，会导致这句话取不到值
a['mySymbol'] // "Hello!"

//因为点运算符后面总是字符串，所以不会取Symbol类型的标识名

//在对象内部，用Symbol定义属性时，Symbol必须放在方括号中
let s = Symbol();
let obj = {
	[s]: function(arg){}
};
obj[s](123);
//如果s不放在方括号中，该属性的键名就是字符串s,而不是s所指的Symbol值

let obj = {
	[s](arg){console.log(arg);}
}

//Symbol可以用于定义一组常量,保证常量的值不等
log.levels = {
	DEBUG: Symbol('debug'),
	INFO: Symbol('info'),
 	WARN: Symbol('warn')
}

log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');

const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();

function getComplement(color){
	switch(color){
		case COLOR_RED:
			return COLOR_RED;
		case COLOR_GREEN:
			return COLOR_GREEN;
		default:
			throw new Error('Undefined color');
	}
}
//最大好处：就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。
//Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。



/**
 * 3.消除魔术字符串
 * 魔术字符串：在代码中出现多次，与代码形成强耦合的某一个具体的字符串或数字
 * 应该改用变量代替
 *
 *
 */



function getArea(shape, options){
	var area = 0;
	switch (shape){
		case "Triangle":// 魔术字符串
			area = .5*options.width*options.height;
			break;
		/*** more code ***/
	}
	return area;
}
getArea('TRiangle', {width:10, height:20});

//字符串Triangle就是魔术字符串

var shapeType = {
	triangle: 'Triangle'
};


function getArea(shape, options){
	var area = 0;
	switch (shape){
		case shapeType.triangle:// 魔术字符串
			area = .5*options.width*options.height;
			break;
		/*** more code ***/
	}
	return area;
}

getArea(shapeType.triangle, {width:10, height:20});

//可以用Symbol值替代

const shapeType = {
	triangle: Symbol()
};


/**
 * 4. 属性名的遍历
 * Symbol作为属性名，不会出现在for...in ,for...of循环中，
 * 不会被Object.keys(),Object.getOwnPropertyNames(),JSON.stringify()返回，
 * 但他也不是私有属性，
 * 用Object.getOwnPropertySymbols(),获取所有的Symbol属性名
 */

var obj = {};
var a = Symbol('A');
var b = Symbol('b');

obj[a] = "Hello";
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);
//[Symbol(A), Symbol(b)]

//Reflect.ownKeys()可以返回所有类型的属性名，包括常规键名和Symbol属性名
let obj = {
	[Symbol('myKey')]: 1,
	enum: 2,
	noEnum: 3
};
Reflect.ownKeys(obj);
//["enum", "noEnum", Symbol(myKey)]

//可以利用这一特性，为对象定义一些非私有的、但又希望只属于内部的方法

var size = Symbol('size');
class Collection {
	constructor (){
		this[size] = 0;
	}

	add(item){
		this[this[size]] = item;
		this[size]++;
	}


	static sizeOf(instance){
		return instance[size];
	}

}


var x = new Collection();
Collection.sizeOf(x);//0

x.add('foo');
Collection.sizeOf(x);//1

Object.keys(x);//["0"],0作为属性名，值是foo
Object.getOwnPropertyNames(x);
Object.getOwnPropertySymbols(x);//[Symbol(size)]
//对象x的size属性是一个 Symbol 值，
// 所以Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种非私有的内部方法的效果。

/**
 * 5.Symbol.for(), Symbol.keyFor()
 * 可以指定用同一个Symbol值，Symbol.for接收一个参数，有则返回Symbol值，没有则新建并返回一个以该字符串为名称的Symbol值
 * 
 */

var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
s1 === s2;//true

var s1 = Symbo('foo');
var s2 = Symbol.for('foo');
s1 === s2;//false

//Symbol.keyFor方法返回一个已登记的Symbol类型值的key
var s1 = Symbol.for('foo');
Symbol.keyFor(s1);//'foo'

var s2 = Symbol('foo');
Symbol.keyFor(s2);//undefined,变量s2未被登记，所以返回undefined

//Symbol.for的值是全局变量，可以在不同的iframe,或service worker中取到同一个值
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
//true
//iframe中生成的Symbol值,可以在主页面得到


/**
 * 6.实例：模块的Singleton 模式
 * Singleton模式： 调用同一个类，任何时候都返回同一个实例。
 * 对node来说，模块文件可以是一个类，要保证每次执行这个模块文件返回同一个实例。
 * 把实例放到顶层对象global
 */

/*mod.js*/
function A(){
	this.foo = 'hello';
}
if(!global._foo){
	global._foo = new A();
}

module.exports = global._foo;

//加载上面的mod.js
var a = require('./mod.js');
console.log(a.foo);

//有个问题全局变量global._foo是可以改写的，
var a = require('./mod.js');
global._foo = '123';

//这样会导致别的模块加载mod.js失真
//解决方案，用Symbol

/*mod.js*/
const FOO_KEY =  Symbol.for('foo');
function A(){
	this.foo = 'hello';
}

if(!global[FOO_KEY]){
	global[FOO_KEY] = new A();
}
module.exports = global[FOO_KEY];

//上面代码可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写
var a = require('./mod.js');
global[Symbol.for('foo')] = 123;

//如果键名使用Symbol值生成，外部就无法引用这个值，也无法改写

/*mod.js*/
const FOO_KEY = Symbol('foo');
//后面相同

//这样会导致其他脚本无法引用FOO_KEY，但多次执行这个脚本，每次得到的FOO_KEY都不一样，
//node会将脚本执行的结果缓存，一般不会多次执行同一个脚本
//但用户可以手动清除缓存，所以也不完全可靠

/**
 * 7.内置的Symbol值
 * 
 */

/**
 * * Symbol.hasInstance
 * 当其他对象使用instanceof运算符，判断是否为改对象的实例时，会调用这个方法。
 * 比如：foo instanceof Foo,实际调用的是
 * Foo[Symbol.hasInstance](foo)
 */

class MyClass {
	[Symbol.hasInstance](foo){
		return foo instanceof Array;
	}
}
[1,2,3] instanceof new MyClass();// true

//该实例的Symbol.hasInstance方法，会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。?????
class Even{
	static [Symbol.hasInstance](obj){
		return Number(obj) %2 === 0;
	}
}

1 instanceof Even;//false
2 instanceof Even;//true
12345 instanceof Even;//false


/**
 * Symbol.isConcatSpreadable
 * 表示该对象使用Array.prototype.concat()是否可以展开
 */

let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e');//["a", "b", "c", "d", "e"]
arr1[Symbol.isConcatSpreadable]//undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e');//["a", "b", Array[2], "e"]



class A1 extends Array{
	constructor(args){
		super(args);
		this[Symbol.isConcatSpreadable] = true;
	}
}
class A2 extends Array{
	constructor(args){
		super(args);
		this[Symbol.isConcatSpreadable] = false;
	}
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;

let a2 = new A2();
a2[0] = 5;
a2[1] = 6;

[1, 2].concat(a1).concat(a2);//[1, 2, 3, 4, A2[2]]


/**
 * Symbol.species 指向当前对象的构造函数。
 * 创造实例时默认会调用这个方法。
 * 即使用这个属性返回的函数做构造函数，来创造新的实例对象。
 */
class MyArray extends Array{
	//覆盖父类Array的构造函数
	static get [Symbol.species]() {return Array;}
}
//子类MyArray继承了父类Array。
//创建MyArray的实例对象时，本来会调用它自己的构造函数（本例中被省略了），
//但是由于定义了Symbol.species属性，所以会使用这个属性返回的的函数，创建MyArray的实例。?????


//Symbol.species属性要采用get读取器。默认的Symbol.species属性等同于下面的写法
static get [Symbol.species](){
	return this;
}

class MyArray extends Array{
	static get [Symbol.species](){return Array;}
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x*x);
mapped instanceof MyArray;//false
mapped instanceof Array;//true

//MyArray的构造函数被替换成了Array,所以mapped的实例不是MyArray，而是Array.



/**
 * Symbol.match
 * 指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
 */
String.prototype.match(regexp);
//等同于
regexp[Symbol.match](this);

class MyMatcher {
	[Symbol.match](string){
		return 'hello world'.indexOf(string);
	}
}
'e'.match(new MyMatcher());//1

/**
 * Symbol.replace
 * 指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
 * 
 */
String.prototype.replace(searchValue, replaceValue);
//等同于
searchValue[Symbol.replace](this, replaceValue);

const x = {};
x[Symbol.replace] = (...s) => console.log(s);
'hello'.replace(x, 'world');//["hello", "world"]

//Symbol.search
String.prototype.search(regexp);
regexp[Symbol.search](this);

//Symbol.split
String.prototype.split(separator, limit);
//等同于
separator[Symbol.split](this, limit);

/*之后巴拉巴拉一堆属性，没心思看了，不知道有什么用@_@*/





/***
 * Set和Map数据结构
 * 
 * Set:类似于数组，但成员的值都是唯一的，没有重复的值。
 * Set本身是一个构造函数，用来生成Set数据结构
 */
//没有重复值
const s = new Set();
[1,2,4,4,5,6,7,3,5,4,3].forEach(x => s.add(x));
for(let i of s){
	console.log(i);
}
//初始化
const set = new Set([1,2,3,4,4,4]);
[...set]//[1, 2, 3, 4]
set.size;//4

function divs(){
	return [...document.querySelectorAll('div')];
}
const set = new Set(divs());
set.size;//8
//类似于
divs().forEach(div => set.add(div));
set.size;


//数组去重的另一种方法
[...new Set(array)];

//Set加入值时，不会发生类型转换，5和'5'是两个不同的值
//Set内部判断值使用的算法叫做'Same-value equality',类似于精确相等运算符(===),
//主要区别在于NaN等于自身，而精确相等运算符认为NaN不等于自身
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
//set  Set {NaN}

//另外，两个对象总是不相等的。

let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2

/**
 * Set实例的属性和方法
 * 属性。
	Set.prototype.constructor：构造函数，默认就是Set函数。
	Set.prototype.size：返回Set实例的成员总数
 * 方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。
 * 下面先介绍四个操作方法。
	add(value)：添加某个值，返回Set结构本身。
	delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
	has(value)：返回一个布尔值，表示该值是否为Set的成员。
	clear()：清除所有成员，没有返回值。
 *
 * 四个遍历方法，可以用于遍历成员。
 		keys()：返回键名的遍历器
 		values()：返回键值的遍历器
 		entries()：返回键值对的遍历器
 		forEach()：使用回调函数遍历每个成员
 * 
 *
 * Set的遍历顺序就是插入顺序。这个特性在报错一个回调函数列表时能够保证按添加顺序调用
 */

let s = new Set();
s.add(1).add(2).add(2);
s.size;//2

s.has(1);//true
s.has(3);//false

//判断是否在一个键上
//对象的写法
const properties = {
	'width': 1,
	'height':1
};

if(properties[someName]){
	//do something
}

//Set 写法
const properties = new Set();
properties.add('width');
properties.add('height');
if(properties.has(someName)){
	//do something.
}

//Array.from 可以将Set结构转成数组.
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

//数组的另一种去重方法
function dedupe(array){
	return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]);




//keys方法，values方法，entries方法，返回的都是遍历器对象（Iterator）
//Set结构没有键名，只有键值，（或键名和键值相同），所以keys和values方法相同


let set = new Set(['red', 'green', 'yellow']);

for(let item of set.keys()){
	console.log(item);
}
for(let item of set.values()){
	console.log(item);
}
// red green blue
for(let item of set.entries()){
	console.log(item);
}

// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

//Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
Set.prototype[Symbol.iterator] === Set.prototype.values
//这意味着，可以省略values方法，直接用for...of循环遍历 Set。
let set = new Set(['green', 'yellow', 'red']);
for(let item of set){
	console.log(item);
}


/**
 // forEach
 *	forEach方法的参数就是一个处理函数。
 * 该函数的参数依次为键值、键名、集合本身（上例省略了该参数）。
 * 另外，forEach方法还可以有第二个参数，表示绑定的this对象。
 */
/
let set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value,key*2));


/**
 * 遍历的应用
 */

//扩展运算符内部使用for...of，所以也可用于set结构
let set = new Set(['green', 'red', 'blue']);
let arr = [...set];
//["green", "red", "blue"]


//扩展运算符和Set结构结合，可以数组去重
let arr = new Set([1,2,3,2,1,1,5]);
let unique = [...new Set(arr)];

数组的map和filter方法也可以用于Set

let set = new Set([1,2,3]);
set = new Set([...set].map(x => x*2));

let set = new Set([1,2,3,4,5]);
set = new Set([...set].filter(x => (x%2)==0 ));

//用Set实现并集(union),交集(Intersect),差集(Difference)
let a = new Set([1,2,3]);
let b = new Set([4,3,2]);
//并集
let union = new Set([...a, ...b]);

//交集
let intersect = new Set([...a].filter(x => b.has(x)));

//差集
let difference = new Set([...a].filter(x => !b.has(x)));


//遍历操作同时改变Set结构两种方法：

//一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；
let set = new Set([1,2,3]);
set = new Set([...set].map(x => x*2));

//另一种是利用Array.from方法。
let set = new Set([1,2,3]);
set = new Set(Array.from(set, val => val*2));


/**
 * WeakSet
 * 与Set类似，也是不重复的值的集合，但与Set有两个区别
 * 1.WeakSet的成员只能是对象，不能是其他类型的值
 * 2.其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
 * 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，
 * 不考虑该对象还存在于 WeakSet 之中。

 		这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，
 		垃圾回收机制就不会释放这块内存。对于那些不重要的引用，在结束使用之后，
 		有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。
 		WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。
 		因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。
 		只要这些对象在外部消失，它在 WeakMap 里面的引用就会自动消失。

 		由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。
 		另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，
 		运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，
 		因此 ES6 规定 WeakSet 不可遍历。

 		语法：WeakSet 是一个构造函数，可以接受一个数组或类似数组的对象作为参数
 *
 * 有3个方法：
 * add, delete, has
 */

const ws = new WeakSet();
ws.add(1);
ws.add(Symbol());
//以上报错


const a = [[1,2], [3,4]];
const ws = new WeakSet(a);

const b = [3,4];
const ws = new WeakSet(b);//报错，b的成员不是对象

//方法
const ws = new WeakSet();
const obj = {};
const foo = {};
ws.add(window);
ws.add(obj);
ws.has(window);
ws.delete(window);
ws.has(window);

//WeakSet没有size属性，没法遍历成员
ws.size//undefined
ws.forEach;//undefined

//eg
const foo = new WeakSet()
class Foo{
	constructor(){
		foos.add(this)
	}
	method(){
		if(!foo.has(this)){
			throw new TypeError('Foo.prototype.method只能在Foo的实例上调用');
		}
	}
}
//上面代码保证了Foo实例的方法，只能在Foo实例上调用
//这里使用WeakSet好处：foos对实例的引用，不会被计入内存回收机制，
//删除实例时，不用考虑foos，也不会出现内存泄漏



/**
 * Map
 *JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。
 * Object结构提供了'字符串-值'的对应，
 * Map结构提供了'值-值'的对应。
 * 若需要'键值对'的数据结构，Map比Object更合适。
 * 
 * 
 * 
 * 
 * */
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]']

//div dom 被转成了 object HTMLDivElement

const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content');
m.get(o);

m.has(o);
m.delete(o);
m.has(o);

//Map 可以接受一个数组作为参数
const map = new Map({
	['name', '张三'],
	['title', 'Author']
});

map.size //2
map.has('name');
map.get('name');
map.has('title');
map.get('title');

//在构建Map实例时，实际上是执行的下面的算法
const items = [
	['name', '张三'],
	['title', 'Author']
];
const map = new Map();
item.forEach(
	([key, value]) => map.set(key, value)
);
//任何具有Iterator接口的数据结构都可以当做Map构造函数的参数。
//Set ,Map 都可以用来生成新的Map。

// 如果对同一个键多次赋值，后面的值将覆盖前面的值。

const map = new Map();

map
	.set(1, 'aaa')
	.set(1, 'bbb');

map.get(1) // "bbb"

new Map().get('dfadf');//undefined

//注意：只有对同一个对象的引用，Map结构才会视为同一个值
const map = new Map();
map.set(['a'],123);
map.get(['a']);//undefined
//这里['a']是两个值


//同样，两个实例也是两个键
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
	.set(k1, 111)
	.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222


/**
 * Map 的键实际上是跟内存地址绑定的，
 * 只要内存地址不一样，就视为两个键。
 * 这就解决了同名属性碰撞（clash）的问题，
 * 我们扩展别人的库的时候，如果使用对象作为键名，
 * 就不用担心自己的属性与原作者的属性同名。

 	如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），
 	则只要两个值严格相等，Map 将其视为一个键，包括0和-0，
 	布尔值true和字符串true则是两个不同的键。
 	另外，undefined和null也是两个不同的键。
 	虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
 */
let map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123


/**
 * Map实例的属性
 * size, set(key, value), get(key), has(key), delete(key), clear();
 * 遍历方法
 * keys()：返回键名的遍历器。
	values()：返回键值的遍历器。
	entries()：返回所有成员的遍历器。
	forEach()：遍历 Map 的所有成员。
 * 
 * */

const map = new Map([
	['F', 'foo'],
	['T', 'Too']
]);

for(let key of map.keys()){
	console.log(key);
}

for(let value of map.values()){
	console.log(value);
}

for(let item of map.entries()){
	console.log(item[0], item[1]);
}

for(let [key, value] of map.entries()){
	console.log(key, value);
}

for(let [key, value] of map){
	console.log(key, value);
}
//Map 默认遍历接口(Symbol.iterator)就是entries方法。
map[Symbol.iterator] === map.entries//true

/**
 * Map结构转为数组，使用扩展运算符（...）
 * 
 */
const map = new Map([
	[1, 'one'],
  	[2, 'two'],
  	[3, 'three'],
])

[...map.keys()];
[...map.values()];
[...map.entries()];
[...map];


//结合数组的map,filter，实现Map的遍历和过滤（Map没有map和filter）
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}

//Map的forEach方法
map.forEach(function(value, key, map){
	console.log('key: %s, value: %s', key, value);
})

//forEach接受第二个参数，绑定this
const reporter = {
	report: function(key, value){
		console.log('key: %s, value: %s', key, value);
	}
};
map.forEach(function(value, key, map){
	this.report(key, value);
}, reporter);


/**
 * Map结构与其他数据结构互相转换
 * */

//1.Map 转为其他数组,用扩展运算符(...)
const myMap = new Map().set(true, 7).set({foo: 3},['abc']);
[...myMap]

//2.数组转Map  将数组传入Map构造函数中
new Map([
	[true, 7],
	[{foo: 3}, ['abc']]
]);

//3. Map转对象  如果Map的键都是字符串，它可以转为对象
function strMapToObj(strMap){
	let obj = Object.create(null);
	for(let [k, v] of strMap){
		obj[k] = v;
	}
	return obj;
}
const myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap);

//4. 对象转Map
function objToStrMap(obj){
	let strMap = new Map();
	for(let k of Object.keys(obj)){
		strMap.set(k, obj[k]);
	}
	return strMap;
}
objToStrMap({'yes':true, 'no':false});

//5. Map转为JSON
//(1)Map的键名都是字符串，转为对象JSON
function strMapToJSON(strMap){
	return JSON.stringify(strMapToObj(strMap));
}
let myMap = myMap().set('yes', true).set('no', false);
strMapToJSON(myMap);

//(2)Map的键名都含有非字符串,转为数组JSON
function mapToArrayJson(map){
	return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap);

//6. JSON 转Map
function jsonToMap(jsonstr){
	return objToStrMap(JSON.parse(jsonstr));
}
jsonToMap('{"yes": true, "no": false}');


// 有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。
// 这时，它可以一一对应地转为Map。这往往是数组转为 JSON 的逆操作。
function jsonToMap(jsonstr){
	return new Map(JSON.parse(jsonstr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
// Map {true => 7, Object {foo: 3} => ['abc']}


/**
 * 4. WeakMap
 * WeakMap 与Map的区别
 * WeakMap只接受对象作为键名(null除外)，
 * WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。
 * WeakMap 与 Map 在 API 上的区别主要是两个，
 * 一是没有遍历操作（即没有key()、values()和entries()方法），也没有size属性。
 * 因为没有办法列出所有键名，这个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。
 * 二是无法清空，即不支持clear方法。
 * 因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。
 */
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm2.get(key);
//WeakMap也可以接收一个数组
const k1 = [1,3,5];
const k2 = [2,4,6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2);


const wm = new WeakMap();
wm.set(1, 2);//错
wm.set(Symbol(), 2);//错
wm.set(null, 2);//错

// WeakMap的键名所指向的对象，不计入垃圾回收机制。

// eg:

const e1 = document.querySelector('foo');
const e2 = document.querySelector('bar');
const arr = [
	[e1, 'foo 元素'],
	[e2, 'bar 元素']
];

// e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
// 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
// 一旦忘了写，就会造成内存泄露。

/**
 * WeakMap 就是为了解决这个问题而诞生的，
 * 它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
 * 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
 * 也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
	 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，
 		就可以使用 WeakMap。

 		一个典型应用场景是，在网页的 DOM 元素上添加数据，
 		就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
 */

const wm = new WeakMap();
const element = document.querySelector('example');
wm.set(element, 'some information');
wm.get(element) // "some information"

//WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制

// WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

// 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}

/**
 * WeakMap用途
 * 1.典型场合就是 DOM 节点作为键名。
 */

//eg1:
let myElement = document.querySelector('logo');
let myWeakMap = new WeakMap();

myWeakMap.set(myElement, {timesClicked: 0});
myElement.addEventListener('click', function(){
	let logoData = myWeakMap.get(myElement);
	logoData.timesClicked++;
}, false);

// 一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
//进一步说，注册监听事件的listener对象，就很合适用 WeakMap 实现。
let element1 = document.querySelector('element1');
let element2 = document.querySelector('element2');
function handler1(){}
function handler2(){}

const listener = new WeakMap();
listener.set(element1, handler1);
listener.set(element2, handler2);

element1.addEventListener('click', listener.get(element1), false);
element2.addEventListener('click', listener.get(element2), false);
// 监听函数放在 WeakMap 里面。一旦 DOM 对象消失，跟它绑定的监听函数也会自动消失。

//WeakMap 的另一个用处是部署私有属性。

const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
	constructor(counter, action) {
		_counter.set(this, counter);
		_action.set(this, action);
	}
	dec() {
		let counter = _counter.get(this);
		if (counter < 1) return;
		counter--;
		_counter.set(this, counter);
		if (counter === 0) {
			_action.get(this)();
		}
	}
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE

// 上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，
// 所以如果删除实例，它们也就随之消失，不会造成内存泄漏。



/***
 * Proxy
 * 目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，
 * 因此提供了一种机制，可以对外界的访问进行过滤和改写
 * 
 */


var obj = new Proxy({}, {
	get: function (target, key, receiver){
//		console.log(`getting ${key}!`);
		return Reflect.get(target, key, receiver);
	},
	set: function(target, key, vlaue, receiver){
//		console.log(`setting ${key!}`);
		return Reflect.set(target, key, value, receiver);
	}
});

obj.count = 1;
++obj.count;

//Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。

//语法 :
var proxy = new Proxy(target, handler);
//target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。


//eg:
var proxy = new Proxy({}, {
	get: function(target, property){
		return 35;
	}
});

proxy.name;
proxy.title;
proxy.time;//35

//要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a //b

//一个技巧，将Proxy对象设置到object.proxy属性上，可以直接在object对象上调用
var object = {proxy: new Proxy(target, handler)};

//Proxy实例，可以作为其他对象的原型对象
var proxy = new Proxy({}, {
	get: function(target, property){
		return 35;
	}
});
let obj = Object.create(proxy);
obj.time;

//同一个拦截器，可以设置多个操作。

var handler = {
	get: function(garget, name){
		if(name === 'prototype'){
			return Object.prototype;
		}
		return 'Hello, '+ name;
	},
	apply: function(target, thisBinding, args){
		return args[0];
	},
	construct: function(target, args){
		return {value: args[1]};
	}
};

var fproxy = new Proxy(function(x, y){
	return x+y;
}, handler);

fproxy(1, 2);//1
new fproxy(1, 2);//{value: 2}
fproxy.prototype === Object.prototype //true
fproxy.foo //"Hello, foo"



//proxy实例的方法

var person = {
	name: '张三'
};
var proxy = new Proxy(person, {
	get: function(target, property){
		if(property in target){
			return target[property];
		}else {
			throw new ReferenceError('Property "'+ property +'" does not exist!');
		}
	}
});
proxy.name;
proxy.age;

//以上代码如果访问对象不存在会抛出个错误，如果没有拦截，只会返回undefined。

//get 方法可以继承
let proto = new Proxy({}, {
	get(target, propertyKey, receiver){
		console.log('GET ' + propertyKey);
		return target[propertyKey];
	}
});

let obj = Object.create(proto);
obj.xxx;

//get 拦截，实现数组读取负数索引
function createArray(...elements){
	let handler = {
		get(target, propKey, receiver){
			let index = Number(propKey);
			if(index < 0){
				proKey = String(target.length + index);
			}
			return Reflect.get(target, proKey, receiver);
		}
	}
	
	let target = [];
	target.push(...elements);
	return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1];


//利用Proxy将get转变为某个执行某个函数，从而实现属性的链式操作。
var pie = (function(){
	return function(value){
		var funcStack = [];
		var oproxy = new Proxy({}, {
			get: function(pipeObject, fnName){
				if(fnName === 'get'){
					return funcStack.reduce(function(val, fn){
						return fn(val);
					}, value);
				}
				funcStack.push(window[fnName]);
			}
		});
		return oproxy;
	}
}());

var double = n => n*2;
var pow = n => n*n;
var reverseInt = n => n.toString().split('').reverse().join('') | 0;

pie(3).double.pow.reverseInt.get;//63

//利用get拦截，实现一个生成各种dom节点的通用函数dom

const dom = new Proxy({}, {
	get(target, property){
		return function(attrs = {}, ...children){
			const el = document.createElement(property);
			for(let prop of Object.keys(attrs)){
				el.setAttribute(prop, attrs[prop]);
			}
			for(let child of children){
				if(typeof child === 'string'){
					child = document.createTextNode(child);
				}
				el.appendChild(child);
			}
			return el;
		}
	}
});
const el = dom.div({},{
	'Hello, my name is ',
	dom.a({href:'//example.com'}, 'Mark'),
	'. I like:',
	dom.ul({},
		dom.li({}, 'The web'),
		dom.li({}, 'Food'),
		dom.li({}, '...actually that \'s it')
	)
});

document.body.appendChild(el);

//如果一个属性不可配置configurable, 不可写writable,该属性不能被代理。
const target = Object.defineProperties({},{
	foo: {
		value: 123,
		writable: false,
		configurable: false
	}
});
const handler = {
	get(target, propKey){
		return 'abc';
	}
};
const proxy = new Proxy(target, handler);
proxy.foo//报错

//set 拦截某个属性的赋值操作
let validator = {
	set: function(obj, prop, value){
		if(prop === 'age'){
			if(!Number.isInteger(value)){
				throw new TypeError('The age is not an integer');
			}
			if(value > 200){
				throw new RangeError('The age seems invalid!');
			}
		}
		obj[prop] = value;
	}
};

let person = new Proxy({}, validator);
person.age = 100;
person.age ;
person.age = 'young';
person.age = 300;

//这是数据验证的一种实现方式，利用set，还可以实现数据绑定，


//设置内部属性，一般用_开头，结合get,set可以做到防止这些内部属性被外部读写
var handler = {
	get(target, key){
		invariant(key ,'get');
		return target[key];
	},
	set(target, key, value){
		invariant(key, 'set');
		target[key] = value;
		return true;
	}
};
function invariant(key, action){
	if(key[0] === '_'){
		throw new Error(`Invalid attempt to ${action} private "${key}" property`);
	}
}
var target = {};
var proxy = new Proxy(target, handler);
proxy._prop
proxy._prop = 'c'




//appl
y拦截函数的调用，call和apply
//三个参数，目标对象，目标对象的上下文对象(this),目标对象的参数数组。
var handler = {
	apply(target, ctx, args){
		return Reflect.apply(...arguments);
	}
};

//eg:
var target = function(){return 'I am the target';};
var handler = {
	apply: function(){
		return 'I am the proxy';
	}
};
var p = new Proxy(target, handler);
p();//"I am the proxy"


var twice = {
	apply(target, ctx, args){
		return Reflect.apply(...arguments) *2;
	}
};
function sum(left, right) {
	return left+right;
}
var proxy = new Proxy(sum, twice);
proxy(1, 2);
proxy.call(null, 5, 6);
proxy.apply(null, [7,8]);


//has ,拦截HasProperty，典型的操作是in运算符
//隐藏某些属性，不被in运算符发现

var handler = {
	has(target, key){
		if(key[0] === '_'){
			return false;
		}
		return key in target;
	}
};

var target = {_prop: 'foo', prop:'foo'};
var proxy = new Proxy(target, handler);
'_prop' in target;//false

//原对象不可配置或禁止扩展，has拦截会报错。

//has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，
// 即has方法不判断一个属性是对象自身的属性，还是继承的属性。
//has对for...in循环不生效


//construct() 拦截new命令
var handler = {
	construct(target, args, newTarget){
		return target(...args);
	}
}

// eg construct 必须返回一个对象
var p = new Proxy(function(){}, {
	construct: function (target, args) {
		console.log('called: '+args.join(', '));
		return {value: args[0]*10};
	}
});
new p(1).value;


//deleteProperty 拦截delete操作，如果这个方法抛出错误或返回false，当前属性无法被delete.
// 不可配置(configurable)属性，不可被删除
var handler = {
	deleteProperty(target, key){
		invariant(key, 'delete');
		return true;
	}
};
function invariant(key, action){
	if(key[0] === '_'){
		throw new Error(`Invalid attempt to ${action} private "${key}" property.`);
	}
}
var target = {_prop: 'foo'};
var proxy = new Proxy(target, handler);
delete proxy._prop;


//definedProperty 拦截Object.definedProperty操作

var handler = {
	defineProperty(target, key, descriptor){
		return false;
	}
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar';


// gerOwnPerpertyDescriptor() 拦截Object.getOwnPropertyDescriptor()
var handler = {
	getOwnPropertyDescriptor(target, key){
		if(key[0] === '_'){
			return;
		}
		return Object.getOwnPropertyDescriptor(target, key);
	}
};
var target = {_foo:'bar', baz: 'tar'};
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat');
Object.getOwnPropertyDescriptor(proxy, '_foo');
Object.getOwnPropertyDescriptor(proxy, 'baz');

//getPrototypeOf(),用来拦截获取对象原型
/**
 * 拦截以下操作
 * Object.prototype.__proto__
 * Object.prototype.isPrototypeOf()
 * Object.getPrototypeOf()
 * Reflect.getPrototypeOf()
 * instanceof
 *
 * getPrototypeOf返回值必须是对象或null,否则报错。
 * */

var proto = {};
var p = new Proxy({}, {
	getPrototypeOf(target){
		return proto;
	}
});
Object.getPrototypeOf(p) === proto;


//isExtensible 拦截 Object.isExtensible 操作.只返回Boolean值
var p = new Proxy({}, {
	isExtensible: function (target) {
		console.log('called');
		return true;
	}
});
Object.isExtensible(p);

//强限制 返回值必须与目标对象的isExtensible值一样
Object.isExtensible(proxy) === Object.isExtensible(target);

var p = new Proxy({}, {
	isExtensible: function (target) {
		return false;
	}
})

Object.isExtensible(p);//报错




//ownKeys() 拦截对象自身属性的操作。
/**
 * 拦截以下操作：
 * Object.getOwnPropertyNames()
 * Object.getOwnPropertySymbols()
 * Object.keys()
 *
 */

//eg:拦截Object.keys()
let target = {
	a: 1,
	b: 2,
	c: 3
};
let handler = {
	ownKeys(target){
		return ['a'];
	}
};
let proxy = new Proxy(target, handler);
Object.keys(proxy);

//拦截第一个字符为下划线的属性
let target = {
	_bar: 'foo',
	_prop: 'bar',
	prop: 'baz'
};
let handler = {
	ownKes(target){
		return Reflect.ownKeys(target).filter(key => key[0] !== '_');
	}
};

let proxy = new Proxy(target ,handler);
for(let key of Object.keys(proxy)){
	console.log(target[key]);
}

/**
 * Object.keys, 有三类属性会被ownKeys自动过滤，
 * 目标对象上不存在的属性
 * 属性名为Symbol值
 * 不可遍历(enumerable)的值
 */

let target = {
	a: 1,
	b: 2,
	c: 3,
	[Symbol.for('secret')]: '4'
};
Object.defineProperty(target, 'key', {
	enumerable: false,
	configurable: true,
	writable: true,
	value: 'static'
});
let handler = {
	ownKeys(target){
		return ['a', 'd', Symbol.for('secret'), 'key'];
	}
};
let proxy = new Proxy(target, handler);
Object.keys(proxy);

//后面的属性不写了


//4. this问题
//proxy不是对目标对象的透明代理，在Proxy代理情况下，目标对象内部的this会指向Proxy代理

const target = {
	m: function(){
		console.log(this === proxy);
	}
};
const handler = {};
const proxy = new Proxy(target, handler);
target.m();//false
proxy.m();//true

//this指向了proxy，而不是target

//eg:由于this指向的变化，导致Proxy无法代理目标对象
const _name = new WeakMap();
class Person{
	constructor(name){
		_name.set(this, name);
	}
	get(name){
		return _name.get(this);
	}
}
const jane = new Person('Jane');
jane.name;
const proxy = new Proxy(jane, {});
proxy.name //undefined
//通过proxy.name访问时，this指向proxy，导致无法取到值，

//有些原生对象的内部属性，只有通过正确的this才能拿到，Proxy无法代理这些原生对象的属性
const target =new Date();
const handler = {};
const proxy = new Proxy(target, handler);
proxy.getDate();//this is not a Date object.

//用this绑定原始对象就可以了
const target = new Date('2017-5-22');
const handler = {
	get(target, prop){
		if(prop === 'getDate'){
			return target.getDate.bind(target);
		}
		return Reflect.get(target, prop);
	}
};
const proxy = new Proxy(target, handler);
proxy.getDate();


//5.实例： Web服务的客户端
//Proxy对象可以拦截目标对象的任意属性，很适合用来写Web服务的客户端
const service = createWebService('http://example.com/data');
service.employees().then(json => {
	const employees = JSON.parse(json);
	//...
});

function createWebService(baseUrl){
	return new Proxy({}, {
		get(target, propKey, receiver){
			return () => httpGet(baseUrl + '/' + propKey);
		}
	})
};


/**
 * Reflect
 * 设计目的：
 * 1. 从Reflect对象上可以拿到语言内部的方法
 * 2. 修改了某些Object方法的返回结果，变得更合理
 * 3. 让Object操作都变成函数行为。
 * 		比如：name in obj, delete obj[name],而Reflect.has(obj, name)，Reflect.deleteProperty(obj, name)
 * 		让它们变成了函数行为
 * 4. Reflect对象的方法与Proxy的方法一一对应，
 * 		这样可以在Proxy对象上调用对应的Reflect方法，
 * 		不管Proxy怎么修改默认行为，总可以在Reflect上获取默认行为
 */

//老写法
try{
	Object.defineProperty(target, property, attributes);
	//success
}catch (e){
	//failure
}
//es6
if(Reflect.defineProperty(target, property, attributes)){
	//success
}else {
	//failure
}


//es5
'assign' in Object
delete myObj.foo;
//es6
Reflect.has(Object, 'assign');
Reflect.deleteProperty(myObj, 'foo');

Proxy(target, {
	set: function (target, namee, value, receiver) {
		var success = Refllect.set(target, name, value, receiver);
		if(success){
			console.log('property '+ name + ' on ' + target + ' set to ' + value);
		}
		return success;
	}
});
//Proxy拦截了set,采用Reflect.set，确保完成原有行为，再部署额外的功能

var loggedObj = new Proxy(obj, {
	get(target, name){
		console.log('get', target, name);
		return Reflect.get(target, name);
	},
	deleteProperty(target, name){
		console.log('delete', name);
		return Reflect.deleteProperty(target, name);
	},
	has(target, name){
		console.log('has', name);
		return Reflect.has(target, name);
	}
});

//很多操作更易读
//es5
Function.prototype.apply.call(Math.floor, undefined, [1.75]);
//es6
Reflect.apply(Math.floor, undefined, [1.75]);

/**
 * 2. 静态方法
	 *Reflect.apply(target,thisArg,args)
	 Reflect.construct(target,args)
	 Reflect.get(target,name,receiver)
	 Reflect.set(target,name,value,receiver)
	 Reflect.defineProperty(target,name,desc)
	 Reflect.deleteProperty(target,name)
	 Reflect.has(target,name)
	 Reflect.ownKeys(target)
	 Reflect.isExtensible(target)
	 Reflect.preventExtensions(target)
	 Reflect.getOwnPropertyDescriptor(target, name)
	 Reflect.getPrototypeOf(target)
	 Reflect.setPrototypeOf(target, prototype)
 */


//如果name部署了读取函数(getter)，则读取this绑定receiver
var myObject = {
	foo: 1,
	bar: 2,
	get baz(){
		return this.foo + this.bar;
	}
};
var myReceiverObject = {
	foo: 4,
	bar: 4
};
Reflect.get(myObject, 'baz', myReceiverObject);//8

var myObject = {
	foo: 1,
	set bar(value){
		return this.foo = value;
	}
};
myObject.foo //1
Reflect.set(myObject, 'foo', 2);
myObject.foo

Reflect.set(myObject, 'bar', 3);
myObject.foo


//name设置了赋值函数，赋值函数的this绑定receiver
var myObject = {
	foo: 4,
	set bar(value){
		return this.foo = value;
	}
};
var myReceiverObject = {
	foo: 0
};
Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo;//4，还是原来的值
myReceiverObject.foo;//set的值到receiver上了

//因为设置了赋值函数，所以set时，this绑定的是myReceiverObject,不会赋值到myObject上，

//Reflect.set 会触发Proxy.defineProperty拦截
let p = {
	a: 'a'
};
let handler = {
	set(target, key, value, receiver){
		console.log('set');
		Reflect.set(target, key, value, receiver);
	},
	defineProperty(target, key, attribute){
		console.log('defineProperty');
		Reflect.defineProperty(target, key, attribute);
	}

};

let obj = new Proxy(p, handler);
obj.a = 'A';


//Reflect.construct 等同于new target(...args),
//提供了一种不适用new 来调用构造函数的方法
function Greeting(name){
	this.name = name;
}

//new的写法
const instance = new Greeting('张三');
//Reflect.construct的写法
const instance = Reflect.construct(Greeting, ['张三']);

//Reflect.getPrototypeOf用于读取对象的__proto__属性，对应Object.getPrototypeOf()
function FancyThing(){};
const myObj = new FancyThing();
//es5
Object.getPrototypeOf(myObj) === FancyThing.prototype;
//es6
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;


//Reflect.setPrototypeOf用于设置对象的__proto__属性，对应Object.setPrototypeOf(obj, newProto)
const myObj = new FancyThing();
//es5
Object.setPrototypeOf(myObj, OtherThing.prototype);
//es6
Reflect.setPrototypeOf(myObj, OtherThing.prototype);


// Reflect.apply 等同于Function.prototype.apply.call(func, thisArg, args),用于绑定this对象后执行给定函数
//要绑定一个函数的this 对象
fn.apply(obj, args)

//如果函数定义了自己的apply方法
Function.prototype.apply.call(fn, obj, args)

//采用Reflect对象可以简写
const ages = [11,33,23];
//es5
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

//es6
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);


//Reflect.defineProperty等同于Object.defindProperty,用来定义属性
function MyDate() {
	
}
//es5
Object.defineProperty(MyDate, 'now', {
	value: () => Date.now()
});
//es6
Reflect.defineProperty(MyDate, 'now', {
	value: () => Date.now()
});


//Reflect.getOwnPropertyDescriptor等同于Object.getOwnPropertyDescriptor
//用于得到指定属性的描述对象
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
	value: true,
	enumerable: false
});
//es5
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
//es6
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');


//Reflect.isExtensible 对应Object.isExtensible表示当前对象是否可扩展
const myObject = {};
//es5
Object.isExtensible(myObject);
//es6
Reflect.isExtensible(myObject);


//Reflect.preventExtensions 对应Object.preventExtensions,让对象变为不可扩展
var myObject = {};
//es5
Object.isExtensible(myObject);
//es6
Reflect.preventExtensions(myObject);


//Reflect.ownKeys(),用于返回对象的所有属性，
//基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
var myObject = {
	foo: 1,
	bar: 2,
	[Symbol.for('baz')]: 3,
	[Symbol.for('bing')]: 4
};
//es5
Object.getOwnPropertyNames(myObject);
Object.getOwnPropertySymbols(myObject);

//es6
Reflect.ownKeys(myObject);

//实例:使用Reflect实现观察者模式
//观察者模式(Observer mode)：指的是函数自动观察数据对象，一旦对象有变化，函数就自动执行
const person = observable({
	name: '张三',
	age: 20
});

function print(){
	console.log(`${person.name}, ${person.age}`);
}
observe(print);
person.name = '李四';


const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver){
	const result = Reflect.set(target, key, value, receiver);
	queuedObservers.forEach(observer => observer());
	return result;
}

//observable返回一个原始对象的代理，拦截赋值操作，触发充当观察者的各个函数
//先定一个Set，所有观察者函数都放进这个集合，
//observable函数返回原始对象的代理，拦截赋值操作，拦截函数set之中，会自动执行所有观察者。





/**
 * Promise 对象
 * 1.含义
 * 异步编程的解决方案。
 * 简单说是一个容器，保存着某个未来才会结束的事件(通常是异步操作)，从它可以获取异步操作的消息
 * 两个特点：
 * （1）状态不受外界影响
 * 三种状态：pending(进行中),resolved(已完成)，rejected(已失败)
 * 	只有异步操作的结果可以决定当前是哪一种状态
 *
 * （2）一旦状态改变就不会再变，任何时候都可以得到这个结果。
 * 	状态变化：Pending到Resolved，Pending到Rejected。
 * 	这与事件(Event)不同，事件是如果错过了，再去监听，得不到结果。
 *
 * Promise可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数，
 * 对外提供统一接口，使得控制异步操作更容易。
 *
 * 缺点：
 * 无法取消Promise，一旦新建就会立即执行，无法中途取消。
 * 如果不设置回调函数，Promise内部抛出错误，不会反应到外部。
 * 当处于Pending状态，无法得知目前进展到哪个状态
 *
 * 如果时间不断反复发生，一般来说使用stream模式比部署Promise更好
 *
* */

//基本用法：
var promise = new Promise(function(resolve, reject){
//	some code
	if(true /*异步操作成功*/){
		resolve(value);
	}else{
		reject(error);
	}
});

//resolve:状态从Pending到Resolved，异步操作成功时调用，并将结果作为参数传递出去
//reject:状态从Pending到Rejected,异步操作失败时调用，并将结果作为参数传递出去

//实例生成后，可用then指定Resolved和Reject
promise.then(function (value) {
//	success
}, function () {
//	failure
});

//eg
function timeout(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms, 'done');
	});
}

timeout(100).then((value) => {
	console.log(value);
});

//Promise 新建后会立即执行
let promise = new Promise(function(resolve, reject){
	console.log('Promise');
	resolve();
});

promise.then(function () {
	console.log('Resolved.');
});
console.log('Hi!');

// Promise新建后立即执行，所以首先输出的是“Promise”。
// 然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以“Resolved”最后输出。

//异步加载图片
function loadImageAsync(url){
	return new Promise(function (resolve, reject) {
		var image = new Image();
		image.onload = function () {
			resolve(image);
		};
		image.onerror = function () {
			reject(new Error('Could not load img at '+ url));
		}
		image.src = url;
	})
}


//Promise 实现Ajax
var getJSON = function(url){
	var promise = new Promise(function (resolve, reject) {
		var client = new XMLHttpRequest();
		client.open('GET', url);
		client.onreadystatechange = handler;
		client.responseType = 'json';
		client.setRequestHeader('Accept', 'application/json');
		client.send();

		function handler() {
			if(this.readyState !== 4){
				return;
			}
			if(this.status === 200){
				resolve(this.response);
			}else{
				reject(new Error(this.statusText));
			}
		};
	});
	return promise;
}

getJSON('/posts.json').then(function(json){
	console.log('Contents: ' + json);
}, function(error){
	console.error('出错了', error);
});

//resolve函数的参数除了正常的值外，还可以是另一个Promise实例
var p1 = new Promise(function(resolve, reject){
//	...
});
var p2 = new Promise(function (resolve, reject) {
//	...
	resolve(p1);
});

//p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。
//p1的状态决定了p2的状态。如果p1是pending，p2的回调会等待p1的状态改变，
//如果p1的状态是Resolved或Rejected，则p2的回调立即执行

var p1 = new Promise(function(resolve, reject){
	setTimeout(() => reject(new Error('fail')), 3000)
});
var p2 = new Promise(function (resolve, reject) {
	setTimeout(() => resolve(p1), 1000)
})
p1.then(result => console.log(result))
	.catch(error => console.log(error))

/*
 p1是一个Promise，3秒之后变为rejected。p2的状态在1秒之后改变，resolve方法返回的是p1。
 由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。
 所以，后面的then语句都变成针对后者（p1）。
 又过了2秒，p1变为rejected，导致触发catch方法指定的回调函数。
  */


/*
	Promise.prototype.then
	为Promise实例添加状态改变时的回调函数
	then方法返回的是一个新的Promise实例(不是原来那个实例)，因此可以采用链式操作
 */

getJSON('/posts.json').then(function (json) {
	return json.post;
}).then(function (post) {
//	...
});
//第一个回调执行完后，将返回结果作为参数，传入第二个回调函数


getJSON('/posts.json', function (post) {
	return getJSON(post.commentURL);
}).then(function funcA(comments) {
	console.log('Resolved: '+ comments);
}, function funcB(err){
	console.log('Rejected: '+err);
});


//用箭头函数改写
getJSON('/posts.json').then(
	post => getJSON(post.commentURL)
).then(
	comments => console.log('Resolved: '+ comments),
	err => console.log('Rejected: '+err)
);

//第一个then方法返回另一个Promise对象，第二个then等待这个新的Promise发生状态变化
//成功调用funcA,失败调用funcB

//Promise.prototype.catch
//是.then(null, rejection)的别名
p.then(val => console.log('fulfilled: '+val))
	.catch(err => console.log('rejected: '+ err));

//等同于
var promise = new Promise(function(resolve, reject){
	throw new Error('test');
});
promise.catch(function(error){
	console.log(error);
});

//等同于
var promise = new Promise(function(resolve, reject){
	try{
		throw new Error('test');
	}catch(e){
		reject(e);
	}
});
promise.catch(function (error) {
	console.log(error);
});

//等同于
var promise = new Promise(function(resolve, reject){
	reject(new Error('test'));
});
promise.catch(function(error){
	console.log(error);
});

//Promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止。
//错误总是会被下一个catch捕获。

getJSON('/posts.json').then(function (post) {
	return getJSON(post.commentURL);
}).then(function(comments){
//	...
}).catch(function (err) {
//	处理前面3个Promise产生的错误
});


//一般来说不要在then方法里面定义Reject状态的回调函数，(即第二个参数)，建议使用catch方法
//bad
promise.then(function (data) {
//	success
}, function(err){
//	err
});

//good
promise.then(function(data){//cb
//	success
}).catch(function(err){
//	err
});
//第二种写法可以捕获前面then方法中执行的错误。更接近同步的写法(try...catch)


var promise = new Promise(function(resolve, reject) {
	resolve('ok');
	setTimeout(function() { throw new Error('test') }, 0)
});
promise.then(function(value) { console.log(value) });
// ok
// Uncaught Error: test

// Promise 指定在下一轮“事件循环”再抛出错误，结果由于没有指定使用try...catch语句，
// 就冒泡到最外层，成了未捕获的错误。因为此时，Promise的函数体已经运行结束了，
// 所以这个错误是在Promise函数体外抛出的。


//Node有个unhandledRejection，专门监听未捕获的reject错误
process.on('unhanldedRejection', function (err, p) {
	console.log(err.stack)
});

//catch方法返回的是Promise对象，后面还可以接着调用then方法。

var someAsyncThing = function(){
	return new Promise(function (resolve, reject) {
		//这一行会报错，x未定义
		resolve(x+2);
	})
};
someAsyncThing().catch(function (error) {
	console.log('oh no', error);
}).then(function () {
	console.log('carry on');
});
// 报错后再执行carry on

Promise.resolve().catch(function (error) {
	console.log('oh no ', error);
}).then(function () {
	console.log('carry on');
})
//没有报错会跳过执行后面的then
//catch可以连写，捕获catch中的错误



//Promise.all,用于将多个Promise实例，包装成一个新的Promise
// 参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。

var p = new Promise([p1, p2, p3]);
//p的状态由p1,p2,p3决定，分两种情况
/*
1, p1,p2,p3的状态都变成fulfilled的,p的状态才会变成fulfilled,
	此时p1,p2,p3的返回值组成一个数组,传递给p的回调函数。
2, 只要有一个被rejected,p的状态就会变成rejected,
	此时第一个被reject实例的返回值，会传递给p的回调函数。

 */

var promises = [2,3,5,7,11,13].map(function (id) {
	return getJSON('/post/'+id+'.json');
});
Promise.all(promises).then(function (posts) {
//	...
}).catch(function (reson) {
//	...
});

//eg
const databasePromise = connectDatabase();
const bookPromise = databasePromise.then(findAllBooks);
const userPromise = databasePromise.then(getCurrentUser);
Promise.all([bookPromise, userPromise])
	.then(([book, user]) => pickTopRecommentations(book, user));

//Promise.race()
var p = new Promise([p1, p2, p3]);
//只要p1,p2,p3之中有个率先改变状态，p的状态就跟着变化。
//率先改变状态的Promise实例的值，就传递给p的回调函数

const p = Promise.race([
	fetch('/resource-that-may-take-a-while'),
	new Promise(function (resolve, reject) {
		setTimeout(() => reject(new Error('request timeout')), 5000)
	})
]);
p.then(response => console.log(response));
p.catch(error => console.log(error));
//5秒内未返回结果，p的状态就会变成rejected,触发catch指定的方法

//Promise.resolve 将现有对象转为Promise对象
var jsPromise = Promise.resolve($.ajax('whatever.json'));
//将jQuery生成的deferred,转为一个新的Promise对象

// Promise.resolve等价于下面的写法
Promise.resolve('foo')
//等价于
new Promise(resolve => resolve('foo'));

//Promise.resolve的参数有四种情况
//1.参数是Promise对象,原封不动返回
//2. 参数是thenable对象: 具有then方法的对象，
//Promise.resolve会将这个对象转为Promise对象，然后立即执行thenable对象的then方法
let thenable = {
	then: function (resolve, reject) {
		resolve(42);
	}
};

let p1 = Promise.resolve(thenable);
p1.then(function(value){
	console.log(value);
});
// thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出42。

//3. 参数是原始值，Promise.resolve返回一个新的Promise对象，状态为Resolved
var p = new Promise.resolve('Hello');
p.then(function (s) {
	console.log(s);
});

//4. 不带有任何参数 直接返回Resolved状态的Promise对象
//要得到一个Promise对象，比较方便的方法是直接调用Promise.resolve方法
var p = new Promise();
p.then(function () {
//...
});
//立即resolve的Promise对象，是在本轮事件循环"event loop"的结束时
//而不是在下一轮'事件循环'的开始时。

setTimeout(function () {
	console.log('three')
},0);
Promise.resolve().then(function(){
	console.log('two')
});
console.log('one');
// one
// two
// three

// setTimeout(fn, 0)在下一轮“事件循环”开始时执行，
// Promise.resolve()在本轮“事件循环”结束时执行，
// console.log('one')则是立即执行，因此最先输出。



//8. Promise.reject 返回一个状态为rejected的Promise实例
var p = Promise.reject('出错了');
//等同于
var p = new Promise((resolve, reject) => reject('出错了'));
p.then(null, function(s){
	console.log(s)
});

const thenable = {
	then(resolve, reject){
		reject('出错了');
	}
}
Promise.reject(thenable).catch(e => {
	console.log(e === thenable)
});
//Promise.reject的参数是一个thenable对象，后面的catch的参数不是抛出'出错了',
//而是thenable对象。


//9. 两个有用的附加方法
//done
//Promise 对象的回调链，不管以then，或catch结尾，最后一个方法抛出错误，都可能无法捕获到
//可以提供一个done方法总是处于回调链的尾端，保证捕获抛出的错误。

asyncFunc().then(f1).catch(r1).then(f2).done();

//实现代码
Promise.prototype.done = function(onFulfilled, onRejected){
	this.then(onFulfilled, onRejected).catch(function (reason) {
	//	抛出一个全局错误
		setTimeout(() => {throw reason}, 0)
	});
};
// 不管怎样，done都会捕捉到任何可能出现的错误，并向全局抛出。


//finally 用于指定不管Promise最后状态如何，都会执行的操作。
//与done的区别，接受一个普通的回调函数作为参数，该函数不管怎样都会执行。

//eg: 服务器用Promise处理请求，然后用finally方法关掉服务器
server.listen(0).then(function(){
	//run test
}).finally(server.stop);

//实现
Promise.prototype.finally = function(callback){
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => {throw reason})
	);
};



//10. 应用

//加载图片
//将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化
const preloadImage = function(path){
	return new Promise(function(resolve, reject){
		var image = new Image();
		image.onload = resolve;
		image.onerror = reject;
		image.src = path;
	});
};


//Generator函数与Promise结合
//用Generator函数管理流程，遇到异步操作时，通常返回一个Promise对象
function getFoo(){
	return new Promise(function(resolve, reject){
		resolve('foo');
	});
}

var g = function* (){
	try {
		var foo = yield getFoo();
		console.log(foo);
	}catch (e){
		console.log(e);
	}
};

function run(generator) {
	var it = generator();
	function go(result){
		if(result.done) return result.value;

		return result.value.then(function(value){
			return go(it.next(value));
		}, function(error){
			return go(it.throw(error));
		});
	}

	go(it.next());
}
run(g);


//11. Promise.try

/*
* 实际开发中，不知道或不想区分函数f是同步还是异步，但想用Promise来处理。
* 因为这样不管同步异步，都会用then来指定下一步流程，用catch处理f抛出的错误。
*
* */

//一般写法
Promise.resolve().then(f)

//上面缺点：如果f是同步函数，它会在本轮事件循环的末尾执行。
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
//next now

//f是同步的，但是用Promise包装后，成异步执行了。

//让同步函数同步执行，异步函数异步执行，并且具有统一的API。两种写法
//1.async
const f = () => console.log('now');
(async () = f())();
console.log('next');

//async() => f() 会吃掉f()抛出的错误。想捕获错误，要使用Promise.catch方法
(async() => f())()
	.then(
	//	...
	)
	.catch(
	// ...
	)

//2.用new Promise()
const f = () => console.log('now');
(
	() => new Promise(
		resolve => resolve(f())
	)
)();
console.log('next');
//now next
//使用立即执行的匿名函数，执行new Promise().这时，同步函数也是同步执行

//用Promise.try 替代上面的方法
//Promise.try为所有操作提供了统一的处理机制。如果想用then方法管理流程，最好用Promise.try包装一下，
//好处是可以更好的管理异常
var database = {}；
function getUsername(userId){
	return database.users.get({id: userId})
		.then(function (user) {
			return user.name;
		});
}
//database.user.get()返回一个Promise对象，如果抛出异步错误，可以用catch捕获，如下：
database.users.get({id: userId}).then().catch();

// 但database.users.get可能抛出同步错误，(如数据库连接失败等).这时候不得不用try...catch捕获。
try {
	database.users.get({id: userId})
		.then()
		.catch()
} catch(e){
//	...
}

//上面的写法笨拙，可以用Promise.try
Promise.try(
	database.users.get({id: userId})
).then()
	.catch();
//Promise.try就是模拟try代码块，Promise.catch模拟catch代码块。



/*
* Iterator
* 为各种不同的数据结构提供统一访问的机制
* 遍历器对象本质上，就是一个指针对象。
*
*
* */



var it = makeIterator(['a', 'b']);
it.next();
it.next();
it.next();

function makeIterator(array){
	var nextIndex = 0;
	return {
		next: function(){
			return nextIndex < array.length ?
			{value: array[nextIndex++], done: false}:
			{value: undefined, done: true};
		}
	};
}


//当使用for...of循环遍历某种数据结构，会自动寻找Iterator接口。

//es6中，有3类数据结构具有原生Iterator接口：数组，某些类似数组的对象，Set和Map结构
//这3类数据结构，不用自己写遍历器生成函数，for...of会自动遍历。


//遍历器实现指针结构的例子
function Obj(value){
	this.value = value;
	this.next = null;
}

Obj.prototype[Symbol.iterator] = function(){
	var iterator = {
		next: next
	};

	var current = this;

	function next() {
		if(current){
			var value = current.value;
			current = current.next;
			return {
				done: false,
				value: value
			};
		}else{
			return {
				done: true
			};
		}
	}
	return iterator;
};

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for(var i of one){
	console.log(i);
}
// 在构造函数的原型链上部署Symbol.iterator方法，调用该方法会返回遍历器对象iterator，
// 调用该对象的next方法，在返回一个值的同时，自动将内部指针移到下一个实例。

//eg:为另一个对象添加Iterator接口
let obj = {
	data: ['hello', 'world'],
	[Symbol.iterator](){
		const self = this;
		let index = 0;
		return {
			next(){
				if(index < self.data.length){
					return {
						value: self.data[index++],
						done: false
					};
				}else {
					return {value: undefined, done: true};
				}
			}
		}
	}
}

// 类似数组的对象(存在数组键名和length),部署Iterator接口
// 用Symbol.iterator方法直接引用数组的iterator接口。
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
[...document.querySelectorAll('div')]

//用while循环
var $iterator = ITERABLE[Symbol.iterator]();
var $result = $iterator.next();
while(!$result.done){
	var x = $result.value;
//	...
	$result = $iterator.next();
}


/*调用Iterator接口的场合
	1.解构赋值
	2.扩展运算符
	3.yield*

	for...of
	Array.from()
	Map,Set,WeakMap,WeakSet
	Promise.all
	Promise.race
*/

let set = new Set().add('a').add('b').add('c');
let [x, y] = set;//x=a,y=b
let [first, ...rest] = set;//first=a,rest=[b,c]


var str = 'hello';
[...str];//['h','e','l','l','o']
let arr = ['b','c'];
['a',...arr,'d']// ['a', 'b', 'c', 'd']


let generator = function* (){
	yield 1;
	yield* [2,3,4];
	yield 5;
};
var iterator = generator();
iterator.next();// { value: 1, done: false }
iterator.next();
iterator.next();
iterator.next();
iterator.next();// { value: 5, done: false }
iterator.next();// { value: undefined, done: true }



//4. 字符串的iterator接口
var someString = 'hi';
typeof someString[Symbol.iterator]//function

var iterator = someString[Symbol.iterator]();
iterator.next();
iterator.next();
iterator.next();

//覆盖原生的Symbol.iterator方法，
var str = new String('hi');
[...str]
str[Symbol.iterator] = function(){
	return {
		next: function(){
			if(this._first){
				this._first = false;
				return {value:'bye', done: false};
			}else{
				return {done: true};
			}
		},
		_first: true
	};
};
[...str]


//5. Iterator接口与Generator函数
var myIterable = {};
myIterable[Symbol.iterator] = function* (){
	yield 1;
	yield 2;
	yield 3;
};
[...myIterable]

//或者
let obj = {
	* [Symbol.iterator](){
			yield 'hello';
			yield 'world';
  	 }
};

for(let x of obj){
	console.log(x);
}


//6. 遍历器对象的return(),throw()
//遍历器除了next,还有return ,throw，
// return :如果for...of循环提前退出，就会调用return
//return必须返回一个对象
function readLinesSync(file){
	return {
		next() {
			if(file.isAtEndOfFile()){
				file.close();
				return {done: true};
			}
		},
		return (){
			file.close();
			return {done: true};
		}
	};
};

for(let line of readLinesSync(fileName)){
	console.log(line);
	break;
}


//7. for...of 循环
//for...of循环的本质就是调用iterator接口产生的遍历器。

//数组
const arr = ['red','green','blue'];
for(let v of arr){
	console.log(v);
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for(let v of obj){
	console.log(v);
}


//for...of可以代替数组的forEach
const arr = ['red', 'green', 'blue'];
arr.forEach(function(element, index){
	console.log(element, index);
});


var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
	console.log(a); // 0 1 2 3
}

for (let a of arr) {
	console.log(a); // a b c d
}
//for...in循环读取键名，for...of循环读取键值。
//获取数组的索引，可以借助数组实例的entries方法和keys方法

//for...of循环，只返回具有数字索引的属性。这点和for...in不一样
let arr = [3,5,7];
arr.foo = 'hello';

for(let i in arr){
	console.log(i);// "0", "1", "2", "foo"
}

for(let i of arr) {
	console.log(i); //  "3", "5", "7"
}


// Set和Map
//遍历顺序是添加进去的顺序，
//Set返回的是一个值，Map返回的是一个数组

var engines = new Set(['Gecko', 'Trident', 'Webkit', 'Webkit']);
for(var e of engines){
	console.log(e);
};

var map = new Map();
map.set('edition', 6);
map.set("committee", "TC39");
map.set("standard", "ECMA-262");

for(var [name, value] of map){
	console.log(name + ':'+ value);
}

let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
	console.log(pair);
}
// ['a', 1]
// ['b', 2]

for (let [key, value] of map) {
	console.log(key + ' : ' + value);
}
// a : 1
// b : 2

let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
	console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']

// 对于字符串来说，for...of循环还有一个特点，就是会正确识别32位 UTF-16 字符。

for (let x of 'a\uD83D\uDC0A') {
	console.log(x);
}
// 'a'
// '\uD83D\uDC0A'

// 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。

let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) {
	console.log(x);
}

// 正确
for (let x of Array.from(arrayLike)) {
	console.log(x);
}


//对象
// 普通的对象，for...of结构不能直接使用，会报错，
// 必须部署了 Iterator 接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名。
let es6 = {
	edition: 6,
	committee: "TC39",
	standard: "ECMA-262"
};

for (let e in es6) {
	console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
	console.log(e);
}
// TypeError: es6 is not iterable

// 一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。
for(var key of Object.keys(someObject)){
	console.log(key + ': '+ someObject[key]);
}

//另一种方法是用Generator将对象重新包装一下
function* entries(obj){
	for(let key of Object.keys(obj)){
		yield [key, obj[key]];
	}
}
for(let [key, value] of entries(obj)){
	console.log(key, '->', value);
}


//与其他遍历语法比较
//最原始的for循环
//数组提供的forEach, 中途无法跳出forEach循环，break，return都不奏效。
//for...in 可以遍历数组键名
//	缺点： 1.数组的键名是数字，for...in已字符串做键名'0','1'等。
// 				2. for...in不仅遍历数字键名，还会遍历手动添加的其他键，
//				3. 某些情况下for...in会以任意顺序遍历键名

//for...of的优点
//语法同for...in一样，但没有for...in的缺点
//不同于forEach，可以与break，continue，return配合使用
// 提供了遍历所有数据结构的统一操作接口。



/*
	Generator
	从语法上理解：是一个状态机，封装了多个内部状态
	还是一个遍历器生成对象，会返回一个遍历器对象，可以依次遍历Generator函数内部的每一次状态

	两个特征：
	1.function与函数名之间有个*
	2.函数体内部用yield表达式（产出）,定义不同的状态


 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，
 而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。
 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
 也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，
 直到遇到下一个yield表达式（或return语句）为止。
 换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
 */



function* helloWorldGenerator(){
	yield 'hello';
	yield 'world';
	return 'ending';
}
var hw = helloWorldGenerator();
//函数有3个状态

//ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

function * foo(x, y) {}
function *foo(x, y) {}
function* foo(x, y) {}
function*foo(x, y) {}

// 一般都采用第三种写法

//yield 表达式 暂停标志


/*
 遍历器对象的next方法的运行逻辑如下。
 （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
 （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
 （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
 （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

 yield与return比较
 相似：都能返回紧跟在语句后表达式的值
 区别：yield，会暂停执行，下次从该位置继续向后执行，return不具有位置记忆功能。
 一个函数里只能执行一次return，但可以多次执行yield，
 yield只能用在Generator中
 yield如果用在另一个表达式中，必须放在圆括号里
 yield 用作函数参数或在赋值表达式右边，可以不加括号
 */

// Generator 可以不用yield，变成单独的暂缓执行函数
function* f() {
	console.log('执行了');
}
var generator = f();
setTimeout(function(){
	generator.next();
},200);

generator[Symbol.iterator]() === generator;

function* demo(){
	console.log('Hello'+(yield));
	console.log('Hello'+(yield 123));
}

function* demo(){
	foo(yield  'a', yield  'b');
	let input = yield;
}


//与Iterator接口的关系
//Generator就是遍历器生成函数，可以把Generator赋值给对象的Symbol.iterator属性
//获得该对象的Iterator接口

var myIterable = {};
myiterable[Symbol.iterator] = function* (){
	yield 1;
	yield 2;
	yield 3;
};

[...myIterable];


//next 方法的参数
//通过next参数，在Generator开始运行之后，继续向函数提内部注入值，调整函数行为。
// yield表达式本身没有返回值，或者说总是返回undefined。
function* foo(x){
	var y = 2 * (yield (x+1));
	var z = yield (y/3);
	return (x+y+z);
}

var a = foo(5);
a.next()//6
a.next()//NaN
a.next()//NaN

var b = foo(5);
b.next();//6
b.next(12);//8
b.next();//42
//好难~~~~~~~~~~~~~~~

/*
 由于next方法的参数表示上一个yield表达式的返回值，所以第一次使用next方法时，不能带有参数。
 V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。
 从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
 */

// 想要第一次调用next，输入值，可以在Generator外面再包一层
function wrapper(generatorFunction) {
	return function(...args){
		let generatorObject = generatorFunction(...args);
		generatorObject.next();
		return generatorObject;
	};
}

const wrapped = wrapper(function* (){
	console.log(`First input: ${yield}`);
	return 'DONE';
});

wrapped().next('hello!');
// First input: hello!


//eg:
function* dataConsumer(){
	console.log('Started');
	console.log(`1. ${yield}`);
	console.log(`2. ${yield}`);
	return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b


//3. for...of循环  自动遍历Generator函数时生成的Iterator对象，此时不用调用next方法
function *foo() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
	return 6;
}

for (let v of foo()) {
	console.log(v);
}
// 1 2 3 4 5
// 一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，
// 所以上面代码的return语句返回的6，不包括在for...of循环之中。

//利用Generator和for...of循环实现裴波那契数列
function* fibonacci(){
	let [pre, curr] = [0,1];
	for(;;){
		[pre, curr] = [curr, pre+curr];
		yield curr;
	}
}
for(let n of fibonacci()){
	if(n>1000) break;
	console.log(n);
}


//原生对象通过Generator为它加上遍历接口
function* objectEntries(obj){
	let propKeys = Reflect.ownKeys(obj);
	for(let propKey of propKeys){
		yield [propKey, obj[propKey]];
	}
}

let jane = {first: 'Jane', last: 'Doe'};
for(let [key,value] of objectEntries(jane)){
	console.log(`${key}: ${value}`);
}


//除了for...of外，扩展运算副(...),结构赋值和Array.from方法内部调用的都是遍历器接口。
//都可以将Generator函数返回的Iterator对象作为参数

function* numbers(){
	yield 1
	yield 2
	return 3
	yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
	console.log(n)
}
// 1
// 2


//Generator.prototype.throw
//在函数体外抛出，再Generator函数体内捕获
var g = function* (){
	try{
		yield ;
	}catch(e){
		console.log('内部捕获',e);
	}
};

var i = g();
i.next();
try{
	i.throw('a');
	i.throw('b');
}catch(e){
	console.log('外部捕获',e);
}
// 内部捕获 a
// 外部捕获 b


//throw接受参数，建议抛出Error对象
var g = function* (){
	try{
		yield;
	}catch(e){
		console.log(e);
	}
};
var i = g();
i.next();
i.throw(new Error('出错了！'));

//throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
var gen = function* gen(){
	try{
		yield console.log('a');
	}catch(e){
		//...
	}
	yield console.log('b');
	yield console.log('c');
}

var g = gen();
g.next();//a
g.throw();//b 这里自动执行了一次next方法
g.next();//c


//eg
function* g(){
	yield 1;
	console.log('throwing an exception');
	throw new Error('generator broke!');
	yield 2;
	yield 3;
}

function log(generator){
	var v;
	console.log('starting generator');
	try{
		v = generator.next();
		console.log('第一次运行next方法', v);
	}catch(err){
		console.log('捕获错误', v);
	}
	try{
		v = generator.next();
		console.log('第二次运行next方法', v);
	}catch(err){
		console.log('捕获错误', v);
	}
	try{
		v = generator.next();
		console.log('第三次运行next方法', v);
	}catch(err){
		console.log('捕获错误', v);
	}
	console.log('caller done');
}
log(g());

//懵~~~~


//5. generator.prototype.return
//返回给定的值，并且中介遍历Generator函数

function* gen(){
	yield 1;
	yield 2;
	yield 3;
}

var g = gen();
g.next();//3,false
g.return('foo');//foo, true
g.next();//undefined,true

//若return不提供参数，则返回的value值为undefined
g.return();//undefined, true


//如果Generator函数有try...catch代码块，return会被推迟到finally执行完再执行
function* numbers(){
	yield 1;
	try{
		yield 2;
		yield 3;
	}finally {
		yield 4;
		yield 5;
	}
	yield 6;
}
var g = numbers();
g.next();//1
g.next();//2
g.return('7');//4
g.next();//5
g.next();//7,true


//6. yield* 表达式
//用来在一个Generator函数里执行另一个Generator函数

function* foo(){
	yield 'a';
	yield 'b';
}

function* bar() {
	yield 'x';
	yield* foo();
	//这里直接写foo();不会遍历foo
	yield 'y';
}

//等同于
function* bar(){
	yield 'x';
	yield 'a';
	yield 'b';
	yield 'y';
}
// 等同于
function* bar() {
	yield 'x';
	for (let v of foo()) {
		yield v;
	}
	yield 'y';
}

for(let v of bar()){
	console.log(v);
}


let delegatedIterator = (function* () {
	yield 'Hello!';
	yield 'Bye!';
}());

let delegatingIterator = (function* () {
	yield 'Greetings!';
	yield* delegatedIterator;
	yield 'Ok, bye.';
}());

for(let value of delegatingIterator) {
	console.log(value);
}
// "Greetings!
// "Hello!"
// "Bye!"
// "Ok, bye."


// yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。

function* concat(iter1, iter2) {
	yield* iter1;
	yield* iter2;
}

// 等同于

function* concat(iter1, iter2) {
	for (var value of iter1) {
		yield value;
	}
	for (var value of iter2) {
		yield value;
	}
}

//如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
//任何数据结构只要有 Iterator 接口，就可以被yield*遍历。
let read = (function* () {
	yield 'hello';
	yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"


//被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
function *foo() {
	yield 2;
	yield 3;
	return "foo";
}

function *bar() {
	yield 1;
	var v = yield *foo();
	console.log( "v: " + v );
	yield 4;
}

var it = bar();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}


//eg: 获取嵌套数组的所有成员
function* iterTree(tree){
	if(Array.isArray(tree)){
		for(let i=0;i<tree.length;i++){
			yield* iterTree(tree[i]);
		}
	}else{
		yield tree;
	}
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
for(let x of iterTree(tree)){
	console.log(x);
}

//eg: 使用yield* 遍历完全二叉树
//下面是二叉树的构造函数，三个参数分别是左树，当前节点，右树
function Tree(left, label, right){
	this.left = left;
	this.label = label;
	this.right = right;
}

//中序(inorder)遍历函数
//由于返回的是一个遍历器，所以要用Generator函数
//函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t){
	if(t){
		yield* inorder(t.left);
		yield t.label;
		yield* inorder(t.right);
	}
}

//生成二叉树
function make(array){
//	判断是否为叶节点
	if(array.length == 1) return new Tree(null, array[0], null);
	return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
	result.push(node);
}

console.log(result);



//Generator作为对象属性
//标识这个属性是个Generator函数
let Object= {
	* myGeneratorMethod(){
	//		...
	}
}

//完整形式
let obj = {
	myGeneratorMethod: function*(){
	//	...
	}
}


//8. Generator 的this

function* g(){}
g.prototype.hello = function(){
	return 'hi!';
};

let obj = g();
obj instanceof g;//true
obj.hello() // 'hi!'

//把g当做普通的构造函数，不会生效，g返回的是遍历器对象，不是this对象。

//Generator函数不能和new一起用
new g();//会报错

//让Generator函数返回正常的实例对象，既可以用next，又可以获得正常this
//首先生成一个空对象，使用call绑定Generator函数的this，构造函数调用后
//这个空对象就是Generator函数对象的实例对象。

function* F() {
	this.a = 1;
	yield this.b = 2;
	yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3

//上面代码中执行的是遍历器对象f,但生成的对象实例是obj，

function* F() {
	this.a = 1;
	yield this.b = 2;
	yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3

// 再将F改成构造函数，就可以对它执行new命令了。
function* gen() {
	this.a = 1;
	yield this.b = 2;
	yield this.c = 3;
}

function F() {
	return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3

//9 含义
//Generator与状态机
var ticking = true;
var clock = function () {
	if(ticking){
		cosole.log('Tick!');
	}else{
		console.log('Tock!');
	}
	ticking = !ticking;
}

//clock有两种状态，Tick和Tock,每运行一次就改变一次状态

//用Generator实现
var clock = function* () {
	while(true){
		console.log('Tick!');
		yield ;
		console.log('Tock!');
		yield ;
	}
}

//Generator与ES5比较，少一个保存状态的变量，这样更简洁更安全，
// (状态不会被篡改)，更符合函数式编程思想，写法也更优雅
/*Generator之所以不用外部变量保存状态，是因为他本身就包含了一个状态信息
* 即目前是否处于暂停态。
* */

//Generator与协程

//10. 应用
// 1.异步操作的同步表达
function showLoadingScreen() {}
function hideLoadingScreen() {}
function* loadUI() {
	showLoadingScreen();
	yield loadUIDataAsynchronously();
	hideLoadingScreen();
}
var loader = loadUI();
//加载ui
loader.next();
//卸载ui
loader.next();


//Generator 函数部署 Ajax 操作，可以用同步的方式表达。

function* main() {
	var result = yield request('http://example.com');
	var resp = JSON.parse(result);
	console.log(resp.value);
}
function request() {
	makeAjaxCall(url, function (response) {
		it.next(response);
	});
}
var it = main();
it.next();

//Generator 函数逐行读取文本文件。
function* numbers() {
	let file = new FileReader('numbers.txt');
	try {
		while (!file.eof){
			yield parseInt(file.readLine(), 10);
		}
	}finally {
		file.close();
	}
}

//2. 控制流管理

//回调嵌套
step1(function (value1) {
	step2(value1, function(value2) {
		step3(value2, function(value3) {
			step4(value3, function(value4) {
				// Do something with value4
			});
		});
	});
});

//采用Promise
Promise.resolve(step1)
	.then(step2).then(step3)
	.then(function (value4) {
		
	},function (error) {
		
	}).done();

//采用Generator
function* longRunningTask(value1) {
	try {
		var value2 = yield step1(value1);
		var value3 = yield step1(value2);
		var value4 = yield step1(value3);
		var value5 = yield step1(value4);
	}catch (e){

	}
}

//使用一个函数，按次序自动执行所有步骤
scheduler(longRunningTask(initialValue));
function scheduler(task) {
	var taskObj = task.next(task.value);
//	如果Generator函数未结束，则继续调用
	if(!taskObj.done){
		task.value = taskObj.value;
		sheduler(task);
	}
}
//上面的，只适用于同步操作，不能有异步操作。

//利用for...of自动依次执行yield的特性，提供一种控制流管理的方法

let steps = [step1Func, step2Func, step3Func];
function* iterateSteps(steps) {
	for(var i=0;i<steps.length;i++){
		var step = steps[i];
		yield step();
	}
}

//任务分解成步骤之后，还可将项目	分解成多个依次执行的任务
let jobs = [job1, job2, job3];
function* iterateJobs(jobs) {
	for(var i=0;i<jobs.length;i++){
		var job = jobs[i];
		yield* iterateSteps(job.steps);
	}
}

//jobs封装了一个项目的多个任务，Generator函数iteratorJobs
//则依次为这些任务加上yield*命令。

//用for...of循环一次性依次执行所有任务的所有步骤
for(var step of iteratorJobs(jobs)){
	console.log(step.id);
}
//以上只能用于同步操作

//for...of本质是while循环，上面的代码执行的是下面的逻辑
var it = iteratorJobs(jobs);
var res = it.next();
while(!res.done){
	var result = res.value;
//	...
	res = it.next();
}



// 3.部署Iterator接口
//利用Generator在任意对象上部署Irerator接口
function* iterEntries(obj) {
	let keys = Object.keys(obj);
	for(let i=0;i<keys.length;i++){
		let key = keys[i];
		yield [key, obj[key]];
	}
}
let obj = {foo:3, bar:7};
for(let [key,value] of iterEntries(myObj)){
	console.log(key, value);
}

//对数组部署Iterator接口，尽管原生具有这个接口
function* makeSimpleGenerator(array) {
	var nextIndex = 0;
	while(nextIndex < array.length){
		yield array[nextIndex];
	}
}
var gen = makeSimpleGenerator(['yo','ya']);
gen.next().value;//yo
gen.next().value;//ya
gen.next().done;//true


//4. 作为数据结构
// Generator可以作为数据结构，准确的说是数组结构，
// 因为Generator可以返回一系列的值，它可以对任意表达式提供类似数组的接口

function* doStuff() {
	yield fs.readFile.bind(null, 'hello.txt');
	yield fs.readFile.bind(null, 'world.txt');
	yield fs.readFile.bind(null, 'and-such.txt');
}
for(task of doStuff()){
	//task是个函数，可以像回调函数一样调用函数
}

//实际上，如果用 ES5 表达，完全可以用数组模拟 Generator 的这种用法。

function doStuff() {
	return [
		fs.readFile.bind(null, 'hello.txt'),
		fs.readFile.bind(null, 'world.txt'),
		fs.readFile.bind(null, 'and-such.txt')
	];
}


/*
  
  Generator 函数的异步应用
  
  
 */

//回调函数地狱 callback hell :代码多重嵌套,不是纵向发展而是横向发展,多个异步形成强耦合
//读取A文件再读取B文件
fs.readFile(fileA, 'utf-8', function(err, data){
	fs.readFile(fileB, 'utf-8', function(err, data){
	//...
	});
});

//Promise将回调函数的嵌套改成链式调用.
//Promise 最大问题: 代码冗余,看上去都是一堆then,语义不清晰
var readFile = require('fs-readfile-promise');
readFile(fileA)
	.then(function(data){
		console.log(data.toString());
	})
	.then(function(data){
		return readFile(fileB);
	})
	.then(function(data){
		console.log(data.toString());
	})
	.catch(function(err){
		console.log(err.toString());
	})

//Generator  最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。
//缺点: 流程管理不方便,(即何时执行第一阶段,何时执行第二阶段)
//协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
function* asyncJob(){
	//...其他代码
	var f = yield readFile(fileA);
	//...其他代码
}

//Generator函数的数据交换和错误处理
//Generator可以暂停和恢复执行.这是封装异步的根本原因.
//还有两个特性:函数体内外的数据交换和错误处理机制.

function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }

//Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw('出错了');


//异步任务的封装
var fetch = require('node-fetch');
function* gen(){
	var url = 'https://api.github.com/users/github';
	var result = yield fetch(url);
	console.log(result.bio);
}

//执行这段代码的方法如下:
var g = gen();
var result = g.next();
result.value.then(function(data){
	return data.json();
}).then(function(data){
	g.next(data);
})



//Thunk函数 JavaScript是传值调用,Thunk函数替换的不是表达式,而是多参函数,
//将其替换成只接受回调函数作为参数的单参数函数

//正常的readFile(多参数)
fs.readFile(fileName, callback);

//Thunk版本的readFile(单参数)
var Thunk = function(fileName){
	return function (callback){
		return fs.readFile(fileName, callback);
	}
}

var readFileThunk = Thunk(fileName);
readFileThunk(callback);


//任何函数,只要有回调函数,就能写成Thunk函数

//eg: 简单的Thunk 函数转换器
//ES5
var Thunk = function(fn){
	return function(){
		var args = Array.prototype.slice.call(arguments);
		return function(callback){
			args.push(callback);
			return fn.apply(this, args);
		}
	}
}

//ES6
const Thunk = function(fn){
	return function(...args){
		return function(callback){
			return fn.call(this, ...args, callback);
		}
	}
}

//生成fs.readFile的Thunk 函数
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);

//eg:完成例子
function f(a, cb){
	cb(a);
}
const ft = Thunk(f);
ft(1)(console.log);





























/*
	Async 函数
	是Generator函数的语法糖


* */

// Generator依次读取两个文件
var fs = require('fs');
var readFile = function (filename) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filename, function (error, data) {
			if(error) reject(error);
			resolve(data);
		});
	});
};

var gen = function* () {
	var f1 = yield fs.readFile('/etc/fstab');
	var f2 = yield fs.readFile('/etc/shells');
	console.log(f1.toString());
	console.log(f2.toString());
}


//用async改写
var asyncReadFile = async function () {
	var f1 = await readFile('/etc/fstab');
	var f2 = await readFile('/etc/shells');
	console.log(f1.toString());
	console.log(f2.toString());
}
//async是将Generator的*换成async,yield换成await,

//async函数对Generator函数的四点改进：
//1.内置执行器
//async自带执行器，Generator的执行必须靠执行器，所以依赖co模块
//async函数的执行，与普通函数一样，只要一行
var result = asyncReadFile();

//2. 更好的语义
// async和await,比*，yield有语义，

//3. 更广的适用性
//co模块约定，yield命令后只能是Thunk函数或Promise对象，
//而async后面可以是Promise对象，和原始类型的值(数字，布尔值，字符串)，但等同于同步操作

//4. 返回值是Promise
//async返回值是Promise对象，Generator返回值是Iterator对象
//async完全可以看做是多个异步操作，包装成的一个Promise对象，
//而await就是内部then命令的语法糖


//2.用法
// async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
// 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

//eg
async function getStockPriceByName(name) {
	var symbol = await getStockSymbol(name);
	var stockPrice = await getStockPrice(symbol);
	return stockPrice;
}
getStockPriceByName('goog').then(function (result) {
	console.log(result);
});

//eg:指定多少毫秒后输出一个值
function timeout(ms) {
	return new Promise((resolve)=> {
		setTimeout(resolve, ms);
	});
};

async function asyncPrint(value, ms) {
	await timeout(ms);
	console.log(value);
}

asyncPrint('Hello World', 50);

//async返回的是Promise对象，可以作为await的参数，上面的可改写为：
async function timeout(ms) {
	await new Promise((resolve)=>{
		setTimeout(resolve, ms);
	});
};

async function asyncPrint(value, ms) {
	await timeout(ms);
	console.log(value);
}
asyncPrint('Hello World', 50);

//async函数有多种使用形式

//函数声明
async function foo() {
	
}

//函数表达式
const foo = async function () {
	
};

//对象的方法
let obj = {
	async foo(){}
};
obj.foo().then({});

//Class的方法
class Storage{
	constructor(){
		this.cachePromise = caches.open('avatars');
	}

	async getAvatar(name){
		const cache = await this.cachePromise;
		return cache.match(`/avatars/${name}.jpg`);
	}
}

const storage = new Storage();
storage.getAvatar('jake').then()

//箭头函数
const foo = async() => {};


//3. 语法

//async函数返回一个Promise对象
//async内部return返回的值，会成为then方法回调的参数

async function f() {
	return 'hello world';
}

f().then(v => console.log(v));

//async内部抛出错误，Promise会变为reject对象

async function f() {
	throw new Error('出错了');
}
f().then(
	v => console.log(v),
	e => console.log(e)
);

//Promise内部状态的变化：只有async内部所有的异步操作执行完，才会执行then的回调函数

//eg:
async function getTitle(url) {
	let response = await fetch(url);
	let html = await response.text();
	return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
//函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log。

//只要await后面的Promise对象变为reject，那么整个async会中断执行

async function f() {
	await Promise.reject('出错了');
	await Promise.resolve('hello world');//不会执行
}

//解决这种问题，用try...catch

async function f() {
	try {
		await Promise.reject('出错了');
	}catch (e){

	}
	return await Promise.resolve('hello world');
}
f().then(v => console.log(v));

//另一种方法：await后面的Promise再跟一个catch，处理前面可能出现的错误
async function f() {
	await Promise.reject('出错了')
		.catch(e => console.log(e));
	return await Promise.resolve('hello world');
}
f().then(v => console.log(e))

//如果有多个await，可以统一放到try...catch中
async function main() {
	try {
		var val1 = await firstStep();
		var val2 = await secondStep(val1);
		var val3 = await thirdStep(val1, val2);
		console.log('Final: ', val3);
	}catch(e){
		console.log(e);
	}
}

//使用try...catch多次尝试
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
	let i ;
	for(i=0;i<NUM_RETRIES;++i){
		try{
			await superagent.get('http://google.com/this-throws-an-error');
			break;
		}catch(e){

		}
	}
	console.log(i);
}
test();

//使用注意点
//1. 最好把await放在try...catch中
async function myFunction() {
	try {
		await somethingThatReturnsAPromise();
	} catch (err) {
		console.log(err);
	}
}

// 另一种写法

async function myFunction() {
	await somethingThatReturnsAPromise()
		.catch(function (err) {
			console.log(err);
		}
}

//2. 多个await后的异步操作，如果不存在继发关系，最好让它们同时触发
let foo = await getFoo();
let bar = await getBar();

//让foo和bar同时触发
//写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

//写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;

//上面两种写法，getFoo,getBar同时触发，会缩短程序执行时间

//3. await只能在async中，在普通函数中会报错。
async function dbFuc(db) {
	let docs = [{}, {}, {}];

	// 报错
	docs.forEach(function (doc) {
		await db.post(doc);
	});
}
//forEach方法的参数改成async函数，也有问题。
function dbFuc(db) { //这里不需要 async
	let docs = [{}, {}, {}];

	// 可能得到错误结果
	docs.forEach(async function (doc) {
		await db.post(doc);
	});
}

//上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。
// 正确的写法是采用for循环。

async function dbFuc(db) {
	let docs = [{}, {}, {}];

	for (let doc of docs) {
		await db.post(doc);
	}
}

//如果希望多个请求并发执行，可以使用Promise.all
async function dbFunc(db) {
	let docs = [{}, {}, {}];
	let promises = docs.map((doc) => db.post(db));

	let results = await Promise.all(promises);
	console.log(results);
}

//或使用下面方法
async function dbFunc(db) {
	let docs = [{}, {}, {}];
	let promises = docs.map((doc) => db.post(db));

	let results = [];
	for(let promise of promises){
		results.push(await promise);
	}
	console.log(results);
}


//4. async函数实现原理：
//将Generator与自动执行器，包装在一个函数里

async function fn(args) {
//	...
}

//等同于
function fn(args) {
	return spawn(function* () {
	//...
	});
}
//spawn就是自动执行器
//spawn函数的实现
function spawn(genF) {
	return new Promise(function (resolve, reject) {
		var gen = genF();
		function step(nextF) {
			try{
				var next = nextF();
			}catch (e){
				return reject(e);
			}
			if(next.done){
				return resolve(next.value);
			}

			Promise.resolve(next.value).then(function (v) {
				step(function () {
					return gen.next(v);
				}, function (e) {
					step(function () {
						return gen.throw(e);
					});
				});
			})
		}
		step(function () {
			return gen.next(undefined);
		});
	});
}


//5. 与其他异步处理方法的比较
//async与Promise，Generator的比较

//Promise 写法
function chainAnimationsPromise(elem, animations) {
//	变量ret用来保存上一个动画返回的值
	var ret = null;

//	新建一个空的Promise
	var p = Promise.resolve();

//	使用then方法，添加所有动画
	for(var anim of animations){
		p = p.then(function (val) {
			ret = val;
			return anim(elem);
		});
	}

//	返回一个部署了错误捕捉机制的Promise
	return p.catch(function (e) {
	//	忽略错误继续执行
	}).then(function () {
		return ret;
	});
}

//Promise写法比回调函数大大改进了，但代码全是Promise的API
//操作本身的语义看不出来

//Generator写法
function chainAnimationsGenerator(elem, animations) {
	return spawn(function* () {
		var ret = null;
		try{
			for(var anim of animations){
				ret = yield anim(elem);
			}
		}catch(e){
		//	忽略错误，继续执行
		}
		return ret;
	});
}

//Generator 语义更清晰，用户定义的操作全在spawn内
//问题在于，必须有一个任务运行器，自动执行 Generator 函数，
// 上面代码的spawn函数就是自动执行器，它返回一个 Promise 对象，
// 而且必须保证yield语句后面的表达式，必须返回一个 Promise。

//async 写法
async function chainAnimationsAsync(elem, animations) {
	var ret = null;
	try{
		for(var anim of animations){
			ret = await anim(elem);
		}
	}catch (e){
	//	忽略错误，继续执行
	}
	return ret;
}

//async 最简洁，最符合语义，几乎没有不相关的代码，
//将Generator写法中的自动执行器，改在语言层面提供，不暴露给用户


//6.实例： 按顺序完成异步操作

//Promise的写法

function logInOrder(urls){
//	远程读取所有url
	const textPromises = urls.map(url => {
		return fetch(url).then(response => response.text());
	});

//	按次序输出
	textPromises.reduce((chain, textPromises) => {
		return chain.then(() => textPromise)
			.then(text => console.log(text));
	}, Promise.resolve());
}
//reduce 方法依次处理每个Promise，然后用then将所有Promise对象联系来，可以依次输出结果。

//async函数实现
async function logInOrder(urls) {
	for(const url of urls){
		const response = await fetch(url);
		console.log(await response.text());
	}
}

//上述代码是继发，效率会很差，需要并发执行

async function logInOrder(urls) {
//	并发读取url
	const textPromises = urls.map(async url => {
		const response = await fetch(url);
		return response.text();
	});

//	按次序输出
	for(const textPromise of textPromises){
		console.log(await textPromise);
	}
}


//7. 异步遍历器



















