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