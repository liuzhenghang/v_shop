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
		},
    mounted() {
      const user={id:this.$store.getters.currentUser.id,token:this.$store.getters.currentUser.token
      };
      console.log(user)
      if (user.id!==null){
        this.$ajax.get("http://localhost:8080/user/token",{params:user})
            .then(res=>{
              console.log(res)
              if (res.data.code===0){
                this.$store.commit('setUser',res.data.data);
              }else {
                // this.$store.commit('removeUser');
              }
            })
      }
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
