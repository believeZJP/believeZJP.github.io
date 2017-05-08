function fetch(url, {body='', method='GET', headers={}}){
	console.log(method);
}

// 调用
fetch('http://example.com/',{});
fetch('http://example.com/');//报错

function fetch(url, {body='', method='GET', headers={}} = {}){
	console.log(method);
}

//调用
fetch('http://example.com/');

//写法一
function m1({x=0, y=0} = {}){
	return [x, y];
}
function m2({x, y} = {x:0, y:0}){
	return [x, y];
}

// 函数 length属性 : 该函数预期传入的参数个数。某个参数指定默认值后，预期传入的参数中就不包括这个参数了。length参数中不包括rest参数

// 作用域

// rest 参数
// 利用rest参数，可以向该参数传入任意数目的参数
function add(...values){
	let sum = 0;
	for(var val of values){
		sum += val;
	}
	return sum;
}
add(2, 3, 5);

//eg:
//arguments的写法
function sortNumbers() {
	return Array.prototype.slice.call(arguments).sort();
}

//rest 参数写法
function sortNumbers(...numbers) {
	return numbers.sort();
}
//rest 箭头函数写法
const sortNumbers = (...numbers) => numbers.sort();
//改写push
function push(array, ...items){
	items.forEach(function(item){
		array.push(item);
		console.log(item);

	});
	console.log(array);
}


//扩展运算符（...） ,将一个数组转为用逗号分隔的参数序列,注意是参数序列！！！
console.log(...[1,2,3]);
console.log(document.querySelectorAll('div'));
//主要用于函数调用

function push(array, ...items) {
	array.push(...items);
}

function add(x, y) {
	return x + y;
}
var numbers = [4,32];
add(...numbers);

//替代数组的apply方法
//es5写法
function f(x, y, z){
	//...
}
var args = [0,1,2];
f.apply(null, args);

//es6写法
function f(x, y, z) {
	//...
}
var args = [0, 1, 2];
f(...args);

//实际例子 Math.max
//es5写法
Math.max.apply(null, [14,3,32])

//es6写法
Math.max(...[12,3,22]);
//等同于
Math.max(12,3,45);

//另一个例子 push(push的参数不能是数组)
//es5
var arr1 = [2,34,5];
var arr2 = [3,4,5,6];
Array.prototype.push.apply(arr1, arr2);
//es6写法
arr1.push(...arr2);




//应用
//1.合并数组

//es5
var more = [7,9];
[1,3].concat(more);
[1,4,...,more];
var arr1 = [2,34,4];
var arr2 = [4,5,6];
var arr3 = [4,5,6];

//es5合并数组
arr1.concat(arr2, arr3);

//es6合并数组
[...arr1,...arr2,...arr3];

//2.与解构赋值结合
var list = [1,2,3,4,5];
// es5
a = list[0], rest = list.slice(1);
// es6
[a,...rest] = list;

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];//报错


// 3. 函数的返回值

// 4. 字符串 将字符串转为真正的数组
[...'hello'];//["h", "e", "l", "l", "o"]
// 这里有个好处，可以识别32位的Unicode字符
'x\uD83D\uDE80y'.length // 4  JavaScript 会将32位Unicode识别为2个字符，采用扩展运算符就没有这个问题
[...'x\uD83D\uDE80y'].length // 3

// 正确返回字符串长度的函数
function length(str) {
	return [...str].length;
}

// 凡是涉及操作32位字符的函数，最好都用扩展运算符改写
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('');
// 'y\uDE80\uD83Dx'

	[...str].reverse().join('');
// 'y\uD83D\uDE80x'

// （5）实现了Iterator接口的对象

//（6）Map和Set结构，Generator函数
//	扩展运算符内部调用的是数据结构的Iterator接口!!!!!!!!!!!，只要有Iterator接口的对象，都可以使用扩展运算符
let map = new Map([//Map结构
	[1,'one'],
	[2,'two'],
	[3,'three']
]);
let arr = [...map.keys()];

var go = function *() {
	yield 1;
	yield 2;
	yield 3;
};
[...go()];








// 4. 严格模式
// 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
// 函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。
// 这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。

// 两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。
'use strict';

function doSomething(a, b = a) {
	// code
}

// 第二种是把函数包在一个无参数的立即执行函数里面。

const doSomething = (function () {
	'use strict';
	return function(value = 42) {
		return value;
	};
}());














