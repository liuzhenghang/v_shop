<template>
  <div class="MyMsg">
    <div class="content">
      <mt-field label="昵称" placeholder="请输入昵称" v-model="user.name"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="user.password"></mt-field>
      <mt-button size="large" @click="update()" type="primary">确认修改</mt-button>
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
      user: {}
    };
  },
  mounted() {
    if (!this.$store.getters.isLogin){
      this.$store.commit("setRouterPath",this.$route.path);
      this.$router.push("/login");
      return ;
    }
    this.user = this.$store.getters.currentUser;
    this.$eventbus.$emit("changeTitle", "信息修改");
  },
  methods: {
    update() {
      if (this.user.name === "") {
        Toast({
          message: "昵称不能为空",
          position: "middle",
          duration: 5000
        });
        return;
      }
      if (this.user.password === "") {
        this.user.password = null;
      }
      this.$ajax({
        method: "post",
        url: "http://localhost:8080/user/update",
        headers: this.$store.getters.getHeader,
        data: {name: this.user.name, password: this.user.password}
      }).then(res => {
        if (res.data.code === 0) {
          Toast({
            message: "修改成功",
            position: "middle",
            duration: 5000
          });
          this.$router.push("/mine");
        } else {
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
.MyMsg {
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
