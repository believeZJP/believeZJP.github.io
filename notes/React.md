# 路由嵌套
```
<Route path="inbox" component={Inbox}>
        <Routepath="messages/:id" component={Message} />
</Route>
```
替换为
```
<Route path="inbox" component={Inbox}>
        {/* 使用 /messages/:id 替换 messages/:id */}
        <Route path="/messages/:id" component={Message} />
</Route>
```


# 待了解

react module.hot


# React优化加载总结 
[链接](https://mp.weixin.qq.com/s/KxJttCVuCoIrm9RAjRBrdg)

优化加载的点：

1. 在 HTML 内实现 Loading 态或者骨架屏；
2. 去掉外联 css；
3. 缓存基础框架；
4. 使用动态 polyfill；
5. 使用 SplitChunksPlugin 拆分公共代码；
6. 正确地使用 Webpack 4.0 的 Tree Shaking；
7. 使用动态 import，切分页面代码，减小首屏 JS 体积；
8. 编译到 ES2015+，提高代码运行效率，减小体积；
9. 使用 lazyload 和 placeholder 提升加载体验。




#react-redux

监听Store变更刷新视图的功能是由react-redux完成的：

- <Provider> 组件通过context属性向后代<connect>组件提供（provide）store对象；
- <connect> 是一个高阶组件，作用是将store与view层组件连接起来（这里重复提一句，redux官方将<connect>直接连接的组件定义为container component），<connect>向开发者开放了几个回调函数钩子（mapStateToProps, mapDispatchToProps...）用于自定义注入container component的props的姿势；
- react-redux监听redux store的变更，store改变后通知每一个connect组件刷新自己和后代组件，为了减少不必要的刷新提升性能，connect实现了shouldComponentUpdate方法，如果props不变的话，不刷新connect包裹的container component；

链接：https://juejin.im/post/59cb0d0b5188257e876a2d27


# react + redux 最佳实践
[链接](https://github.com/sorrycc/blog/issues/1)