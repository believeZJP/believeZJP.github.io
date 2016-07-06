define(['mod1','mod2'],function(mod1,mod2){
	//运行到此：mod1.js和mod2.js都已加载完
	console.log("require module: main");
	
	mod1.hello();
	mod2.hello();

	return {
		hello: function(){
			console.log("hello main");
			alert(mod1.subdomain);
		}
	};
});