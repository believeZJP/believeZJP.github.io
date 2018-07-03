[源码解析](https://juejin.im/post/5983dfbcf265da3e2f7f32de)

# 路由嵌套

```javascript
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

[链接](https://juejin.im/post/59cb0d0b5188257e876a2d27)

# react + redux 最佳实践

[链接](https://github.com/sorrycc/blog/issues/1)
[原理](https://www.cnblogs.com/hhhyaaon/p/5863408.html)
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

不依赖 DOM 操作的组件启动的操作都可以放在 componentWillMount 中进行

componentWillMount 阶段组件还没有挂载完成，无法操作 DOM。

React.js 提供了 ref 属性来帮助我们获取以经挂载元素的 DOM 节点，可以给某个 JSX 元素加上 ref 属性

```
<input ref={(input) => this.input = inpput} />

在componentDidMount阶段可以通过this获取到
componentDidMount(){
    this.input.focus()
}
```

原则： 能不用 ref 就不用 ref,特别是要避免用 ref 来做 React.js 本来就可以帮你做的页面自动更新的操作和事件监听。

多余的 DOM 操作是代码里的“噪音”，不利于我们理解和维护

# React.js 小知识点：

- 页面引用 html 并显示 html--dangerouslySetInnerHTML

```
render(){
        return (
                <div className='con' dangerouslySetInnerHTML={{__html: this.state.content}}/>
        )
}
```

- React.js 中的 style 属性用法和 DOM 里面的 style 不一样。需要把 css 属性变成一个对象再传给元素

需要将原来带-的属性去掉换成驼峰命名

```
<h1 style={{fontSize:'23px', color:'red'}}></h1>
```

- 统一规范
  组件私有方法都用\_开头, 所有事件监听的方法都用 handle 开头，事件监听的方法传给组件时属性名用 on 开头。eg：

```
<CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>>
```

这样会带来组件语义化的好处。监听(on) CommentInput 的 submit 事件，交给 this 去处理(handle)

- 组件内容的编写顺序

1.  static 开头的类属性，如 defaultProps、propTypes
2.  构造函数，constructor
3.  getter/setter
4.  组件生命周期
5.  \_开头的私有方法
6.  事件监听方法, handle\*
7.  render* 开头的方法，有时 render()方法里的内容会分到不同函数里实现，这些函数都已 render*开头。
8.  render()

# PropTypes 组件参数类型验证

JavaScript 的灵活性体现在弱类型，高阶函数等语言特性上。
而语言的弱类型让我们写代码很爽，但也很容易出 bug.
弱类型常常意味着不安全。

例如一些组件需要的参数是 object，实际传入的是字符串或数字，这时候组件内部的 comment.content，comment.name 等都会报错。如果项目大，排查特别费力。如果加了参数校验，编译时，浏览器就会看到错误信息。

这样用别人组件时，只要看 propTypes 就可以知道这个组件到底能接受什么参数，什么参数可选什么必传。让组件的开发和使用更规范。

- 安装和试用

```
npm install --save prop-types

// 实例
import PropTypes from 'prop-types'

class Comment extends Component{
	static propTypes = {
		comment: PropTypes.object
		// 必传校验
		comment: PropTypes.object.isRequired

	}
}
```

- 常用数据类型

```
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.node
PropTypes.element
```

[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)

# 高阶组件(装饰者模式)

[链接](https://juejin.im/post/595243d96fb9a06bbd6f5ccd)
高阶组件是一个函数，传给它一个组件，它返回一个新的组件。

通过组合的方式达到很高的灵活程度。

```
const newComponent = higherOrderComponent(OldComponent)
```
