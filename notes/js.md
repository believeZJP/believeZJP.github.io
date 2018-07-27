# 由 setInterval 执行有延时的任务有问题，改用setTimeout，setTimeout调用自身执行

非严格模式下
```javascript
function factorial(num){
    if(num<=1){
        return 1;
    }else {
        return num * arguments.callee(num-1);
    }
}

console.log(factorial(4)); //24
```

但在严格模式("use strict")下会报错

    Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

在严格模式下不能通过脚本访问arguments.callee,访问这个属性会报错，那么可以使用命名函数表达式来达到相同的结果。

**当一个函数必须调用自身的时候，避免使用arguments.callee(),通过要么给函数表达式一个名字，要么使用一个函数声明**
```javascript
"use strict";
var factorial = (function f(num){
     if(num<=1){
        return 1;
    }else {
        return num * f(num-1);
    }
})

console.log(factorial(4)); //24

```

以上代码创建了一个名为f()的命名函数表达式，然后将它赋值给变量factorial,即是把函数赋值给另外一个变量，函数的名字仍然有效。

再看一段代码:
```javascript
(function  foo(bar) {
  if (bar) {
    return;
  }
  foo(true);
})();
```
## 相关链接
- setTimeout与setInterval](https://segmentfault.com/a/1190000014542115)
- [JavaScript中匿名函数的递归调用](http://www.yw1515.com/news/2018-04-06/63856.html)

## 问题
如果自身函数是个延时执行的或耗时1s之类的方法。
如果直接设置settimeout，会跳过耗时的1s，使实际延时时间缩短，

so, 既然arguments.callee不能用了，怎么解决这种情况？？？