<template>
	<div class="register">
		<div class="content">
			<mt-field label="账号" placeholder="请输入账号" v-model="num"></mt-field>
			<mt-field label="昵称" placeholder="请输入昵称" v-model="name"></mt-field>
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
        num:"",
				name: "",
				password: ""
			};
		},
    mounted() {
      this.$eventbus.$emit("changeTitle", "注册");
    },
    methods: {
			register() {
				if (this.num === "" || this.password === "" || this.name==="") {
					Toast({
						message: "账号、昵称和密码不能为空",
						position: "middle",
						duration: 5000
					});
					return;
				}

				this.$ajax({
          method:"post",
          url:"http://localhost:8080/user/register",
          data:{num:this.num,name:this.name,password:this.password}
        }).then(res=>{
          if (res.data.code===0){
            Toast({
              message: "注册成功",
              position: "middle",
              duration: 5000
            });
            this.$router.push("/login")
          }else {
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 5000
            });
          }
        })
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
