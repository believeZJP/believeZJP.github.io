import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Home from './components/Home.vue'
import TimeEntries from './components/TimeEntries.vue'
import LogTime from './components/LogTime.vue'

//注册两个插件
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)





//路由map
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点在讨论嵌套路由。
const routes = [{
  	path: '/Home',
  	component: Home
}, {
 	path: '/time-entries',
  	component: TimeEntries,
  	children: [{
    path: 'log-time',
    component: LogTime
  }]
}, {
  	path: '*',
  	redirect: '/Home'
}]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  	routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
	router,
	// ES6新语法，箭头函数
//	store,
	render: h => h(App)
}).$mount('#app')
