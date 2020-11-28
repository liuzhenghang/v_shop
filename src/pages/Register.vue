<template>
	<div class="register">
		<div class="content">
			<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
			<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
			<mt-button size="large" @click="register()" type="primary">注册</mt-button>
		</div>
	</div>
</template>
<script>
	import {
		Toast
	} from "mint-ui";
	export default {
		data() {
			return {
				username: "",
				password: ""
			};
		},
		methods: {
			register() {
				if (this.username == "" || this.password == "") {
					Toast({
						message: "账号和密码不能为空",
						position: "middle",
						duration: 5000
					});
					return;
				}

				const userObj = {
					username: this.username,
					password: this.password
				};

				this.$ajax.post("http://localhost:3000/user", userObj).then(()=> {
					Toast({
						message: "注册成功",
						iconClass: "icon icon-success"
					});
					this.$router.push("/login");
				});
			}
		}
	};
</script>

<style scoped>
	.register {
		background: #6495ed;
		height: 100%;
		position: relative;
	}

	.content {
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
