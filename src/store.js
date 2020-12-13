import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//创建仓库
const store = new Vuex.Store({
	//存储数据的容器
	state: {
		currentUser: {
			id:localStorage.getItem("id"),
			token:localStorage.getItem("token"),
			name:localStorage.getItem("name")
		},
		isLogin: false,
		goodsList:[],
		cart:[],
		enterOrder:[],
		router_path:"/"
	},
	//对数据操作的方法
	mutations: {
		setUser(state,user) {
			state.currentUser=user;
			state.isLogin=true;

			localStorage.setItem("id",user.id);
			localStorage.setItem("token",user.token);
			localStorage.setItem("name",user.name);
			console.log({
				id:localStorage.getItem("id"),
				token:localStorage.getItem("token"),
				name:localStorage.getItem("name")
			})
		},
		removeUser(state) {
			state.isLogin=false;
			localStorage.removeItem("id");
			localStorage.removeItem("token");
			localStorage.removeItem("name");
			state.currentUser={
				id:localStorage.getItem("id"),
				token:localStorage.getItem("token"),
				name:localStorage.getItem("name")
			}
		},
		setGoodsList(state,list){
			state.goodsList=list;
		},
		setEnterOrder(state,orderList){
			state.enterOrder=orderList;
		},
		setRouterPath(state,path){
			state.router_path=path;
		}

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
		},
		getGoodsList(state){
			return state.goodsList;
		},
		getHeader(state){
			if (state.isLogin){
				return {
					id:state.currentUser.id,
					token:state.currentUser.token,
					author:"customer"
				}
			}
			return {
				id:0,
				token:"",
				author:"customer"
			}
		},
		getEnterOrder(state){
			const list=state.enterOrder;
			state.enterOrder=[];
			return list;
		},
		getRouterPath(state){
			return state.router_path;
		}
	},
	actions: {}
})

export default store;
