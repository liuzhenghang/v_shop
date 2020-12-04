<template>
  <footer class="foot">
    <li>
      <router-link to="/"><span class="fa fa-home"></span>首页</router-link>
    </li>
    <li>
      <router-link to="/goods"><span class="fa fa-gift"></span>商品</router-link>
    </li>
    <li>
      <router-link to="/cart"><span class="fa fa-shopping-cart"></span>购物车</router-link>
    </li>
    <li>
      <router-link to="/mine"><span class="fa fa-user"></span>我的</router-link>
    </li>
  </footer>
</template>

<style>
/*中间*/
.foot {
  height: 0.45rem;
  background: #6495ed;
  display: flex;
  /*弹性布局*/
  justify-content: space-around;
  /*弹性项目平均分布在该行上，两边留有一半的间隔空间*/
  align-items: center;
  /*上下居中*/
}

.foot li {
  text-align: center;
  /*text-align 属性规定元素中的文本的水平对齐方式*/
}

.foot li  a{
  color: #faf9f9;
}

.foot li a span {

  display: block;
}

.foot li a:hover {
  /*选中状态*/
  color: orange;
}
</style>
<!--页面渲染到浏览器 router link变成a标签-->
<!--通过router-link进行跳转不会跳转到新的页面，不会重新渲染，它会选择路由所指的组件进行渲染-->
