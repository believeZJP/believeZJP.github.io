/**
 * Created by zjp on 2017/3/21.
 */

var count1 = require('./src/counter');
var count2 = require('./src/counter');

console.log(count1.count());
console.log(count2.count());
console.log(count2.count());

/***
 * 运行方法，在文件目录下，运行node countMain.js
 * 输出：
 * 1
 * 2
 * 3
 * 可以看到，counter.js并没有因为被require了两次而初始化两次
 */

