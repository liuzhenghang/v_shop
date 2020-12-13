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
  import {Toast} from "mint-ui";
	
	export default {
		name: 'app',
		components: {
			Header,
			Footer
		},
    async mounted () {
      const user={id:this.$store.getters.currentUser.id,token:this.$store.getters.currentUser.token
      };
      console.log(user)
      if (user.id!==null){
        let res=await this.$ajax.get("http://localhost:8080/user/token",{params:user});
        console.log(res)
        if (res.data.code===0){
          this.$store.commit('setUser',res.data.data);
          if (this.$route.path!==this.$store.getters.getRouterPath){
            this.$router.push(this.$store.getters.getRouterPath);
          }

        }else {
          this.$store.commit('removeUser');
          Toast({
            message:"请登录",
            position:"middle",
            duration:3000
          });
        }
      }
      this.$ajax.get("http://localhost:8080/customer/goods/get/all").then(res=>{
        if (res.data.code===0){
          this.$store.commit("setGoodsList",res.data.data);
          console.log(res.data.data)
        }else {
          console.log(res)
        }
      })
    }
	}
</script>

<style>
	#app {
    /*background: #6495ed;*/
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
