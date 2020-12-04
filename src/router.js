// 导入Vue
import Vue from 'vue'
// 1:导入路由模块
import VueRouter from 'vue-router'

import Register from './pages/Register.vue'
import Home from './pages/Home.vue'
import Goods from './pages/Goods.vue'
import Cart from './pages/Cart.vue'
import Mine from './pages/Mine.vue'
import Address from './pages/Address'
import EnterOrder from './pages/EnableOrder'
import Login from'./pages/Login.vue'


// 2将模块赋给vue实例.,注册到全局，整个项目都可以使用路由
Vue.use(VueRouter);
//3 定义路由规则
const routes = [{
		path: '/',
		component: Home
	},
	{
		path: '/goods',
		component: Goods
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/mine',
		component: Mine
	},
	{
		path: '/address',
		component: Address
	},
	{
		path: '/enter_order',
		component: EnterOrder
	},
	{
		path:'/login',
		component: Login
	},
	{
		path:'/register',
		component: Register
	}
]
// 4创建路由实例   ,把路由表（规则），应用到路由实例中
const router = new VueRouter({
	routes,
});

// 导出 路由模块
export default router;
