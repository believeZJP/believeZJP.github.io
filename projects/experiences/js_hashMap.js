/**
 * 原文连接：
 * https://segmentfault.com/a/1190000004273576
 * 我的困惑：
 * 	value值重复的话是会出问题的，原生的Object是怎么实现的也是数组？，不可能吧。
 */


//trim 借鉴jQuery
var whitespace = "[\\x20\\t\\r\\n\\f]",
    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");
//直接在string的原型上扩展
String.prototype.trim = String.prototype.trim || function(){
	return this.treplace(rtrim,"");
}
//HashTable实现
function HashTable(){
	var self = this,
		hash = {},
		count = 0,
		keys = [],
		values = [];
	self.checkKey = function(key){
		if((typeof key === "string" && key.trim != "") || typeof key ==="number" || typeof key ==="boolean"){
			return key;
		}else{
			//这里可以实现复杂类型，如Object，但实际情况并不多，
			//如果实现，可能会影响这种利用object特性快速 取值的性能，
			//故key必须是基本类型。
			throw new Error("key 必须是一个基本存在值的基本类型，并且值不可为空");
		}
	};
	self.add = function(key,value){
		key = this.checkKey(key);
		hash[key] = value;//保证key唯一，重复key,value会被覆盖
		count++;
		if(keys.indexOf(key) == -1){
			keys.push(key);
		}
		if(values.indexOf(value) == -1){
			values.push(value);
		}
		return self;
	};
	self.remove = function(){
		key = this.checkKey(key);
		if(hash.hasOwnProperty(key)){
			var value = hash[key];
			delete hash[key];
			count--;
			if(count < 0){
				count = 0;
			}
			var kIndex = keys.indexOf(key),
				 vIndex = values.indexOf(value);
			if(kIndex != -1){
				keys.splice(kIndex,1);
			}
			if(vIndex != -1){
				values.splice(vIndex,1);
			}
		}
		return self;
	};
	self.clear = function(){
		for(var i = 0; i<keys.length;i++){
			if(hash.hasOwnProperty(key[i])){
				delete hash[keys[i]];
			}
		}
		keys.splice(0,keys.length);
		values.splice(0,values.length);
		return self;
	};
	self.cout = function(){
		return count;
	};
	self.contains = function(key){
		return keys.indexOf(key) !== -1;
	};
	self.containsKey = function(key){
		return keys.indexOf(key) !== -1;
	};
	self.containsValue = function(value){
		return values.indexOf(value) !== -1;
	};
	self.getKeys = function(){
		return keys.concat([]);
	};
	self.getValues = function(){
		return values.concat([]);
	};
	//根据key获取值
	self.getValue = function(key){
		if(has.hasOwnProperty(key)){
			return hash[key];
		}
	};
	//提供快捷便利函数
	self.each = function(fun){
		if(typeof fun === "function"){
			for(var i=0;i<keys.length;i++){
				var key = keys[i],
					value = hash[key];
				var stop = fun.call({
					key :key,
					value : value
				},key,value);
				if(stop === false) break;
			}
		}
	};
	self.toList = function(){
		var results = [];
		for(var i=0;i<keys.length;i++){
			var key = keys[i],
				value = values[i];
			results.push({
				key:key,
				value: value
			});
		}
		return results;
	};
};
