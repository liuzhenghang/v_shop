<template>
  <div class="main">
    <div style="background: white;width: 100%;height: 70px;margin-top: 20px">
      <div style="width: 80%;float: left">
        <h3 style="color:white;">`<a style="color: black">{{ address }}</a></h3>
      </div>
      <div style="width: 20%;float: left;text-align: center;border-left:solid 2px #757575;height: auto">
        <i class="fa fa-angle-right fa-5x" aria-hidden="true"></i>
      </div>
    </div>
    <div style="background: white;margin-top: 20px">
      <div class="category-item" v-for="item in order" :key="item.id">
        <div class="item detail-item">
          <div class="goods-img">
            <img :src="getIndexImage(item)" />
          </div>
          <div class="goods-textBox">
            <p class="goods-name">{{ item.name }}</p>
            <p class="goods-coach">￥{{item.price}}×{{item.num}}</p>
            <p class="goods-coach">￥{{ item.price*item.num }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cartBottom-detail flex-between">
      <div class="flex">
        <div class="bottom-left">
          <p>合计:￥{{getAllPrice()}}</p>
        </div>
      </div>
      <div class="subminCart">
        <p @click="pushOrder()">提交订单</p>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui";

export default {
  name: "EnableOrder",
  data(){
    return{
      order:[],
      // categoryList: [],
      address:"22222"
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "确认订单");
    const cartList=this.$store.getters.getEnterOrder;
    console.log(cartList)
    for (let i=0;i<cartList.length;i++){
      let goo=this.so(cartList[i].gid);
      goo.num=cartList[i].num;
      goo.id=cartList[i].id;
      this.order.push(goo);
    }
  },
  methods:{
    so(gid){
      const goods=this.$store.getters.getGoodsList;
      for (let i=0;i<goods.length;i++){
        if (goods[i].id===gid){
          const goo={
            gid:gid,
            name:goods[i].name,
            price:goods[i].price,
            imgs:goods[i].imgs
          }
          return goo;
        }
      }
      return {
        gid:gid,
        name:"该商品以下架",
        price:0,
        imgs:"",
      }
    },
    getIndexImage(item){
      let box=item.imgs.split(";");
      if (box.length===0){
        return ""
      }else {
        let img=''
        for (let i = 0; i < box.length; i++) {
          if (box[i]!==""){
            img="http://localhost:8080/file/image/"+box[i];
            return img;
          }
        }
        return ""
      }
    },
    getAllPrice(){
      let price=0;
      for (let i = 0; i < this.order.length; i++) {
          price+=(this.order[i].price*this.order[i].num);
      }
      return price;
    },
    pushOrder(){
      if (this.address===""){
        Toast({
          message:"请选择地址",
          position:"middle",
          duration:3000
        });
        return ;
      }
      console.log(this.order)
      let order={
        address:this.address,
        goods:JSON.stringify(this.order)
      }
      this.$ajax({
        method:"post",
        url:"http://localhost:8080/order/push",
        headers:this.$store.getters.getHeader,
        data:order
      }).then(res=>{
        if (res.data.code===0){
          Toast({
            message:"下单成功",
            position:"middle",
            duration:3000
          });
          this.$router.push("/cart");
        }else {
          Toast({
            message:res.data.msg,
            position:"middle",
            duration:3000
          });
        }
      })

    }
  }
}
</script>

<style scoped>
.main{
  background: #6495ed;
  height: 100%;
}
</style>