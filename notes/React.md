[源码解析](https://juejin.im/post/5983dfbcf265da3e2f7f32de)

[TOC]

# React三项核心技术
- 响应式UI
- 虚拟DOM
- 组件


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

# redux 
 redux是状态管理工具 

 一个应用中需要管理的数据分为3种：
 1. 获取并存储数据--store(唯一数据源)
 2. 将数据分配给UI--（react-redux, context）
 3. 改变数据 -- (reducers)

### redux强制开发者遵循的几个原则--原则带来强大的功能--约束的力量
1. 数据都要以文本形式描述(数据结构，数据类型)
2. 每个动作(改变数据的操作)必须在改变的数据之前将其写出来，没有动作产生无法改变数据. 派发(dispatching)动作
3. 改变数据的代码必须像数学公式一样运行。相同输入，返回相同结果


### 原则带来的特性
- 撤销、重做
    撤销和重做需要记录并回访应用中发生的每次数据变化。
    
    示例：
    - Google Docs 使用网络发送当前用户正在做的事，接收到另一个用户的操作，重放另一个用户的操作，与本地正在发生的动作合并。
    - Optimistic UI
    提升用户体验的方式，使得在慢网速上的应用也能快速响应用户操作。
    例如Twitter应用中，点赞需要请求服务器来做一些检查，例如推文是否存在。Optimistic UI不是传统的转圈等几秒，然后显示结果。它事先嘉定所有请求都是成功的，当用户点赞时直接+1.这种方式有效的原因在于大多数时候请求是正常的。请求失败应用只需回滚至前一个UI状态即可。并使用服务器响应的实际结果，例如显示错误信息等。
    - 状态持久化和初始状态加载
    将应用中发生的一切记录并保存下来变得非常简单。
    - 真正可扩展系统
    - 时间调试旅行
    redux开发者工具可以使开发者通过拖拽滑动条来操纵应用的进度。
    - 自动反馈bug
    redux可以将用户本地的状态保存起来发送给开发人员，便于重现bug.Redux Bug Reporter 就是这样玩的。

### 缺点
- 陡峭的学习曲线
- '样板'代码
    redux要编写多个文件才能让一个小功能run起来。
- 性能损耗
    每次数据变化会增加一点性能开销，,当store中有大量数据且数据变化频率非常高时(如频繁变化，毫秒级倒计时)，UI可能变的卡顿   
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

高阶组件就是为了组件之间的代码复用。组件可能有着相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。**高阶组件内部的包装组件和被包装组件之间通过 props 传递数据**
