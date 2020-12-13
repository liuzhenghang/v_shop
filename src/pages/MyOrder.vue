<template>
  <div class="main">
    <h1 style="text-align: center" v-show="orders.length===0">没有订单</h1>
    <div class="order" style="background: #7aa4ef;margin-top: 20px" v-for="values in orders" :key="values.id">
      <div>
        <a>订单时间:{{ values.time }}</a>
        <a v-show="!values.sta" style="float: right;color: red">已退款</a>
      </div>
      <div class="category-item" v-for="item in values.goods" :key="item.id">
        <div class="item detail-item">
          <div class="goods-img">
            <img :src="getIndexImage(item)"/>
          </div>
          <div class="goods-textBox">
            <p class="goods-name">{{ item.name }}</p>
            <p class="goods-coach"><strong>商品价格:</strong>￥{{ item.price }}</p>
            <p class="goods-coach"><strong>商品数量:</strong>{{ item.num }}</p>
          </div>
        </div>
      </div>
      <div>
        <div style="float: left;color: red" v-show="values.sta" @click="delOrder(values.id)">取消订单？</div>
        <div style="float: left;color: black" v-show="!values.sta"><strong>订单已取消</strong></div>
        <div style="text-align: right;margin-top: 7px" class="goods-price"><strong>订单金额:</strong>￥{{ values.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui";
import {MessageBox} from 'mint-ui';

export default {
  name: "MyOrder",
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    if (!this.$store.getters.isLogin){
      this.$store.commit("setRouterPath",this.$route.path);
      this.$router.push("/login");
      return ;
    }
    this.$eventbus.$emit("changeTitle", "所有订单");
    this.getOrders();
  },
  methods: {
    getIndexImage(item) {
      let box = item.imgs.split(";");
      if (box.length === 0) {
        return ""
      } else {
        let img = ''
        for (let i = 0; i < box.length; i++) {
          if (box[i] !== "") {
            img = "http://localhost:8080/file/image/" + box[i];
            return img;
          }
        }
        return ""
      }
    },
    getOrders() {
      this.$ajax({
        method: "post",
        url: "http://localhost:8080/order/getAll",
        headers: this.$store.getters.getHeader,
      }).then(res => {
        if (res.data.code === 0) {
          this.orders = res.data.data;
          for (let i = 0; i < this.orders.length; i++) {
            this.orders[i].goods = JSON.parse(this.orders[i].goods);
          }
        } else {
          Toast({
            message: res.data.msg,
            position: "middle",
            duration: 3000
          });
        }
      })
    },
    delOrder(id) {
      console.log(id);
      MessageBox.confirm('确定执行此操作?').then(action => {
        //确认后回调函数
        console.log(action)
        this.$ajax({
          method: "post",
          url: "http://localhost:8080/order/remove",
          headers: this.$store.getters.getHeader,
          data:{id:id}
        }).then(res => {
          if (res.data.code === 0) {
            Toast({
              message: "订单取消成功",
              position: "middle",
              duration: 3000
            });
          } else {
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 3000
            });
          }
        })
      }, action => {
        //取消后回调函数
        console.log(action)
      });
    }
  }
}
</script>

<style scoped>
.main {
  background: #6495ed;
  height: 100%;
}

.order {
  padding: 10px;
}

strong {
  color: black;
}
</style>