<template>

	<div class="main">
		<div class="cart">
			<!--begin-->
			<div class="cart-item" :class="{selected:itemIndex===index}" v-for="(val,index) in goodsCarts" :key="index">
				<v-touch v-on:swipeleft="left(index)" v-on:swiperight="right">
					<div class="cart-content flex-align-center">
						<div class="goods-radio" @click="changeRadio()">
							<i class="cart_radio" v-show="!radioItem"></i>
							<i class="cart_radio_select" v-show="radioItem"></i>
						</div>
						<div class="flex">
							<div class="goods-img">
								<img :src="val.pic" />
							</div>
							<div class="goods-textBox">
								<p class="goods-name">{{val.protitle}}</p>
								<div class="goodsOp flex">
									<i class="shop_cut" @click="cut(val)"></i>
									<input type="text" :value="val.num" />
									<i class="shop_add" @click="add(val)"></i>
								</div>
								<p class="goods-coach">¥{{val.price}}</p>
							</div>
						</div>
					</div>
					<!--v-show="itemIndex === cartIndex"-->
					<div class="remove" @click='remove(val)'>
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
					<i class="cart_radio" style="display: none;"></i>
					<i class="cart_radio_select"></i>
				</div>
				<div class="bottom-left">
					<p>合计:￥0</p>
				</div>
			</div>

			<div class="subminCart">
				<p>提交订单</p>
			</div>
		</div>
		<!--提交订单 end-->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				goodsCarts: [],
				itemIndex: "",
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
		created() {
			this.getGoodsCarts();
		},
		mounted() {
			//触发事件
			this.$eventbus.$emit("changeTitle", "购物车");
		},
		methods: {
			getGoodsCarts() {
				this.goodsCarts = this.$store.getters.getGoods;
				//console.log("购物车"+this.$store.getters.getGoods)
			},
			left(index) {
				this.itemIndex = index
			},
			right() {
				this.itemIndex = ""
			},
			add(item) {
				this.$store.dispatch('addgood', item);

			},
			cut(item) {
				// console.log(item);
				this.$store.dispatch('cutgood', item);
			},
			remove(item) {
				this.$store.dispatch('delgood', item);
			},
			changeRadio() {
				this.radioItem = !this.radioItem
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
