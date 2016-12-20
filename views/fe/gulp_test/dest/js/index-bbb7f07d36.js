window.onload = function(){
	for (var i=0,il=20; i<il; i++) {
		var dom =  document.createElement('div');
		dom.classList = 'log';
		dom.innerHTML = '这是js生成的文字' + i; 
		
		document.body.appendChild(dom);
		
	}
}
