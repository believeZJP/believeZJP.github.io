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
module.exports 和 exports这两个变量用来暴露出模块的一些属性和方法。

它们之间的关系是
```javascript
exports = module.exports = {}
```
exports只是module.exports的引用而已, 如果对exports重新赋值, 那么exports的引用指向就会改变，对exports的修改没法反应到module.exports上.可以理解为exports是module.exports的一个快捷方式。而最终模块的导出对象是以module.exports这个值为准的。像错误示例一样暴露出的仅仅是个空对象
```javascript
// 正确
exports.name = 'module'
exports.sex = 'man'

// 错误
exports = {
    name:'module',
    sex: 'man'
}

```

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

main.js

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

当模块的文件名是 index.js 时, 加载模块可以使用模块所在目录的  路径代替模块文件路径。
以下两句等价

```
var cat = require('/home/user/lib/cat')
var cat = require('/home/user/lib/cat/index')
```

这样处理更有整体感。

## package.json

 可以在 package.json 中配置模块的入口文件。
一般用来配置项目需要依赖的包。

## 命令行程序

NodeJS 编写的要么是包，要么是命令行程序。在部署代码时需要一些技巧，启动 node 项目像命令行程序一样。

例如用 NodeJS 写程序，可以把命令行参数原样打印出来。写好后，部署到 /home/user/bin/node-echo.js 这个位置。为了在  任何目录下都能运行该程序，需要使用  以下命令。

```
$ node /home/user/bin/node-echo.js Hello World

Hello World
```

这样执行太繁琐，下面才是正确的方式

```
$ node-echo Hello World
```

### 实现方式：

### Linux

在 Linux 中，可以把 js 文件当做 shell 脚本来运行。具体步骤如下：

1.  shell 脚本中，可以使用#!注释来指定当前脚本使用的解析器。所以在 node-echo.js 文件顶部增加以下注释,表明当前脚本使用 NodeJS 解析。

```
#! /user/bin/env node
```

2.  使用以下命令赋予 node-echo.js 执行权限

```
$ chmod +x /home/user/.bin/node-echo.js
```

3.  在 path 环境变量中指定某个目录，在/usr/local/bin 下创建一个软链文件，文件名与我们希望使用的终端命令同名，命令如下：

```
$ sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo
```

这样处理后，可以在任何目录下使用 node-echo 命令。

### Windows

假设 node-echo.js 在 C:\Users\user\bin 目录下，并且该目录已经添加到 path 环境  变量里.接下来需要在该目录下新建一个名为 node-echo.cmd 的文件，内容如下：

```
@node "C:\User\user\bin\node-echo.sj" %*
```

这样就可以在任何目录下使用 node-echo 命令了。

## 工程目录

## NPM

NPM 是随 NodeJS 一起安装的包管理工具。常见使用场景：

- 从 npm 服务器上下载别人编写的第三方包到本地
- 下载安装别写编写的命令行程序
- 将自己编写的包或命令行  程序上传到服务器供别人使用

### 下载三方包

在 npmjs.org 可以根据包名搜索。

安装：argv

```
npm install argv
```

安装好后，argv 包放在工程目录的 node_modules 目录中，在代码  中只需 require('argb')就可以引用，无需指定第三方包路径。

npm install 指令默认下载最新版本，需要指定版本，可以在包名后加上@<version>，例如:

```
npm install argv@0.0.1
```

一般将项目中依赖的包写在 package.json 中的 dependencies,在项目路径下执行 npm install 会批量安装第三方包。

用户只需关系自己需要的包，不需要  关心第三方包的依赖，npm 会自动查找依赖关系。

```
{
    "name": "node-echo",
    "main": "./lib/echo.js",
    "dependencies": {
        "argv": "0.0.2"
    }
}
```

## 安装命令行程序

## 发布代码

第一次发布需要注册账号， 终端下运行 npm adduser,按照提示做即可。 账号搞定后，编辑 package.json 文件，加入 npm 必须的字段。 如下

```
{
    "name": "node-echo",  # 包名，在npm服务器上唯一
    "version": "1.0.0",     # 当前版本号
    "dependencies": {       # 三方包依赖，指定包名版本号
        "argv": "0.0.2"
    },
    "main": "./lib/echo.js",     # 入口模块位置
    "bin": {
        "node-echo": "./bin/node-echo"  # 命令行程序名和主模块位置
    }
}
```

在 package.json 目录执行 npm publish 发布代码。

## 版本号

npm 包版本号分为 X.Y.Z 三位，分别代表主版本号，此版本号，补丁版本号。版本变更原则：

- 只修复 bug，更新 Z 位
- 新增功能，但向下兼容，更新 Y 位
- 有大变动，向下不兼容，更新 X 位

在申明三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围内的版本号。 例如"argv": "0.0.x"表示依赖于 0.0.x 系列的最新版 argv.

# 小结

- 编写代码前先规划好目录结构
- 大项目可以拆分成多个模块管理，也可以使用包来组织模块。
- 合理使用 node_modules 和 NODE_PATH 来解耦包的使用方式和物理路径
- 使用 npm 加入 NodeJS 生态圈互通有无
- 有好的包名请提前在 npm 上抢注
