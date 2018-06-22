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

## 模块路径解析规则

require 支持 / 或 盘符开头的绝对路径, 也支持 ./开头的相对路径。

缺点：这两种路径在模块间建立了强耦合关系.

require 支持第三种路径模式, 类似于 foo/bar, 依次按照规则解析路径, 直到找到模块。

1.  内置模块

    require 收到的参数是 NodeJS 内置模块名称, 不做路径解析, 直接返回内部模块的导出对象, eg: require('fs')

2.  node_modules 目录

        NodeJS 定义了 node_modules 用于存放模块。

        eg:某个模块的绝对路径为 /home/user/hello.js, 在模块中使用 require('foo/bar')方式加载模块时, 依次解析以下路径

    ```
    /home/user/node_modules/foo/bar
    /home/node_modules/foo/bar
    /node_modules/foo/bar

    //理解：从当前目录查找node_modules, 没找到后一级级往上找
    ```

3.  NODE_PATH 环境变量

    与 path 环境变量不同, NodeJS 可以通过 NODE_PATH 环境变量指定模块的搜索路径。可以配置多个, Linux 用 : 分隔, Windows 用 ; 分隔

    ```
    NODE_PATH=/home/user/lib:/home/lib
    ```

# 包(package)

    js模块的基本单位是单个的js文件, 但复杂的模块可以由多个子模块组成。多个子模块组成的大模块叫做包, 并把所有的子模块放在同一个目录里。

    一个包的所有子模块中, 需要有个入口模块, 入口模块的导出包要导出的对象.

    在入口模块中可以这样写：

```
// 从其他js中导入
var head = require('./head')
var body = require('/body')

exportscreate = function(name){
    return {
        name: name,
        head: head.create(),
        body: body.create()
    }
}
```

在其他模块使用包时, 需要加载包的入口模块.
