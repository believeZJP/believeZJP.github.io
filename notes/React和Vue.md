[TOC]

# 在 jsx 文件中为什么一定要引用 react

```
JSX 语法就是用React.createElement()来构建 React 元素的。
它接受三个参数，第一个参数可以是一个标签名。
如div、span，或者 React 组件。
第二个参数为传入的属性。
第三个以及之后的参数，皆作为组件的子组件。

React.createElement(
    type,
    [props],
    [...children]
)

React.cloneElement()

React.cloneElement()与React.createElement()相似，
不同的是它传入的第一个参数是一个 React
元素，而不是标签名或组件。
新添加的属性会并入原有的属性，
传入到返回的新元素中，而就的子元素奖杯替换。

React.cloneElement(
  element,
  [props],
  [...children]
)
```

# React 组件

React 中有三种构建组件的方式。React.createClass()、ES6 class 和无状态函数。

## React.createClass()

React.createClass()是三种方式中最早，兼容性最好的方法。在 0.14 版本前官方指定的组件写法。

```
var Greeting = React.createClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

## ES6 class

ES6 class 是目前官方推荐的使用方式，它使用了 ES6 标准语法来构建，但它的实现仍是调用 React.createClass()来实现了，ES6 class 的生命周期和自动绑定方式与 React.createClass()略有不同。

```
class Greeting extemds React.Component{
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
};
```

## 无状态函数

无状态函数是使用函数构建的无状态组件，无状态组件传入 props 和 context 两个参数，它没有 state，除了 render()，没有其它生命周期方法。

```
function Greeting (props) {
  return <h1>Hello, {props.name}</h1>;
}
```

React.createClass()和 ES6 class 构建的组件的数据结构是类，无状态组件数据结构是函数，它们在 React 被视为是一样的。

# 元素与组件的区别

组件是由元素构成的。元素数据结构是普通对象，而组件数据结构是类或纯函数。

```
function Greeting (props) {
  return <h1>Hello, {props.name}</h1>;
}
```

# componentWillReceiveProps 应用场景

如果子组件需要的数据是直接由父组件通过 props 传递过来就不需要在 componentwillreceiveprops 中 setState，但是如果子组件有自己的状态，同时这个状态依赖于父组件的数据，那么就需要子组件单独进行 setState 操作，否则无法完成子组件的更新。同时有一点，在 componentwillreceiveprops 中写 setState 不会再次触发子组件的 render。解释一下：父组件 setState 时会触发子组件的 render，此时如果在子组件的 componentwillreceiveprops 里 setState，给人的感觉是会再一次触发子组件的 render（加上前面的一次就是两次），实际情况是不会的

# vuex 和 redux 使用有什么不同

Vuex 其实是一个针对 Vue 特化的 Flux，主要是为了配合 Vue 本身的响应式机制。当然吸取了一些 Redux 的特点，比如单状态树和便于测试和热重载的 API，但是也选择性的放弃了一些在 Vue 的场景下并不契合的特性，比如强制的 immutability（在保证了每一次状态变化都能追踪的情况下强制的 immutability 带来的收益就很有限了）、为了同构而设计得较为繁琐的 API、必须依赖第三方库才能相对高效率地获得状态树的局部状态等等（相比之下 Vuex 直接用 Vue 本身的计算属性就可以）所以 Vue + Vuex 会更简洁，也不需要考虑性能问题，代价就是 Vuex 只能和 Vue 配合。Vue + Redux 也不是不可以，但是 Redux 作为一个泛用的实现和 Vue 的契合度肯定不如 Vuex。

# nextTick 的作用，原理，用 api 的场景

$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM

也许有人会问，我在 Vue 实例方法中修改了数据，然后再在 $nextTick 回调中获取该数据在相应 DOM 元素所绑定的内容（或属性）殊无必要，我为什么需要这样的 API 呢？

考虑这样一种场景，你有一个 jQuery 插件，希望在 DOM 元素中某些属性发生变化之后重新应用该插件，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法。

在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构的时候，这个操作都应该放进 Vue.nextTick()的回调函数中。

原因是，Vue 是异步执行 dom 更新的，一旦观察到数据变化，Vue 就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个 watcher 被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和 DOm 操作。而在下一个事件循环时，Vue 会清空队列，并进行必要的 DOM 更新。

当你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的 DOM 更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。

```
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // modify data
      this.message = 'changed'
      // DOM is not updated yet
      this.$nextTick(function () {
        // DOM is now updated
        // `this` is bound to the current instance
        this.doSomethingElse()
      })
    }
  }
})
```

在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构的时候，这个操作都应该放进 Vue.nextTick()的回调函数中

# vue 的 props，state, compute 区别

data: Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。

props: 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。

两个的区别就是 data 是响应式的？

计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

注意如果你为一个计算属性使用了箭头函数，则 this 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是不会被更新的。

# react native 和原生的怎么通信

# pure component

React15.3 中新加了一个 PureComponent 类， 也就是纯组件，取代其前身 PureRenderMixin , PureComponent 是优化 React 应用程序最重要的方法之一，易于实施，只要把继承类从 Component 换成 PureComponent 即可，

可以减少不必要的 render 操作的次数，从而提高性能，而且可以少写 shouldComponentUpdate 函数，节省了点代码。

# React Native 与 原生交互

[链接](https://www.jianshu.com/p/41dd77a83c13)

# vue.js 和 vue.runtime.js 区别

vue.js

完整版：同时包含编译器和运行时的版本。

runtime.js

运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。

# 高阶组件？？ 解决了什么问题？

[链接](https://segmentfault.com/a/1190000010371752)

适配器模式，

高阶函数的定义：接收函数作为输入，或者输出另一个函数的一类函数，被称作高阶函数。

对于高阶组件，它描述的便是接受 React 组件作为输入，输出一个新的 React 组件的组件。

高阶组件通过包裹（wrapped）被传入的 React 组件，经过一系列处理，最终返回一个相对增强（enhanced）的 React 组件，供其他组件调用。

高阶组件的主要功能是封装并抽离组件的通用逻辑，让此部分逻辑在组件间更好地被复用。

# setState 源码剖析，多次调用解密

setState 流程还是很复杂的，设计也很精巧，
避免了重复无谓的刷新组件。它的主要流程如下

1.  enqueueSetState 将 state 放入队列中，并调用 enqueueUpdate 处理要更新的 Component

2.  如果组件当前正处于 update 事务中，则先将 Component 存入 dirtyComponent 中。否则调用 batchedUpdates 处理。

3.  batchedUpdates 发起一次 transaction.perform()事务
    开始执行事务初始化，运行，结束三个阶段

        1 初始化：事务初始化阶段没有注册方法，故无方法要执行

        2 运行：执行setSate时传入的callback方法，一般不会传callback参数

        3 结束：更新isBatchingUpdates为false，并执行FLUSH_BATCHED_UPDATES这个wrapper中的close方法

    FLUSH_BATCHED_UPDATES 在 close 阶段，会循环遍历所有的 dirtyComponents，调用 updateComponent 刷新组件，并执行它的 pendingCallbacks, 也就是 setState 中设置的 callback。

会调用到 batchedUpdates 进行批处理更新，
React 以事务的方式处理组件 update，事务处理完后会调用 wrapper.close(),

# react diff

[链接](https://github.com/purplebamboo/blog/issues/3)

三大要点

- tree diff
  两棵树只会对同一层次的节点进行比较。
- component diff
  判断是否是同一类型组件
- element diff
  同一节点 插入，删除，移动属性

在 reactjs 中我们需要更新时都是调用的 setState

setState 主要调用了对应的 component 的 receiveComponent 来实现更新。所有的挂载，更新都应该交给对应的 component 来管理。

就像所有的 component 都实现了 mountComponent 来处理第一次渲染，所有的 componet 类都应该实现 receiveComponent 用来处理自己的更新。

会合并改动，生成最新的 state,props 然后拿以前的 render 返回的 element 跟现在最新调用 render 生成的 element 进行对比（\_shouldUpdateReactComponent），看看需不需要更新，如果要更新就继续调用对应的 component 类对应的 receiveComponent 就好啦，其实就是直接当甩手掌柜，事情直接丢给手下去办了。当然还有种情况是，两次生成的 element 差别太大，就不是一个类型的，那好办直接重新生成一份新的代码重新渲染一次就 o 了。

本质上还是递归调用 receiveComponent 的过程。

这里注意两个函数：

inst.shouldComponentUpdate 是实例方法，当我们不希望某次 setState 后更新，我们就可以重写这个方法，返回 false 就好了。

\_shouldUpdateReactComponent 是一个全局方法，这个是一种 reactjs 的优化机制。用来决定是直接全部替换，还是使用很细微的改动。当两次 render 出来的子节点 key 不同，直接全部重新渲染一遍，替换就好了。否则，我们就得来个递归的更新，保证最小化的更新机制，这样可以不会有太大的闪烁。

==简单回顾下 reactjs 的差异算法：==

首先是所有的 component 都实现了 receiveComponent 来负责自己的更新，而浏览器默认元素的更新最为复杂，也就是经常说的 diff algorithm。

react 有一个全局\_shouldUpdateReactComponent 用来根据 element 的 key 来判断是更新还是重新渲染，这是第一个差异判断。比如自定义元素里，就使用这个判断，通过这种标识判断，会变得特别高效。

每个类型的元素都要处理好自己的更新：

自定义元素的更新，主要是更新 render 出的节点，做甩手掌柜交给 render 出的节点的对应 component 去管理更新。

text 节点的更新很简单，直接更新文案。

浏览器基本元素的更新，分为两块：

先是更新属性，对比出前后属性的不同，局部更新。并且处理特殊属性，比如事件绑定。

然后是子节点的更新，子节点更新主要是找出差异对象，找差异对象的时候也会使用上面的\_shouldUpdateReactComponent 来判断，如果是可以直接更新的就会递归调用子节点的更新，这样也会递归查找差异对象，这里还会使用 lastIndex 这种做一种优化，使一些节点保留位置，之后根据差异对象操作 dom 元素（位置变动，删除，添加等）。
整个 reactjs 的差异算法就是这个样子。

最核心的两个\_shouldUpdateReactComponent 以及 diff,patch 算法。

//\_diff 用来递归找出差别,组装差异对象,添加到更新队列 diffQueue。

\_patch 主要就是挨个遍历差异队列，遍历两次，第一次删除掉所有需要变动的节点，然后第二次插入新的节点还有修改的节点。这里为什么可以直接挨个的插入呢？原因就是我们在 diff 阶段添加差异节点到差异队列时，本身就是有序的，也就是说对于新增节点（包括 move 和 insert 的）在队列里的顺序就是最终 dom 的顺序，所以我们才可以挨个的直接根据 index 去塞入节点。

[链接](https://zhuanlan.zhihu.com/p/20346379?refer=purerender)

```
总结

React 通过制定大胆的 diff 策略，将 O(n3)
复杂度的问题转换成 O(n) 复杂度的问题；

React 通过分层求异的策略，对 tree diff 进行算法优化；

React 通过相同类生成相似树形结构，
不同类生成不同树形结构的策略，
对 component diff 进行算法优化；


React 通过设置唯一 key的策略，
对 element diff 进行算法优化；

建议，在开发组件时，保持稳定的 DOM
结构会有助于性能的提升；

建议，在开发过程中，尽量减少类似将最后一个节点移
动到列表首部的操作，当节点数量过大或更新操作
过于频繁时，在一定程度上会影响 React 的渲染性能。


tree diff

React 对树的算法进行了简洁明了的优化，
即对树进行分层比较，两棵树只会对同一层次的
节点进行比较。

component diff

如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。

如果不是，则将该组件判断为 dirty component，
从而替换整个组件下的所有子节点。

对于同一类型的组件，有可能其 Virtual DOM
没有任何变化，如果能够确切的知道这点那可以
节省大量的 diff 运算时间，因此 React 允许用户通过
shouldComponentUpdate() 来判断该组件是否需要进行 diff。

element diff

当节点处于同一层级时，React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。

INSERT_MARKUP，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。

MOVE_EXISTING，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。

REMOVE_NODE，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

React 发现这类操作繁琐冗余，因为这些都是相同的节点，但由于位置发生变化，导致需要进行繁杂低效的删除、创建操作，其实只要对这些节点进行位置移动即可。

针对这一现象，React 提出优化策略：允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，虽然只是小小的改动，性能上却发生了翻天覆地的变化！
```

# 设计组件

组件尽量只做渲染，逻辑处理放到 reducer 中

# redux 中的 action

Action Creator 的唯一功能就是返回一个 Action 供 dispatch 进行调用。

在 Flux 的架构中，一个 Action 要符合 FSA(Flux Standard Action) 规范，需要满足如下条件：

是一个纯文本对象

只具备 type 、payload、error 和 meta 中的一个或者多个属性。

type 字段不可缺省，其它字段可缺省

若 Action 报错，error 字段不可缺省，切必须为 true

```
在 redux 全家桶中，可以利用 redux-actions 来创建符合 FSA 规范的Action：

import {creatAction} from 'redux-actions';

let addTodo = creatAction(ADD_TODO)
//same as
let addTodo = creatAction(ADD_TODO,data=>data)

Redux 本身不处理异步行为，需要依赖中间件。结合 redux-actions 使用，Redux 有两个推荐的异步中间件：

redux-thunk
redux-promise



用connect将组件绑定到redux
export const ButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Buttons);

容器组件实现 mapStateToProps()（用于将状态映射到数据）
和 mapDispatchToProps()（用于将状态映射到行为）



同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action。

操作发起时的 Action
操作成功时的 Action
操作失败时的 Action

操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染

用户触发第一个 Action，这个跟同步操作一样，没有问题；
如何才能在操作结束时，系统自动送出第二个 Action 呢？

Action 是由store.dispatch方法发送的。
而store.dispatch方法正常情况下，参数只能是对象，
不能是函数。

这时，就要使用中间件redux-thunk。


const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};

// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);

看这里，返回的是Promise，
```

==用 redux-thunk 中间件，改造 store.dispatch，使得后者可以接受函数作为参数。==

store.dispatch 方法可以接受 Promise 对象作为参数。这时，Action Creator 有两种写法。写法一，返回值是一个 Promise 对象。

Action 对象的 payload 属性是一个 Promise 对象。这需要从 redux-actions 模块引入 createAction 方法，

Redux 的单向数据流是同步操作，驱动 Redux 流程的是 action 对象，每一个 action 对象被派发到 Store 上之后，同步地被分配给所有的 reducer 函数，每个 reducer 都是纯函数，纯函数不产生任何副作用，自然是完成数据操作之后立刻同步返回，reducer 返回的结果又被同步地拿去更新 Store 上的状态数据，更新状态数据的操作会立刻被同步给监听 Store 状态改变的函数，从而引发作为视图的 React 组件更新过程。

这个过程从头到尾，Redux 马不停蹄地一路同步执行，根本没有执行异步操作的机会，那应该在哪里插入访问服务器的异步操作呢？

Redux 创立之初就意识到了这种问题，所以提供了 thunk 这种解决方法，但是 thunk 并没有作为 Redux 的一部分一起发布，而是存在一个独立的 redux-thunk 发布包中，

redux-thunk 只是 Redux 中异步操作的解决方法之一

在 Redux 架构下，一个 action 对象在通过 store.dispatch 派发，在调用 reducer 函数之前，会先经过一个中间件的环节，这就是产生异步操作的机会，实际上 redux-thunk 提供的就是一个 Redux 中间件，我们需要在创建 Store 时用上这个中间件。

# 异步 action 对象

## [非常好的讲解](http://geek.csdn.net/news/detail/202352)

当我们想要让 Redux 帮忙处理一个异步操作的时候，代码一样也要派发一个 action 对象，毕竟 Redux 单向数据流就是由 action 对象驱动的。但是这个引发异步操作的 action 对象比较特殊，我们叫它们“异步 action 对象”。

前面例子中的 action 构造函数返回的都是一个普通的对象，这个对象包含若干字段，其中必不可少的字段是 type，但是“异步 action 对象”不是一个普通 JavaScript 对象，而是一个函数。

如果没有 redux-thunk 中间件的存在，这样一个函数类型的 action 对象被派发出来会一路发送到各个 reducer 函数，reducer 函数从这些实际上是函数的 action 对象上是无法获得 type 字段的，所以也做不了什么实质的处理。

不过，有了 redux-thunk 中间件之后，这些 action 对象根本没有机会触及到 reducer 函数，在中间件一层就被 redux-thunk 截获。

redux-thunk 的工作是检查 action 对象是不是函数，如果不是函数就放行，完成普通 action 对象的生命周期，而如果发现 action 对象是函数，那就执行这个函数，并把 Store 的 dispatch 函数和 getState 函数作为参数传递到函数中去，处理过程到此为止，不会让这个异步 action 对象继续往前派发到 reducer 函数。

举一个并不涉及网络 API 访问的异步操作例子，在 Counter 组件中存在一个普通的同步增加计数的 action 构造函数 increment，代码如下：

```
const increment = () => ({
  type: ActionTypes.INCREMENT,
});
```

派发 increment 执行返回的 action 对象，Redux 会同步更新 Store 状态和视图，但是我们现在想要创造一个功能，能够发出一个“让 Counter 组件在 1 秒之后计数加一”的指令，这就需要定义一个新的异步 action 构造函数，代码如下：

```
const incrementAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
};
```

异步 action 构造函数 incrementAsync 返回的是一个新的函数，这样一个函数被 dispatch 函数派发之后，会被 redux-thunk 中间件执行，于是 setTimeout 函数就会发生作用，在 1 秒之后利用参数 dispatch 函数派发出同步 action 构造函数 increment 的结果。

这就是异步 action 的工作机理，这个例子虽然简单，但是可以看得出来，异步 action 最终还是要产生同步 action 派发才能对 Redux 系统产生影响。

redux-thunk 要做的工作也就不过如此，但因为引入了一次函数执行，而且这个函数还能够访问到 dispatch 和 getState，就给异步操作带来了可能。

action 对象函数中完全可以通过 fetch 发起一个对服务器的异步请求，当得到服务器结果之后，通过参数 dispatch，把成功或者失败的结果当做 action 对象再派发出去。这一次派发的是普通的 action 对象，就不会被 redux-thunk 截获，而是直接被派发到 reducer，最终驱动 Store 上状态的改变。

通常我们在组件的 componentDidMount 函数中做请求服务器的事情，因为当生命周期函数 componentDidMount 被调用的时候，表明装载过程已经完成，组件需要渲染的内容已经在 DOM 树上出现，对服务器的请求可能依赖于已经渲染的内容，在 componentDidMount 函数中发送对服务器请求是一个合适的时机。

fetch 函数执行会立刻返回，返回一个 Promise 类型的对象，所以后面会跟上一大串 then 和 catch 的语句。每个 Promise 成功的时候，对应的 then 中的回调函数会被调用；如果失败，对应 catch 中的回调函数也被调用。

# vue 声明组件

```
一、全局注册
// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染

用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？




// 创建根实例
new Vue({
  el: '#example'
})

二、局部注册
var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})
```

# 检测变化的注意事项

Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：

Vue.set(vm.someObject, 'b', 2)

this.$set(this.someObject,'b',2)

想向已有对象上添加一些属性，例如使用 Object.assign() 或 \_.extend() 方法来添加属性。但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })

```

```

# watch 深度监听

==deep： true==

一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

不应该使用箭头函数来定义 watcher 函数 (例如 searchQuery: newValue => this.updateAutocomplete(newValue))。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.updateAutocomplete 将是 undefined。

```
watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true
    },
    e: [
      function handle1 (val, oldVal) { /* ... */ },
      function handle2 (val, oldVal) { /* ... */ }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
}
```

# 异步更新队列

```
this.$nextTick(function () {
    console.log(this.$el.textContent) // => '更新完成'
  })
```

# 计算属性 computed

对于任何复杂逻辑，你都应当使用计算属性。

当 vm.message 发生改变时，所有依赖 vm.reversedMessage 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。

==方法和计算属性：== 两种方式的最终结果确实是完全相同的。

不同的是计算属性是基于它们的依赖进行缓存的。

计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage
计算属性会立即返回之前的计算结果，而不必再次执行函数。

```
computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
}

  console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'


// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

# 计算属性的 setter

```
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

# watch 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

```
watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
},
```

# getters 作用

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

this.$store.getters.doneTodosCount

# mapGetters 辅助函数

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

# 提交 mutation 的另一种方式是直接使用包含 type 属性的对象：

```
store.commit({
  type: 'increment',
  amount: 10
})

store.commit('increment', {
  amount: 10
})
可以在组件中使用 this.$store.commit('xxx') 提交 mutation，
或者使用 mapMutations 辅助函数将组件中的 methods
映射为 store.commit 调用（需要在根节点注入 store）。
```

# 分发 Action

Action 通过 store.dispatch 方法触发：

store.dispatch('increment')

# vue 组件类型, 怎么定义一个组件

# vue 切换路由

其他方式 不留痕迹

```
一、router.push(location, onComplete?, onAbort?)

<router-link :to="...">	router.push(...)


const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

二、 router.replace(location, onComplete?, onAbort?)
跟 router.push 很像，唯一的不同就是，它不会向 history
添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

三、router.go(n)
在 history 记录中向前或者后退多少步，
类似 window.history.go(n)。
```

# vue-router 传参方式

```
query 和params
 { path: '/news/:id', component: NewsDetail },
      <span>{{$route.params.id}}</span>


区别
1、用法
    query要用path来引入，params要用name来引入，
    接收参数都是类似的，
    分别是this.$route.query.name和this.$route.params.name。

    接收参数时，已经是$route而不是$router了哦！！

2、展示
　　query更加类似于我们ajax中get传参，params则类似于post，
　　说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

query:
params:
```

# 受控组件 非受控组件

# 没有任何嵌套关系的组件之间传值

```
(1) Event Emitter/Target/Dispatcher
// to subscribe
otherObject.addEventListener(‘click’, function() { alert(‘click!’); });
// to dispatch
this.dispatchEvent(‘click’);

(2) Publish / Subscribe
// to subscribe
globalBroadcaster.subscribe(‘click’, function() { alert(‘click!’); });
// to dispatch
globalBroadcaster.publish(‘click’);

(3) Signals
// to subscribe
otherObject.clicked.add(function() { alert(‘click’); });
// to dispatch
this.clicked.dispatch();
```

# this.setState()参数

```
这个函数接受两个参数，
第一个参数表示上一个状态值，
第二参数表示当前的 props，
第二个参数是 state 导致的页面变化完成后的回调，等价于componentDidUpdate。

this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));

setState的关键点:

setState不会立刻改变React组件中state的值；
setState通过引发一次组件的更新过程来引发重新绘制；
多次setState函数调用产生的效果会合并。

当setState被调用时，能驱动组件的更新过程，引发componentDidUpdate、render等一系列函数的调用。
```

# React 的生命周期

[链接](https://reactjs.org/docs/react-component.html)
[结构图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
主要分为三段，mount（挂载）、update（更新）、unmount（卸载）
UNSAFE 为将要被抛弃的方法

```
一、mount，即挂载阶段，
    组件建立前暴露以下几个钩子（hook）：
    constructor()
      1. 先调用super(props)。否则this.props会未定义
      2. 主要用途：初始化props和state

    <!-- 被取消
　　初始化getDefaultProps()和getInitialState()
  　　getDefaultProps: 执行过一次后，被创建的类会有缓存，映射的值会存在this.props,前提是这个prop不是父组件指定的
  这个方法在对象被创建之前执行，因此不能在方法内调用this.props ，另外，注意任何getDefaultProps()返回的对象在实例中共享，不是复制
    getInitialState : 控件加载之前执行，返回值会被用于state的初始化值
    -->

    getDerivedStateFromProps
      在以下三种情况会调用：
        1. 组件实例化
        2. 组件的props发生变化
        3. 父组件重新渲染
      this.setState不会触发，但this.forceUpdate会  

    UNSAFE_componentWillMount()    // 将要被插入
      在render方法执行前被调用。会被移除。官方建议把里面的内容放到constructor或componentDidMount。
      这是唯一的服务端渲染钩子。
      执行一次，在初始化render之前执行，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次

    render()    // 将return的内容插入到页面里

    componentDidMount()   // 插入完成后的动作
        在组件被装配后立即调用。
        DOM节点初始化应该放到这里。
        若你需要从远端加载数据，
        这是一个适合实现网络请求的地方。
        在这setState会触发render。但第二次render会发生在浏览器渲染之前，
        所以用户看不到第二次渲染。即使这样，也要谨慎使用，会造成性能问题。


二、update，即更新阶段，如果数据有任何变动就会来这一阶段，这个过程有5个钩子：

　　UNSAFE_componentWillReceiveProps(nextprops) // 接受需要更新的props

      官网已不建议使用,建议使用getDErivedStateFromProps
      1. 组件的props发生改变
      2. 父组件发生重新渲染
      初始化props不会调用，setState也不会调用，只有父组件引起的render才会调用
      <!--
  　　在装配了的组件接收到新属性前调用。
  　　若你需要更新状态响应属性改变（例如，重置它），
  　　你可能需对比this.props和nextProps
  　　并在该方法中使用this.setState()处理状态改变。

      注意即使属性未有任何改变，React可能也会调用该方法，
      因此若你想要处理改变，请确保比较当前和之后的值。
      这可能会发生在当父组件引起你的组件重渲。
      -->

    getDerivedStateFromProps
      每次render之前都会调用，不管是什么引起的render
      在初始化mount和setState阶段都会调用

　　shouldComponentUpdate(nextProps, nextState)  // 问要不要更新组件 true/false

      接收到新属性或状态时，在渲染前被调用。默认为true。
      不会在初始化渲染或当使用forceUpdate()时被调用。
      当他们状态改变时，返回false 并不能阻止子组件重渲。
      若shouldComponentUpdate()返回false，componentWillUpdate()将不会被调用。
      要提升性能，建议使用React.PureComponent，它在shouldComponentUpdate默认行为中使用了浅比较,也可以自己写比较方法。

　　UNSAFE_componentWillUpdate()  // 准备更新组件啦
      不建议在这里调用setState,建议在getDerivedStateFromProps里使用

　　render() // 更新

    getSnapshotBeforeUpdate
      渲染结果提交到DOM之前调用。可以返回一个参数，
      被componentDidUpdate(preProps, preState, snapshot)方法的第三个参数接收

　　componentDidUpdate()   // 更新完成
    该方法并不会在初始化渲染时调用。
    最好在这里操作DOM

三、unmount，即卸载过程，当一个组件要从页面移除时，会进入这个过程，其中有一个钩子：

　　componentWillUnmount()    // 要卸载啦
    可以在该方法里处理任何必要的清理工作，
    例如解绑定时器，取消网络请求，订阅等
    清理任何在componentDidMount环节创建的DOM元素。

四、error阶段
  componentDidCatch
    在组件catch到各种error后调用，并进行处理。
    不要在这里改变数据流，也不能处理本身抛出的错误。

一般我们只在这几个钩子里setState：

componentWillMount()

componentDidMount()

componentWillReceiveProps()
```

16.3.0 以后升级了~~~~
新增 getDeriveStateFromProps 和 getSnapshotBeforeUpdate() 生命周期

# Redux 原理

```
Redux 和 React 没有直接关系，
它瞄准的目标是应用状态管理。

核心概念是 Map/Reduce 中的 Reduce。
且 Reducer 的执行是同步，
产生的 State 是 Immutable 的。

改变 State 只能通过向 Reducer dispatch actions 来完成。

State 的不同字段，可以通过不同的 Reducers 来分别维护。
combineReducers 负责组合这些 Reducers，
前提是每个 Reducer 只能维护自己关心的字段。

Action 对象只能是 Javascript Plain Object，
但是通过在 store 上装载 middleware，
则可以任意定义 action 对象的形式，
反正会有特定的 middleware 负责
将此 action 对象变为 Javascript Plain Object。

可以以middleware 链条为集中点实现很多控制逻辑，
例如 Log，Undo, ErrorHandler 等。

Redux 仅仅专注于应用状态的维护，
reducer、dispatch/middleware 是两个常用扩展点、
Higher-order Store 则仅针对需要扩展全部 Store 功能时使用。

react-redux 是 Redux 针对 React/React-Native 的 Binding，
connect/selector 是扩展点，
负责将 store 中的状态添加到 React component 的 props 中。

Redux 借用了很多函数式编程的思想，
了解函数式编程会利于理解其实现原理，
虽然使用它不需要了解很多函数式编程的概念。
和 Flux 相比，Redux 的概念更精简、约定更严格、状态更确定、而是扩展却更灵活。

通过 https://github.com/xgrommx/awesome-redux 可以获得大量参考。


链接：https://www.jianshu.com/p/3334467e4b32


redux有三大准则

单一数据源
整个应用状态，都应该被存储在单一store的对象树中。

只读状态
唯一可以修改状态的方式，
就是发送（dispatch）一个动作（Action），
通俗来讲，就是说只有getter，没有setter。

使用纯函数去修改状态
纯函数保障了状态的稳定性，
不会因不同环境导致应用程序出现不同情况，
听说是redux真正的精髓，日后可以深入了解。
```

# 谈谈 MVVM 模式

```
Vue是以数据为驱动的，Vue自身将DOM和数据进行绑定，一旦创建绑定，DOM和数据将保持同步，每当数据发生变化，DOM会跟着变化。 ViewModel是Vue的核心，它是Vue的一个实例。Vue实例时作用域某个HTML元素上的这个HTML元素可以是body，也可以是某个id所指代的元素。

DOMListeners和DataBindings是实现双向绑定的关键。DOMListeners监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化；DataBindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。

MVVM是Model-View-ViewModel的缩写。mvvm是一种设计思想。Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。

在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。
```

# 2:mvvm 和 mvc 区别

```
mvc和mvvm其实区别并不大。都是一种设计思想。
主要就是mvc中Controller演变成mvvm中的viewModel。
mvvm主要解决了mvc中大量的DOM 操作使页面渲染性能降低，
加载速度变慢，影响用户体验。
和当 Model 频繁发生变化，开发者需要主动更新到View 。
```

# 让 CSS 只在当前组件中起作用?

```
将当前组件的<style>修改为<style scoped>
```

# Vue 中使用插件的步骤

```
采用ES6的import ... from ...语法或CommonJSd的require()方法引入插件
使用全局方法Vue.use( plugin )使用插件,可以传入一个选项对象Vue.use(MyPlugin, { someOption: true })
```

# 组件的使用和自己创建公用组件

```
第一步：在components目录新建你的组件文件（indexPage.vue），
    script一定要export default {}
第二步：在需要用的页面（组件）中导入：
    import indexPage from '@/components/indexPage.vue'
第三步：注入到vue的子组件的components属性上面,components:{indexPage}
第四步：在template视图view中使用，
问题有indexPage命名，使用的时候则index-page。
```

# vue 如何实现按需加载配合 webpack 设置?

```
webpack中提供了require.ensure()来实现按需加载。以前引入路由是通过import 这样的方式引入，改为const定义的方式进行引入。
不进行页面按需加载引入方式：import  home   from '../../common/home.vue'
进行页面按需加载的引入方式：const  home = r => require.ensure( [], () => r (require('../../common/home.vue')))
```

# <keep-alive></keep-alive>作用

```
<keep-alive></keep-alive> 包裹动态组件时，会缓存不活动的组件实例,主要用于保留组件状态或避免重新渲染。
```

# vue-route 模式

```
默认为hash，但是用hash模式的话，页面地址会加#

所以一般采用 history模式
```

# vue 阻止事件

```
　.stop 阻止事件冒泡
　.prevent 阻止默认事件
　.capture　阻止事件捕获
　.once 只触发一次
```

# router 传参数

```
routes: [
    {
        path: '/linkParams/:name',
        name:'linkParams',
        component: linkParams
    }
]


获取name

let name = this.$route.params.name



// 字符串,这里的字符串是路径path匹配噢，不是router配置里的name
this.$router.push('home')

// 对象
this.$router.push({ path: 'home' })

// 命名的路由 这里会变成 /user/123
this.$router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' }})


router.beforeEach((to, from, next)=>{
  //do something
  next();
});
router.afterEach((to, from, next) => {
    console.log(to.path);
});


每个钩子方法接收三个参数：

to: Route: 即将要进入的目标 路由对象

from: Route: 当前导航正要离开的路由

next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
```

SSR 实现原理

```
app.js 作为客户端与服务端的公用入口，导出 Vue 根实例，供客户端 entry 与服务端 entry 使用。客户端 entry 主要作用挂载到 DOM 上，服务端 entry 除了创建和返回实例，还进行路由匹配与数据预获取。
webpack 为客服端打包一个 Client Bundle ，为服务端打包一个 Server Bundle 。
服务器接收请求时，会根据 url，加载相应组件，获取和解析异步数据，创建一个读取 Server Bundle 的 BundleRenderer，然后生成 html 发送给客户端。
客户端混合，客户端收到从服务端传来的 DOM 与自己的生成的 DOM 进行对比，把不相同的 DOM 激活，使其可以能够响应后续变化，这个过程称为客户端激活 。为确保混合成功，客户端与服务器端需要共享同一套数据。在服务端，可以在渲染之前获取数据，填充到 stroe 里，这样，在客户端挂载到 DOM 之前，可以直接从 store 里取数据。首屏的动态数据通过 window.__INITIAL_STATE__ 发送到客户端。

Vue SSR 的实现，主要就是把 Vue 的组件输出成一个完整 HTML, vue-server-renderer 就是干这事的。
```

# Vue 实例初始化的过程中实现依赖管理的分析。

[链接](http://www.bslxx.com/a/vue/2018/0301/1795.html)

大致的总结下就是：

```
initState的过程中，
将props,computed,data等属性通过Object.defineProperty
来改造其getter/setter属性，
并为每一个响应式属性实例化一个observer观察者。
这个observer内部dep记录了这个响应式属性的所有依赖。

当响应式属性调用setter函数时，
通过dep.notify()方法去遍历所有的依赖，
调用watcher.update()去完成数据的动态响应。




vue.js 是采用数据劫持结合发布者-订阅者模式的方式，
通过Object.defineProperty()来劫持各个属性的setter，getter，
在数据变动时发布消息给订阅者，
触发相应的监听回调。

具体步骤：
第一步：需要observe的数据对象进行递归遍历，
包括子属性对象的属性，
都加上 setter和getter
这样的话，
给这个对象的某个值赋值，就会触发setter，
那么就能监听到了数据变化

第二步：compile解析模板指令，
将模板中的变量替换成数据，
然后初始化渲染页面视图，
并将每个指令对应的节点绑定更新函数，
添加监听数据的订阅者，一旦数据有变动，
收到通知，更新视图

第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，
主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个update()方法
3、待属性变动dep.notice()通知时，
能调用自身的update()方法，
并触发Compile中绑定的回调，则功成身退。

第四步：MVVM作为数据绑定的入口，
整合Observer、Compile和Watcher三者，
通过Observer来监听自己的model数据变化，
通过Compile来解析编译模板指令，
最终利用Watcher搭起Observer和Compile之间的通信桥梁，
达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。
```

# Vue 声明组件的 state 是用 data 方法，那为什么 data 是通过一个 function 来返回一个对象，而不是直接写一个对象呢？

```
答：从语法上说，如果不用function返回就会出现语法错误导致编译不通过。从原理上的话，大概就是组件可以被多次创建，如果不使用function就会使所有调用该组件的页面公用同一个数据域，这样就失去了组件的概念了
```

# vuex

```
 State、 Getter、Mutation 、Action、 Module
通过状态（数据源）集中管理驱动组件的变化
（好比spring的IOC容器对bean进行集中管理）。
应用级的状态集中放在store中；
改变状态的方式是提交mutations，
这是个同步的事物； 异步逻辑应该封装在action中。


一、Action 类似于 mutation，不同在于：
二、Action 提交的是 mutation，而不是直接变更状态。
三、Action 可以包含任意异步操作

一、getters 可以对State进行计算操作，它就是Store的计算属性
二、 虽然在组件内也可以做计算属性，但是getters 可以在多组件之间复用
三、 如果一个状态只在一个组件内使用，是可以不用getters

二、state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新
三、它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中
```

# 说下 vue 组件之间的通信？

```
答：
非父子组件间通信，Vue 有提供 Vuex，以状态共享方式来实现通信

prop 向下传递，事件向上传递。
还可以通过$emit方法出发一个消息，然后$on接收这个消息

兄弟组件间的数据通讯，它们将会 寻找其共同的父组件，使用数据和相关方法“提升”到父组件内部，并向下传给两个子组件。其中一个子组件取得数据，另一个子组件取得了改变数据的方法 。

var Event = new Vue()
//父组件
 Event.$on("a-msg", function (a) {
    this.a = a;
  }.bind(this));

// 子组件
 Event.$emit("a-msg", this.a);
```

# Vue 生命周期

# 简单描述每个周期具体适合哪些场景？

Create Mount Update Destroy

```
beforeCreate（创建前）,
created（创建后）,

beforeMount(载入前),
mounted（载入后）,

beforeUpdate（更新前）,
updated（更新后）,

beforeDestroy（销毁前）,
destroyed（销毁后）

每个钩子函数都在啥时间触发

beforeCreate
在实例初始化之后，
数据观测(data observer) 和 event/watcher 事件配置之前被调用。

created
实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。


beforeMount
在挂载开始之前被调用：相关的 render 函数首次被调用。

mounted
挂载元素，获取到DOM节点
el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
如果 root 实例挂载了一个文档内元素，
当 mounted 被调用时 vm.$el 也在文档内。

beforeUpdate
数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

updated
由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。

该钩子在服务器端渲染期间不被调用。

beforeDestroy
实例销毁之前调用。在这一步，实例仍然完全可用。

destroyed
Vue 实例销毁后调用。
调用后，Vue 实例指示的所有东西都会解绑定，
所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。


生命周期钩子的一些常见使用方法：

beforecreate : 可以在这加个loading事件，
在加载实例时触发

created : 初始化完成时需要执行的事件写在这里，
如在这结束loading事件，异步请求也适宜在这里调用

mounted: 在这发起后端请求，拿回数据，配合路由钩子做一些事情

updated : 如果对数据统一处理，在这里写上相应函数
beforeDestroy : 可以做一个确认停止事件的确认框 你确认删除XX吗？
nextTick : 更新数据后立即操作dom
activated::keep-alive组件激活时调用
```

# v-show 和 v-if 指令的共同点和不同点?

```
v-show指令是通过修改元素的displayCSS属性让其显示或者隐藏
v-if指令是直接销毁和重建DOM达到让元素显示和隐藏的效果

v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。
因此，如果需要频繁切换 v-show 较好，
如果在运行时条件不大可能改变 v-if 较好。

1.v-if 指令可以应用于template包装元素上，
而v-show不支持template
2.将v-show应用在组件上时，因为指令的优先级
v-else 会出现问题，
解决办法就是用另一个 v-show 替换 v-else

// 错误
<custom-component v-show="condition"></custom-component>
<p v-else>这可能也是一个组件</p>
     // 正确做法
<custom-component v-show="condition"></custom-component>
<p v-show="!condition">这可能也是一个组件</p>
```

# vue 父子组件嵌套时，组件内部的各个生命周期钩子触发先后顺序

```
顺序是 先创建父组件(父组件beforeMount)，然后才创建子组件，当子组件创建完成并且实体dom挂载完成后(子组件先mounted)父组件才挂载完成(父组件mounted)
```

# h 函数

```
它来自单词 hyperscript，
这个单词通常用在 virtual-dom 的实现中。
Hyperscript 本身是指

生成HTML 结构的 script 脚本，
因为 HTML 是 hyper-text markup language 的缩写（超文本标记语言）

个人理解：
createElement 函数是用来生成 HTML DOM
元素的，也就是上文中的 generate HTML
structures，也就是 Hyperscript，
这样作者才把 createElement 简写成 h。


大概的翻译下：
render: h => h(App) 是下面内容的缩写：

render: function (createElement) {
    return createElement(App);
}
进一步缩写为(ES6 语法)：

render (createElement) {
    return createElement(App);
}
再进一步缩写为：

render (h){
    return h(App);
}
按照 ES6 箭头函数的写法，就得到了：

render: h => h(App);
```

# react-redux 中 connect 函数

[链接](https://segmentfault.com/a/1190000010188279)

```
connect方法做的事情是
将state和dispatch绑定到Connect组件的参数上，
然后Connect组件将你当前的App组件封装起来，
使得App组件可以通过props获取到父
组件Connect传递的state和props。

Provider是顶层组件的作用，
将store作为上下文提供给全局共享，
而Connect组件是局部组件，将某个react组件包装起来，
传递指定的state和props给该组件访问。


connect()返回值是Connect组件（请注意大小写的区别）。
```

# Vue 和 React 区别

### 相同：

- 使用 Virtual DOM
- 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
- 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

都是 JavaScript 的 UI 框架，专注于创造前端的富应用。
不同于早期的 JavaScript 框架“功能齐全”，

### 区别：

- **数据响应式**
  vue 是 MVVM 框架，而 React 只是一个 View 层的库，它实现响应式是基于 Flux 实现的。

- **性能**

  计算差异的算法是高性能框架的秘密所在，React 和 Vue 在实现上有点不同。

  Vue 可以更快地计算出 Virtual DOM 的差异，
  这是由于它在渲染过程中，
  会跟踪每一个组件的依赖关系，
  不需要重新渲染整个组件树。

  而对于 React 而言，每当应用的状态被改变时，
  全部子组件都会重新渲染。
  当然，这可以通过 shouldComponentUpdate
  这个生命周期方法来进行控制，
  但 Vue 将此视为默认的优化。

- **JSX 和 Templates**

  React 中，所有的组件的渲染功能都依靠 JSX
  可以使用完整的编程语言 JavaScript 功能来构建你的视图页面。

  模板比起 JSX 读写起来更自然。
  基于 HTML 的模板使得将已有的应用逐步迁移到 Vue 更为容易。
  可以使用其他模板预处理器，比如 Pug 来书写 Vue 的模板。

  vue 的模板语法去除了往视图/组件中添加逻辑的诱惑，保持了关注点分离。

  与 React 一样，Vue 在技术上也支持 render 函数和 JSX，但只是不是默认的而已。

* **组件作用域内的 CSS**

  Vue 设置样式的默认方法是单文件组件里类似 style 的标签。
  可选 scoped 属性会自动添加一个唯一的属性

  CSS 作用域在 React 中是通过 CSS-in-JS 的方案实现的

* **Props**

  JSX 库中，数据通过 props 传到子组件中去。

  在 React 中，这是必须的，它依赖一个“单一数据源”作为它的“状态”

  在 Vue 中，props 略有不同。它们一样是在组件中被定义，但 Vue 依赖于模板语法，你可以通过模板的循环函数更高效地展示传入的数据。

* **构建工具**

  React 可以使用 Create React App (CRA)，而 Vue 对应的则是 vue-cli。

* **配套框架**

  Vue 的核心团队维护着 vue-router 和 vuex，
  它们由官方维护支持且与核心库同步更新的。
  而 React 的 react-router 和 react-redux 则是由社区成员维护，
  创建了一个更分散的生态系统

* **向下扩展**

  React 学习曲线陡峭，学 React 前，你需要知道 JSX 和 ES2015，

- **原生渲染**
  Weex 还在积极发展，成熟度也不能和 React Native 相抗衡。

# 疑问

总听到 React 不是响应式的，而 Vue 是，但写例子时修改数据都发生变化

得到的答案：

React 并不是一个 MVVM 框架，它只是一个库。但 React 生态系统中的 flux 确实一个 MVVM 框架。

https://juejin.im/post/5a9b8417518825558251ce15

# 数据双向绑定的几种思路

[链接](https://zhuanlan.zhihu.com/p/25464162)

- 发布订阅模式
- 数据劫持(get,set)
- 脏检查

## 观察者模式(也叫发布订阅模式)

定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得他们能够自动更新自己。

## 脏检查模式

不关心如何及何时改变数据，只关心在特定的检查阶段数据是否改变的数据监听技术

脏检查主动进行检查的时机：

> 1.  DOM 事件，输入文本，点击
> 2.  XHR 响应事件
> 3.  浏览器 Location 变更事件($location)
> 4.  Timer 事件($timeout, $interval)
> 5.  执行 \$digest 和 $apply

一些注意点：

1.  脏检测不是心跳检测，不会轮询检查数据
2.  数据变化默认不会有回调被调用，$apply 是基于上述时机触发的
3.  数组的 splice 等操作会触发 Data2View,因为数组的方法被重写了。

脏检查的优势：

1.  完全不关心改变数据的方式，而常规的 get,set 会强加许多限制
2.  可以实现批处理完数据再去统一更新 view
3.  脏检查比 get/set 更容易实现。脏检查是单向的检查流程，可以实现任意复杂度的表达式支持。而 get/set 需要处理复杂依赖链，表达式支持都是阉割版。

# redux 原理

[链接](https://segmentfault.com/a/1190000004236064)

# redux 流程

[Redux 入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

```
// store
// Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

import { createStore } from 'redux';
const store = createStore(fn);

//数据集合，就叫做 State
const state = store.getState();

// Action Creator定义一个函数来生成 Action
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');


//store.dispatch()是 View 发出 Action 的唯一方法。

import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});

store.dispatch(addTodo('Learn Redux'));


//Reducer State 的计算过程就叫做 Reducer。
接受 Action 和当前 State 作为参数，返回一个新的 State。

const reducer = function (state, action) {
  // ...
  return new_state;
};


const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});



Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。


import { createStore } from 'redux';
const store = createStore(reducer);

createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。

reducer最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

不得改写参数
不能调用系统 I/O 的API
不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

必须返回一个全新的对象
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```
