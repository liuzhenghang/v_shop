import Vue from 'vue'
import App from './App.vue'
// 引入vue组件和主框架

import router from './router.js'
// 引入路由组件

import  './eventbus.js'
import { Field } from 'mint-ui';
// 引入mintui组件

Vue.component(Field.name, Field);
// 将mintui注册到vue中

import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })

import store from'./store.js'
// 全局变量
import Mint from 'mint-ui';
Vue.use(Mint);
import { Popup } from 'mint-ui';

Vue.component(Popup.name, Popup);
import 'mint-ui/lib/style.css'
// mint的css组件

//导入css文件
import './assets/css/reset.css'
// 导入字体图标
import './assets/font-awesome/css/font-awesome.min.css'
import axios from 'axios'
Vue.prototype.$ajax=axios
// ajax组件

Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')
// 实例化vue，并且应用各个组件
