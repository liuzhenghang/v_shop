<template>
  <div class="main">
    <div class="mine">


      <div class="box" v-for="(item) in address" :key="item.id">
        <p>{{item.address}}<a style="color: red" v-show="item.chief">[默认地址]</a></p>
        <br>
        <div class="edit">
          <div>操作：
            <div style="float: right">
              <span class="goods-cart fa fa-edit" @click="editAddress(item)">编辑</span>
              <span class="goods-cart fa fa-remove" @click="removeAddress(item.id)">删除</span>
              <span v-if="!item.chief" class="goods-cart fa fa-bookmark" @click="setDefaultAddress(item.id)">设为默认</span>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%;text-align: center">
        <mt-button style="width: 100%" @click.native="addAddress()" type="primary">添加地址</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui";
import { MessageBox } from 'mint-ui';
export default {
  name: "Address",
  data(){
    return{
        address:[],
    }
  },
  mounted(){
    if (!this.$store.getters.isLogin){
      this.$store.commit("setRouterPath",this.$route.path);
      this.$router.push("/login");

      return ;
    }
    this.$eventbus.$emit("changeTitle", "地址管理");
    this.getAddress();
  },
  methods:{
    getAddress:function () {
      this.$ajax({
        method:"get",
        url:"http://localhost:8080/address/my",
        headers:this.$store.getters.getHeader
      }).then(res=>{
        this.address=[];
        if (res.data.code===0){
          let data=res.data.data;

          for (let i = 0; i < data.length; i++) {
            data[i].display=true;
          }
          this.address=data;
        }
      })
    },
    addAddress:function () {
      MessageBox.prompt("添加地址").then(({ value }) => {
        this.$ajax({
          method:"post",
          url:"http://localhost:8080/address/update",
          headers:this.$store.getters.getHeader,
          data:{id:0,address:value,chief:false}
        }).then(res=>{
          if (res.data.code===0){
            this.getAddress();
          }else {
            Toast({
              message:res.data.msg,
              position:"middle",
              duration:3000
            });
          }
        })
      });
    },
    setDefaultAddress:function (id) {
      this.$ajax({
        method:"post",
        url:"http://localhost:8080/address/default",
        headers:this.$store.getters.getHeader,
        data:{id:id}
      }).then(res=>{
        if (res.data.code===0){
          Toast({
            message:"成功",
            position:"middle",
            duration:3000
          });
          for (let i = 0; i < this.address.length; i++) {
            if (this.address[i].id===id){
              this.address[i].chief=true;
            }else {
              this.address[i].chief=false;
            }
          }
        }else {
          Toast({
            message:res.data.msg,
            position:"middle",
            duration:3000
          });
        }
      })
    },
    removeAddress:function (id) {
      this.$ajax({
        method:"post",
        url:"http://localhost:8080/address/remove",
        headers:this.$store.getters.getHeader,
        data:{id:id}
      }).then(res=>{
        if (res.data.code===0){
          this.getAddress();
        }else {
          Toast({
            message:res.data.msg,
            position:"middle",
            duration:3000
          });
        }
      })
    },
    editAddress:function (item) {
      MessageBox.prompt(item.address).then(({ value }) => {
        this.$ajax({
          method:"post",
          url:"http://localhost:8080/address/update",
          headers:this.$store.getters.getHeader,
          data:{id:item.id,address:value,chief:item.chief}
        }).then(res=>{
          if (res.data.code===0){
            for (let i = 0; i < this.address.length; i++) {
              if (this.address[i].id===item.id){
                this.address[i].address=value;
              }
            }
          }else {
            Toast({
              message:res.data.msg,
              position:"middle",
              duration:3000
            });
          }
        })
      });
    }
  }
}
</script>

<style scoped>
.mine {
  background: #6495ed;
  height: 100%;
}
.box{
  height: auto;
  width: 100%;
  padding: 5px;
  font-size: larger;
  background: white;
  margin-bottom: 10px;
}
.edit span{
  margin-right: 10px;
}
</style>