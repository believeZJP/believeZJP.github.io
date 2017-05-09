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




