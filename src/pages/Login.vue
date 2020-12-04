<template>
	<div class="login">
		<div class="in">
		<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
		<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
		<mt-button size="large" @click="login()" type="primary">登录</mt-button>
		</div>
	</div>
</template>

<script>
	import{ Toast } from "mint-ui";
  // import qs from "qs";
	export default{
		data(){
			return{
				username:"",
				password:""
			};
		},
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				if(vm.$store.getters.isLogin){
					vm.$store.commit("removeUser")
				}
			})
		},
		methods: {
			login(){
				if(this.username==="" || this.password===""){
					Toast({
						message:"帐号密码不能为空",
						position:"middle",
						duration:3000
					});
					return;
				}
				this.$ajax.post("http://localhost:8080/user/login",
            {num:this.username,password:this.password}).then(res =>{
					if (res.data.code===0){const user=res.data.data;
					console.log(user)
            this.$store.commit('setUser',user);
            // this.$store.dispatch("setCurrentUser",user);
            this.$router.push("/mine");
          }else{
            this.$store.commit("removeUser");
            Toast({
              message:res.data.msg,
              position:"middle",
              duration:3000
            });
          }
				})
			}
		}
	}
	

</script>

<style>
	.login{
		background: #6495ed;
		height: 100%;
		position: relative;
	}
	.in{
		width: 90%;
		height: 200px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

</style>
