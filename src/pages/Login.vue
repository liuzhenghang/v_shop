<template>
	<div class="login">
		<div class="in">
		<mt-field label="username" placeholder="Input username" v-model="username"></mt-field>
		<mt-field label="password" placeholder="Input password" type="password" v-model="password"></mt-field>
		<mt-button size="large" @click="login()" type="primary">登录</mt-button>
		</div>
	</div>
</template>

<script>
	import{ Toast } from "mint-ui";
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
					vm.$store.dispatch("setCurrentUser",null)
				}
			})
			
		},
		methods: {
			login(){
				if(this.username==" " || this.password==" "){
					Toast({
						message:"帐号密码不能为空",
						position:"middle",
						duration:3000
					});
					return;
				}
				this.$ajax.get("http://localhost:3000/user").then(res =>{
					const dataArr = res.data;
					const newArr = dataArr.filter(item => {
						return (
							item.username ===this.username &&item.password === this.password
						);
					});
					if(newArr !=null && newArr.length >0){
						this.$store.dispatch("setCurrentUser",newArr[0]);
						this.$router.push("/mine");
					}else{
						this.$store.dispatch("setCurrentUser",null);
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
