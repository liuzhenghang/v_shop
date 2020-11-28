<template>
	<div class="main">
		<div class="container">
			<div class="banner">
<!--        广告图-->
				<img src="/img/swipe_1.jpg" />
			</div>
			<div class="content">
				<div class="floorItem">
          <div v-for="(item,index) in goods" :key="index">
            <div class="productTop" v-if="index%2===0">
              <p class="productTop-text">{{getTypes(item.type)}}</p>

              <div class="productTop-right"><span>{{index/2+1}}F</span></div>
            </div>
            <div class="productContent"  >

              <!--            使用循环遍历所有的商品-->
              <!--            由于每行显示两个，所以下边添加v-if，如果该行是偶数行，才显示该商品和下一位商品-->
              <div class="product-item" v-if="index%2===0">
                <!--              渲染索引值下的商品-->
                <div class="itembox">
                  <div class="itemimg">
                    <img class="goodsImage" :src="getIndexImage(item)" />
                  </div>
                  <p class="goods-name">{{item.name}}</p>
                  <div class="addCartBox">
                    <span class="goods-price">¥{{item.price}}</span>
                    <span class="goods-cart fa fa-shopping-cart"></span>
                  </div>
                </div>
              </div>
              <div class="product-item" v-if="index%2===0">
                <!--              渲染索引值+1下的商品-->
                <div class="itembox" v-if="index<goods.length-1">
                  <!--                如果该商品索引超出了商品数组容量，那么就不显示商品信息，只提供一个空的div占位-->
                  <div class="itemimg">
                    <img class="goodsImage" :src="getIndexImage(goods[index+1])" />
                  </div>
                  <p class="goods-name">{{goods[index+1].name}}</p>
                  <div class="addCartBox">
                    <span class="goods-price">¥{{goods[index+1].price}}</span>
                    <span class="goods-cart fa fa-shopping-cart"></span>
                  </div>
                </div>
                <div class="itembox" v-if="!(index<goods.length-1)">
                  <!--                占位div-->
                </div>

              </div>
            </div>
          </div>
<!--          <div class="productTop">-->
<!--            <p class="productTop-text"><a style="color: red">当前是测试环境</a></p>-->
<!--            <div class="productTop-right"><span class="fa fa-bell-o"></span></div>-->
<!--          </div>-->
<!--					<div class="productContent" v-for="(item,index) in goods" :key="index" >-->

<!--&lt;!&ndash;            使用循环遍历所有的商品&ndash;&gt;-->
<!--&lt;!&ndash;            由于每行显示两个，所以下边添加v-if，如果该行是偶数行，才显示该商品和下一位商品&ndash;&gt;-->
<!--						<div class="product-item" v-if="index%2===0">-->
<!--&lt;!&ndash;              渲染索引值下的商品&ndash;&gt;-->
<!--							<div class="itembox">-->
<!--								<div class="itemimg">-->
<!--									<img class="goodsImage" :src="getIndexImage(item)" />-->
<!--								</div>-->
<!--								<p class="goods-name">{{item.name}}</p>-->
<!--								<div class="addCartBox">-->
<!--									<span class="goods-price">¥{{item.price}}</span>-->
<!--									<span class="goods-cart fa fa-shopping-cart"></span>-->
<!--								</div>-->
<!--							</div>-->
<!--						</div>-->
<!--						<div class="product-item" v-if="index%2===0">-->
<!--&lt;!&ndash;              渲染索引值+1下的商品&ndash;&gt;-->
<!--							<div class="itembox" v-if="index<goods.length-1">-->
<!--&lt;!&ndash;                如果该商品索引超出了商品数组容量，那么就不显示商品信息，只提供一个空的div占位&ndash;&gt;-->
<!--								<div class="itemimg">-->
<!--                  <img class="goodsImage" :src="getIndexImage(goods[index+1])" />-->
<!--								</div>-->
<!--								<p class="goods-name">{{goods[index+1].name}}</p>-->
<!--								<div class="addCartBox">-->
<!--									<span class="goods-price">¥{{goods[index+1].price}}</span>-->
<!--									<span class="goods-cart fa fa-shopping-cart"></span>-->
<!--								</div>-->
<!--							</div>-->
<!--              <div class="itembox" v-if="!(index<goods.length-1)">-->
<!--&lt;!&ndash;                占位div&ndash;&gt;-->
<!--							</div>-->

<!--						</div>-->
<!--					</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
    data(){
      return {
        goods:[]
      }
    },
    created(){
      // 获取所有商品
      this.$ajax.get("http://localhost:8080/customer/goods/get/all").then(res=>{
        if (res.data.code===0){
          this.goods=res.data.data;
          console.log(res.data.data)
        }else {
          console.log(res)
        }
      })
    },
		mounted() {
			//触发事件，载入此页面的时候，Header下的changeTitle监听，改变标题栏
			this.$eventbus.$emit("changeTitle", "首页");
		},
    methods:{
      // 该方法可以把从后台请求到的多个图片，只提取第一个当作首页图片
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
      getTypes:function (str) {
        let s="";
        let c=str.split(";");
        let sL=false;
        for (let i = 0; i < c.length; i++) {
          if (c[i]!==""){
            if (sL){
              s+="/";
            }
            s+=c[i];
            sL=true;
          }
        }
        return s;
      }
    }

	}
</script>

<style>
	/*头部*/
	.main {
		flex: 1;
		overflow: auto;
	}

	.main .banner {
		height: 1.83rem;
	}

	.main .banner img {
		width: 100%;
		height: 100%;
	}

	.content {
		margin: 0.02rem 0;
	}

	.productTop {
		margin-bottom: 0.1rem;
		height: 0.31rem;
		line-height: 0.31rem;
		padding: 0 0.12rem;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
	}

	.productContent {
		display: flex;
		justify-content: space-around;
	}

  .goodsImage{
    max-height: 200px;
    min-height: 200px;
    object-fit: cover;
  }

	.product-item {
		width: 48%;
	}

	.product-item:nth-child(1) {
		border-right: 1px solid #ccc;
	}

	.product-item .itembox {
		width: 99%;
		margin: 0 auto;
	}

	.product-item .itembox img {
		width: 100%;
	}

	.product-item .goods-name {
		height: 0.25rem;
		line-height: 0.25rem;
	}

	.product-item .addCartBox {
		display: flex;
		justify-content: space-between;
		padding-right: 0.15rem;
		height: 0.29rem;
	}

	.product-item .addCartBox span {
		line-height: 0.29rem;
	}

	.product-item .addCartBox .goods-price {
		color: red;
	}

	.product-item .addCartBox .goods-cart {
		font-size: 0.22rem;
		color: #757575;
	}
</style>
