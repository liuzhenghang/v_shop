<template>
	<div class="main">
		<div class="contaer">
			<div class="leftbar">
				<div class="barItem" v-for="(item,index) in categoryList" :key="index">
					<p @click="clickType(index)" class="menu-text">{{item.name}}<a v-if="item.click" style="color: red">√</a></p>
				</div>
			</div>
			<div class="rightContent">
				<div class="rightItem">
					<div class="category-item" v-for="(item,index) in goodsList" :key="index">
						<div class="item detail-item">
							<div class="goods-img">
								<img :src="getIndexImage(item)" />
							</div>
							<div class="goods-textBox">
								<p class="goods-name">{{item.name}}</p>
								<p class="goods-coach">{{item.price}}</p>
								<p class="goods-cartBox fa fa-shopping-cart" @click="addCart(item)"></p>
							</div>
						</div>
					</div>
		
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import{ Toast } from "mint-ui";
	export default {

		data() {
			return {
				categoryList: [],
				goodsList:[]
			}
		},
		created(){
			this.$ajax.get("http://localhost:8080/customer/goods/type").then(res=>{
        if (res.data.code===0){
          let types=[]
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i]!==""){
              let type={name:res.data.data[i],click:false}
              types.push(type);
            }
          }
          this.categoryList = types;
          console.log(res)
        }else {
          console.log(res);
        }
			});
			this.$ajax.get("http://localhost:8080/customer/goods/get/all").then(res=>{
        if (res.data.code===0){
          this.goodsList = res.data.data;
          console.log(res)
        }else {
          console.log(res);
        }
			});
		},
		mounted() {
			//触发事件
			this.$eventbus.$emit("changeTitle", "商品");
		},
		methods: {
			getGoodsByType(){
        let types="";
        for (let i = 0; i < this.categoryList.length; i++) {
          if (this.categoryList[i].click){
            types+=this.categoryList[i].name+";";
          }
        }
        console.log(types)
				this.$ajax.get("http://localhost:8080/customer/goods/get/all",{params:{types:types}}).then(res=>{
          if (res.data.code===0){
            this.goodsList = res.data.data;
            console.log(res)
          }else {
            console.log(res);
          }
				});
			},
			getCategoryPro(catgoryId){
				this.$ajax.get("http://localhost:3000/catgory/"+catgoryId+"/prodctList")
				.then(res=>{
					this.productList = res.data;
				});
			},
      clickType(index){
        if (this.categoryList[index].click){
          this.categoryList[index].click=false;
        }else {
          this.categoryList[index].click=true;
        }
        this.getGoodsByType();
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
			addCart(item){
				this.$store.dispatch('addgood',item);
				Toast({
					message:"加入购物车成功",
					position:"middle",
					duration:1000
				});
			}
		}
	}
</script>

<style>
	.contaer {
		position: relative;
	}

	.leftbar {
		position: fixed;
		left: 0;
		width: 0.94rem;
		font-size: 0.14rem;
		text-align: center;
		border-right: 1px solid #ccc;
		/*background: #999;*/
		height: 87%;
	}

	.barItem {
		height: 0.41rem;
		line-height: 0.41rem;
		border-bottom: 1px solid #ccc;
	}

	/*左边*/
	.rightContent {
		padding-left: 0.94rem;
		width: 100%;
		/*height: 100px;*/
	}

	.category-item {
		padding: 0.12rem 0;
		border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
	}

	.detail-item {
		display: flex;
		width: 100%;
	}

	.goods-img {
		width: 1.05rem;
	}

	.goods-img img {
		width: 100%;
    object-fit: cover;
	}

	.goods-textBox {
		flex: 1;
	}

	.goods-name {
		margin-bottom: 0.06rem;
	}

	.goods-coach {
		color: red;
		margin: 0.1rem 0;
	}

	.goods-cartBox {
		font-size: 0.22rem;
		color: #757575;
	}

	/*右边*/
</style>
