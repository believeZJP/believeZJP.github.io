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


















