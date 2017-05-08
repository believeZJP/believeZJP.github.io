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