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

# React 优化加载总结

[链接](https://mp.weixin.qq.com/s/KxJttCVuCoIrm9RAjRBrdg)

优化加载的点：

1.  在 HTML 内实现 Loading 态或者骨架屏；
2.  去掉外联 css；
3.  缓存基础框架；
4.  使用动态 polyfill；
5.  使用 SplitChunksPlugin 拆分公共代码；
6.  正确地使用 Webpack 4.0 的 Tree Shaking；
7.  使用动态 import，切分页面代码，减小首屏 JS 体积；
8.  编译到 ES2015+，提高代码运行效率，减小体积；
9.  使用 lazyload 和 placeholder 提升加载体验。

#react-redux

监听 Store 变更刷新视图的功能是由 react-redux 完成的：

- <Provider> 组件通过 context 属性向后代<connect>组件提供（provide）store 对象；
- <connect> 是一个高阶组件，作用是将 store 与 view 层组件连接起来（这里重复提一句，redux 官方将<connect>直接连接的组件定义为 container component），<connect>向开发者开放了几个回调函数钩子（mapStateToProps, mapDispatchToProps...）用于自定义注入 container component 的 props 的姿势；
- react-redux 监听 redux store 的变更，store 改变后通知每一个 connect 组件刷新自己和后代组件，为了减少不必要的刷新提升性能，connect 实现了 shouldComponentUpdate 方法，如果 props 不变的话，不刷新 connect 包裹的 container component；

链接：https://juejin.im/post/59cb0d0b5188257e876a2d27

# react + redux 最佳实践

[链接](https://github.com/sorrycc/blog/issues/1)

受控组件

类似于 input, select, textarea 这些元素的 value 值被 React.js 所控制，渲染的组件，被称为受控组件。

非受控组件

# 组件间的状态共享

- 状态提升

兄弟组件需要共享一些数据时，将这种组件之间共享的状态交给组件最近的公共父节点保管，然后通过 props 把状态传给子组件。

当某个状态被多个组件依赖或者影响时，把该状态提升到这些组件最近的公共父组件中去管理，通过 props 传递数据或函数来管理这种依赖或者影响。(同样的意思，完全不同的表达方式)

# 生命周期

一般把 state 的初始化放在 constructor 阶段；在 componentWillMount
进行组件的启动工作，如 http 请求，定时器的启动；componentWillUnmout 阶段做数据的清理，比如定时器的清理，http 请求取消，socket 的中断等。

componentWillMount 阶段组件还没有挂载完成，无法操作 DOM。
