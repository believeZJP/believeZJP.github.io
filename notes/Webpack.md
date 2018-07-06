# watch 和 open 区别

```
//package.json
{
    //...
    "script":{
        //...
        "watch":"webpack --watch",
        "build":"webpack",
        "start":"webpack-dev-server --open",
    }
    //...
}
```

- watch 是观察者模式
  缺点是：修改之后需要手动刷新浏览器才能看到更改的代码
- webpack-dev-server 提供了一个简单的 web 服务器，并能够实时重新加载。
  浏览器可以自动加载页面，并在修改之后自动重新编译

# webpack-dev-server 和 webpack-dev-middleware 区别

webpack-dev-middleware,作用就是，生成一个与 webpack 的 compiler 绑定的中间件，然后在 express 启动的服务 app 中调用这个中间件。
这个中间件的作用呢，简单总结为以下三点：通过 watch mode，监听资源的变更，然后自动打包（如何实现，见下文详解);快速编译，走内存；返回中间件，支持 express 的 use 格式。特别注明：webpack 明明可以用 watch mode，可以实现一样的效果，但是为什么还需要这个中间件呢？
答案就是，第二点所提到的，采用了内存方式。如果，只依赖 webpack 的 watch mode 来监听文件变更，自动打包，每次变更，都将新文件打包到本地，就会很慢。

# eslint 限制

安装依赖

> npm install -g @commitlint/cli @commitlint/config-conventional

commitlint