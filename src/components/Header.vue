<template>
<!--  title的渲染-->
	<mt-header class="head" v-bind:title="title">
<!--    跳转到路由根路径-->
		<a slot="left">
			<mt-button icon=""></mt-button>
		</a>
<!--    暂留右侧按钮-->
		<mt-button icon="" slot="right"></mt-button>
	</mt-header>
</template>

<script>
	export default {
		data() {
			return {
				title: '首页'
        //顶部title的数据
			};
		},
		mounted() {// 创建监听事件，changeTitle，该事件会传入一个字符串，
      // 用于更改页面最上方的title
      // 调用的时候由其他触发调用
			this.$eventbus.$on('changeTitle', (str) => {
				this.title = str
			})
		}
	}
</script>

<style>
	.head {
		align-content: center;
		text-align: center;
	}
</style>
