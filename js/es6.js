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