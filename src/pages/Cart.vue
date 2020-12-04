<template>

	<div class="main">
		<div class="cart">
			<!--begin-->
			<div class="cart-item" :class="{selected:itemIndex===index}" v-for="(val,index) in goodsCarts" :key="val.id">
				<v-touch v-on:swipeleft="left(index)" v-on:swiperight="right">
					<div class="cart-content flex-align-center">
						<div class="goods-radio" @click="changeRadio(index)">
							<i class="cart_radio" v-show="!val.click"></i>
							<i class="cart_radio_select" v-show="val.click"></i>
						</div>
						<div class="flex">
							<div class="goods-img">
								<img :src="getIndexImage(val)"/>
							</div>
							<div class="goods-textBox">
								<p class="goods-name">{{val.name}}</p>
								<div class="goodsOp flex">
									<i class="shop_cut" @click="cut(val,index)"></i>
									<input type="text" :value="val.num" />
									<i class="shop_add" @click="add(val,index)"></i>
								</div>
								<p>¥{{val.price}}×{{val.num}}=<a class="goods-coach">¥{{val.price*val.num}}</a></p>
							</div>
						</div>
					</div>
					<!--v-show="itemIndex === cartIndex"-->
					<div class="remove" @click='remove(val,index)'>
						<i></i>
					</div>
				</v-touch>
			</div>

			<!--end-->
		</div>
		<!--提交订单 bdgin-->
		<div class="cartBottom-detail flex-between">
			<div class="flex">
				<div class="shopRadio">
					<i class="cart_radio" v-if="!getAllClick()" @click="selectAll(true)"></i>
					<i class="cart_radio_select" v-if="getAllClick()" @click="selectAll(false)"></i>
				</div>
				<div class="bottom-left">
					<p>合计:￥{{getAllPrice()}}</p>
				</div>
			</div>
			<div class="subminCart">
				<p @click="pushOrder()">提交订单</p>
			</div>
		</div>
		<!--提交订单 end-->
	</div>
</template>
<script>
	import {Toast} from "mint-ui";

  export default {
		data() {
			return {
				goodsCarts: [],
				itemIndex: [],
				radioItem: false
			};
		},
		beforeRouteEnter(to, from, next) {
			// 在渲染该组件的对应路由被 confirm 前调用
			// 不！能！获取组件实例 `this`
			// 因为当守卫执行前，组件实例还没被创建
			next(vm => {
				//通过 `vm` 访问组件实例
				if (vm.$store.getters.isLogin) {
					next();
				} else {
					vm.$router.push('/login');
				}
			});
		},
		mounted() {
			//触发事件
			this.$eventbus.$emit("changeTitle", "购物车");
			this.$ajax({
        method:"get",
        url:"http://localhost:8080/cart/my",
        headers:this.$store.getters.getHeader,
      }).then(res=>{
        if (res.data.code===0){
          const cart=res.data.data;
          const cartList=[];
          for (let i = 0; i < cart.length; i++) {
            let goo=this.so(cart[i].gid);
            goo.num=cart[i].num;
            goo.id=cart[i].id;
            goo.click=false;
            cartList.push(goo)
          }
          this.goodsCarts=cartList;
          console.log(cartList);
        }
      })
		},
		methods: {
      getIndexImage(item){
        let box=item.imgs.split(";");
        // 字符串转数组，比如1;2;3;4;5;就转化为[1,2,3,4,5]
        if (box.length===0){
          return ""
          // 如果没有图片，那么返回空，不渲染图片
        }else {
          let img=''
          for (let i = 0; i < box.length; i++) {
            if (box[i]!==""){
              // 返回第一个图片
              img="http://localhost:8080/file/image/"+box[i];
              return img;
            }
          }
          return ""
        }
      },
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
			left(index) {
				this.itemIndex = index
			},
			right() {
				this.itemIndex = ""
			},
			add(item,index) {
        this.$ajax({
          method:"post",
          url:"http://localhost:8080/cart/add",
          headers:this.$store.getters.getHeader,
          data:{gid:item.gid,num:1}
        }).then(res=>{
          if (res.data.code===0){
            this.goodsCarts[index].num=(item.num+1)
          }else {
            Toast({
              message:res.data.msg,
              position:"middle",
              duration:3000
            });
          }
        })
				// this.$store.dispatch('addgood', item);
			},
			cut(item,index) {
				// console.log(item);
        if (item.num-1<=0){
          this.remove(item,index);
          return ;
        }
        this.$ajax({
          method:"post",
          url:"http://localhost:8080/cart/add",
          headers:this.$store.getters.getHeader,
          data:{gid:item.gid,num:-1}
        }).then(res=>{
          if (res.data.code===0){
            this.goodsCarts[index].num=(item.num-1)
          }else {
            Toast({
              message:res.data.msg,
              position:"middle",
              duration:3000
            });
          }
        })
				// this.$store.dispatch('cutgood', item);
			},
			remove(item,index) {
        this.$ajax({
          method:"post",
          url:"http://localhost:8080/cart/remove",
          headers:this.$store.getters.getHeader,
          data:{id:item.id}
        }).then(res=>{
          if (res.data.code===0){
            let g=[];
            for (let i=0;i<this.goodsCarts.length;i++){
              if (i!==index){
                g.push(this.goodsCarts[index]);
              }
            }
            // this.goodsCarts.splice(index,index);
            this.goodsCarts=[];
            for (let i = 0; i < g.length; i++) {
              this.goodsCarts.push(g[i])
            }
            // this.goodsCarts=g;
          }else {
            Toast({
              message:res.data.msg,
              position:"middle",
              duration:3000
            });
          }
        })
			},
			changeRadio(index) {
				if (this.goodsCarts[index].click){
          this.goodsCarts[index].click=false;
        }else {
          this.goodsCarts[index].click=true;
        }
			},
      getAllPrice(){
        let price=0;
        for (let i = 0; i < this.goodsCarts.length; i++) {
          if (this.goodsCarts[i].click){
            price+=(this.goodsCarts[i].price*this.goodsCarts[i].num);
          }
        }
        return price;
      },
      getAllClick(){
        let all=this.goodsCarts.length;
        let num=0;
        for (let i = 0; i < this.goodsCarts.length; i++) {
          if (this.goodsCarts[i].click){
            num++;
          }
        }
        return (num===all);
      },
      selectAll(et){
        for (let i = 0; i < this.goodsCarts.length; i++) {
          this.goodsCarts[i].click=et;
        }
      },
      pushOrder(){
        const list=[];
        for (let i = 0; i < this.goodsCarts.length; i++) {
          if (this.goodsCarts[i].click){
            list.push(this.goodsCarts[i])
          }
        }
        if (list.length===0){
          Toast({
            message:"未选择商品",
            position:"middle",
            duration:3000
          });
          return ;
        }
        this.$store.commit("setEnterOrder",list);
        this.$router.push("/enter_order")
      }
		}
	};
</script>
<style>
	.flex {
		display: flex;
	}

	.cartBottom-detail {
		height: 0.37rem;
		line-height: 0.37rem;
		font-size: 0.14rem;
		width: 100%;
		position: absolute;
		bottom: 0.45rem;
		color: #fff;
		background: #757575;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
	}

	.cart_radio {
		background: url("/img/icon/common_sprites.png") 0px -47px;
		/* no */
	}

	.cart_radio_select {
		background: url("/img/icon/common_sprites.png") 0px 6px;
		/* no */
	}

	.goods-name {
		font-size: 0.14rem;
	}

	.goods-coach {
		font-size: 0.15rem;
		color: red;
		align-self: flex-end;
	}

	.goodsOp {
		margin: 0.2rem 0;
	}

	.goodsOp i {
		width: 0.33rem;
		height: 0.27rem;
	}

	.goodsOp input {
		border: none;
		font-size: 0.18rem;
		text-align: center;
		width: 0.3rem;
	}

	.goodsOp .shop_cut {
		background: url("/img/icon/common_sprites.png") 0px -652px;
		background-size: 100%;
	}

	.goodsOp .shop_add {
		background: url("/img/icon/common_sprites.png") 0px -682px;
		background-size: 100%;
	}

	.cartBottom-detail i {
		width: 0.34rem;
		height: 0.29rem;
		display: inline-block;
		background-size: 100%;
	}

	.subminCart {
		padding-right: 0.1rem;
	}

	/*购物车列表*/
	.cart-item {
		border-bottom: 1px solid #cccccc;
		padding-top: 0.1rem;
		height: 1.3rem;
		-webkit-transition: all 0.3s linear;
		-webkit-user-select: none;
		position: relative;
	}

	.goods-radio {
		margin: 0 0.1rem;
	}

	.goods-radio i {
		width: 0.34rem;
		height: 0.29rem;
		display: inline-block;
		background-size: 100%;
	}

	.remove {
		background: linear-gradient(90deg, #9bbeff 0%, #6495ed 100%);
		width: 18%;
		height: 1.3rem;
		line-height: 1.3rem;
		text-align: center;
		text-decoration: none;
		position: absolute;
		right: -18%;
		top: 0;
	}

	.remove i {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		left: 20%;
		width: 0.2rem;
		height: 0.24rem;
		background: url("/img/icon/common_sprites.png") -10px -438px;
	}

	.cart-content {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.selected {
		-webkit-transform: translate(-12%, 0);
		-webkit-transition: all 0.3s linear;
	}

	.goods-img {
		margin-right: 0.1rem;
		width: 1rem;
		height: 1rem;
	}

	.goods-img img {
		width: 100%;
		height: 100%;
	}
</style>
