import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//创建仓库
const store = new Vuex.Store({
	//存储数据的容器
	state: {
		currentUser: JSON.parse(localStorage.getItem('user') || null),
		isLogin: false
	},
	//对数据操作的方法
	mutations: {
	},
	//读取容器中的数据
	getters: {
		getGoods(state){
			return state.goodsCarts;
		},
		isLogin(state){
			return state.isLogin;
		},
		currentUser(state){
			return state.currentUser;
		}
	},
	actions: {}
})
export default store;
