<template>
	<div class="main">
    <h1>我的</h1>
<!--		<div class="mine">-->
<!--			&lt;!&ndash;我的begin&ndash;&gt;-->
<!--			<div class="floor floor_one">-->
<!--				<img src="img/github.png" alt="" />-->
<!--				<p v-show="!isLogin">-->
<!--					<router-link to="/login">登录</router-link>/-->
<!--					<router-link to="/register">注册</router-link>-->
<!--				</p>-->
<!--				<p v-if="currentUser">-->
<!--					{{currentUser.username}}-->
<!--					<router-link to="/login">退出</router-link>-->
<!--				</p>-->

<!--			</div>-->
<!--			<div class="floor floor_item floor_two flex-align-center flex-between">-->
<!--				<p>我的信息</p>-->
<!--				<i></i>-->
<!--			</div>-->
<!--			<div class=" floor floor_item floor_two flex-align-center flex-between">-->
<!--				<p>我的订单</p>-->
<!--				<i></i>-->
<!--			</div>-->
<!--			<div class="floor floor_item floor_two flex-align-center flex-between">-->
<!--				<p>我的地址</p>-->
<!--				<i></i>-->
<!--			</div>-->
<!--		</div>-->
	</div>
</template>

<script>
	export default {
		mounted() {
			//触发事件
			this.$eventbus.$emit("changeTitle", "我的");
		},
		computed:{
			isLogin(){
				return this.$store.getters.isLogin;
				},
				currentUser(){
				return this.$store.getters.currentUser;	
				}
		}
	}
</script>

<style scoped>
	.mine {
		background: #f5f5f5;
		height: 100%;
	}

	.floor_one {
		width: 100%;
		height: 2rem;
		background: #6495ed;
		position: relative;

	}

	.floor_one img {
		position: absolute;
		width: 0.9rem;
		height: 0.9rem;
		left: 0;
		right: 0;
		top: 15%;
		margin: auto;
	}

	.floor_one p {
		position: absolute;
		bottom: 25%;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
		color: white;
		font-size: 0.13;
	}

	.floor_item {
		padding: 0 0.1rem;
		height: 0.4rem;
		line-height: 0.4rem;
		font-size: 0.14rem;
		margin-bottom: 0.2rem;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}

	.floor_item i {
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
		background: url("/img/icon/common_sprites.png") no-repeat -5px -250px;
		background-size: 50%;

	}
</style>
