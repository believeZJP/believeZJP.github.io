import Vue from 'vue'
import App from './App.vue'

import vueRouter from 'vue-router'
import vueResource from 'vue-resource'

import TimeEntries form './components/TimeEntries.vue'

//注册两个插件
Vue.use(vueRouter)
Vue.use(vueResource)

const router = new VueRouter()

//路由map
router.map({
	'/home': {
		compent: Home
	},
	'/time-entries': {
		component: TimeEntries
	}
})

router.redirect({
	'*': '/hello'
})

router.start(App,'#app')

//没有用router的启动方法
/*
new Vue({
  el: '#app',
  render: h => h(App)
})
*/