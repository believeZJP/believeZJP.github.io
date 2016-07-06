define(function(require,exports,module){
	//运行到此：mod1.js和mod2.js都已加载完
	console.log("require module: main");
	var mod1 = require("mod1");
	mod1.hello();
	var mod2 = require("mod2");
	mod2.hello();

	return {
		hello: function(){
			console.log("hello main");
		}
	};
});