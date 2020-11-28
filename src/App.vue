<template>
	<div id="app">
		<Header></Header>
<!--    固定头部视图-->
		<router-view></router-view>
<!--    中部视图，由router渲染-->
		<Footer></Footer>
<!--    底部导航视图-->
	</div>
</template>

<script>
	import Header from './components/Header.vue'
  // 引入头部和尾部视图
	import Footer from './components/Footer.vue'
	
	export default {
		name: 'app',
		components: {
			Header,
			Footer
		}
	}
</script>

<style>
	#app {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
