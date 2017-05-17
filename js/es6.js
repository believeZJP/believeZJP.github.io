function fetch(url, {body='', method='GET', headers={}}){
	console.log(method);
}

// ����
fetch('http://example.com/',{});
fetch('http://example.com/');//����

function fetch(url, {body='', method='GET', headers={}} = {}){
	console.log(method);
}

//����
fetch('http://example.com/');

//д��һ
function m1({x=0, y=0} = {}){
	return [x, y];
}
function m2({x, y} = {x:0, y:0}){
	return [x, y];
}

// ���� length���� : �ú���Ԥ�ڴ���Ĳ������ĳ������ָ��Ĭ��ֵ��Ԥ�ڴ���Ĳ����оͲ�������������ˡ�length�����в�����rest����

// ������

// rest ����
// ����rest���������ò�����������Ŀ�Ĳ���
function add(...values){
	let sum = 0;
	for(var val of values){
		sum += val;
	}
	return sum;
}
add(2, 3, 5);

//eg:
//arguments��д��
function sortNumbers() {
	return Array.prototype.slice.call(arguments).sort();
}

//rest ����д��
function sortNumbers(...numbers) {
	return numbers.sort();
}
//rest ��ͷ����д��
const sortNumbers = (...numbers) => numbers.sort();
//��дpush
function push(array, ...items){
	items.forEach(function(item){
		array.push(item);
		console.log(item);

	});
	console.log(array);
}


//��չ�����...�� ,��һ������תΪ�ö��ŷָ��Ĳ�������,ע���ǲ������У�����
console.log(...[1,2,3]);
console.log(document.querySelectorAll('div'));
//��Ҫ���ں������

function push(array, ...items) {
	array.push(...items);
}

function add(x, y) {
	return x + y;
}
var numbers = [4,32];
add(...numbers);

//��������apply����
//es5д��
function f(x, y, z){
	//...
}
var args = [0,1,2];
f.apply(null, args);

//es6д��
function f(x, y, z) {
	//...
}
var args = [0, 1, 2];
f(...args);

//ʵ������ Math.max
//es5д��
Math.max.apply(null, [14,3,32])

//es6д��
Math.max(...[12,3,22]);
//��ͬ��
Math.max(12,3,45);

//��һ������ push(push�Ĳ�����������)
//es5
var arr1 = [2,34,5];
var arr2 = [3,4,5,6];
Array.prototype.push.apply(arr1, arr2);
//es6д��
arr1.push(...arr2);




//Ӧ��
//1.�ϲ�����

//es5
var more = [7,9];
[1,3].concat(more);
[1,4,...,more];
var arr1 = [2,34,4];
var arr2 = [4,5,6];
var arr3 = [4,5,6];

//es5�ϲ�����
arr1.concat(arr2, arr3);

//es6�ϲ�����
[...arr1,...arr2,...arr3];

//2.��⹹��ֵ���
var list = [1,2,3,4,5];
// es5
a = list[0], rest = list.slice(1);
// es6
[a,...rest] = list;

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

// �����չ������������鸳ֵ��ֻ�ܷ��ڲ�������һλ������ᱨ�?
const [...butLast, last] = [1, 2, 3, 4, 5];//����


// 3. ����ķ���ֵ

// 4. �ַ� ���ַ�תΪ���������
[...'hello'];//["h", "e", "l", "l", "o"]
// �����и��ô�������ʶ��32λ��Unicode�ַ�
'x\uD83D\uDE80y'.length // 4  JavaScript �Ὣ32λUnicodeʶ��Ϊ2���ַ������չ������û���������
[...'x\uD83D\uDE80y'].length // 3

// ��ȷ�����ַ��ȵĺ���
function length(str) {
	return [...str].length;
}

// �����漰����32λ�ַ�ĺ�����ö�����չ������д
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('');
// 'y\uDE80\uD83Dx'

	[...str].reverse().join('');
// 'y\uD83D\uDE80x'

// ��5��ʵ����Iterator�ӿڵĶ���

//��6��Map��Set�ṹ��Generator����
//	��չ������ڲ����õ�����ݽṹ��Iterator�ӿ�!!!!!!!!!!!��ֻҪ��Iterator�ӿڵĶ��󣬶�����ʹ����չ�����
let map = new Map([//Map�ṹ
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








// 4. �ϸ�ģʽ
// �涨ֻҪ�������ʹ����Ĭ��ֵ���⹹��ֵ��������չ�������ô�����ڲ��Ͳ�����ʽ�趨Ϊ�ϸ�ģʽ������ᱨ�?
// �����ڲ����ϸ�ģʽ��ͬʱ�����ں�����ͺ�������ǣ�����ִ�е�ʱ����ִ�к������Ȼ����ִ�к����塣
// �������һ��������ĵط���ֻ�дӺ�����֮�У�����֪�������Ƿ�Ӧ�����ϸ�ģʽִ�У����ǲ���ȴӦ�����ں�����ִ�С�

// ���ַ������Թ���������ơ���һ�����趨ȫ���Ե��ϸ�ģʽ�����ǺϷ��ġ�
'use strict';

function doSomething(a, b = a) {
	// code
}

// �ڶ����ǰѺ������һ���޲��������ִ�к������档

const doSomething = (function () {
	'use strict';
	return function(value = 42) {
		return value;
	};
}());














