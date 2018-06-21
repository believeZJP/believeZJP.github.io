# module 模块

在 NodeJS 中, 把代码合理拆分到  不同的 js 文件中, 每一个文件就是一个模块, 而文件路径就是模块名。

在每个模块中, 有 require, exports, module 三个预定义变量可供使用。

## require

用来在当前模块中加载和使用别的模块, 传入一个模块名, 返回模块的导出对象

- 模块名可以使用相对路径(以./开头),或绝对路径(以/开头)
- 模块名的.js 扩展名可以省略

```
var foo1 = require('./foo')
var foo2 = require('./foo.js')
var foo3 = require('/home/user/foo')
var foo4 = require('/home/user/foo.js')

// 以上导入的是同一个模块
```

- 也可以加载 JSON 文件

```
var data = require('./data.json')
```

## exports

用于导出模块公有方法和属性。

```
exports.hello = function(){
    console.log('Hello World!')
}
```

## module

通过 module 对象可以访问到当前  模块的一些相关信息, 最多的用途是替换当前模块的导出对象,例如：模块的导出对象默认是一个普通对象, 如果想改成一个函数的话, 可以使用以下方式.

```
module.exports = function(){
    console.log('Hello World!')
}
```

以上代码中,  模块默认导出对象被替换为一个函数

# ==** 了解 module.exports 和 exports 的区别 **==

## 模块初始化

一个模块中的 js 代码仅在模块第一次被使用时执行一次, 并在执行过程中初始化模块的导出对象. 之后, 缓存起来的导出对象被重复利用。

- demo 中 运行 node main1.js 可以看到具体效果。虽然 counter 被引用两次，但它只初始化一次。

## 主模块

通过命令行参数传递给 NodeJS 以启动程序的模块称为主模块. 主要负责调度组成整个程序的其他模块完成工作。

- demo 中的 main1.js 即为主模块

## 二进制模块

虽然一般使用 JS 编写模块，NodeJS 也支持 C/C++编写二进制模块。文件扩展名是.node。

# 小结

- 终端下直接输入 node 可以进入命令行交互模式, 适合测试 js 代码片段. 退出按两次 ctrl+c;
- NodeJS 使用 CMD 模块系统, 主模块作为程序入口点, 所有模块在执行过程中只初始化一次。
- NodeJS 也支持二进制模块

# 代码的组织和部署

[链接](http://nqdeng.github.io/7-days-nodejs/#1.1)
