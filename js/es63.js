/**
 * Created by zjp on 2017/6/18.
 */

/***
 *Class 的基本用法
 *
 */

/*
1. 简介
 */

//生成实例的传统方法
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' +this.x + ',' + this.y + ')';
};
var p = new Point(1,2);

//ES6引入class(类)，可以定义类

//用class改写
//定义类
class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' +this.x + ',' + this.y + ')';
  }
}

//constructor 是构造方法
//this代表实例对象
// 定义“类”的方法的时候，前面不需要加上function这个关键字，
// 直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

//类也是构造函数的另一种写法
class Point{
  // ...
}

typeof Point //function
Point === Point.prototype.constructor;
// 类的数据类型就是函数，类本身就指向构造函数。


class B{}
let b = new B();
b.constructor === B.prototype.constructor;
//实例的constructor就是类原型的constructor

//Object.assign可以向类添加多个方法
class Point{
  constructor(){

  }
}
Object.assign(Point.prototype,{
  toString(){},
  tuValue(){}
});


Point.prototype.constructor == Point

//2.class默认就是严格模式，无需使用use strict

//3. constructor 方法
//constructor是类的默认方法，通过new 命令生成实例对象时，自动调用该方法
//一个class，必须有constructor，如果没有显式定义，会被默认添加

class Point{}
//等同于
class Point{
  constructor(){}
}

//class必须使用new调用，普通函数不用new也可以用

class Foo{
  constructor(){
    return Object.create(null);
  }
}
Foo();//报错！！！

//实例的属性除非显示定义在其本身(即this对象)，否则都定义在原型(class)上，

//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true



















