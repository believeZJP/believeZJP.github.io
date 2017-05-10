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
Fibonacci2(100);
Fibonacci2(1000);
Fibonacci2(10000);

































