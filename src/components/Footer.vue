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
    <!--    点击不同的链接 将相应的页面渲染到router view-->
    <!--      路由跳转 跳转后页面不刷新-->
    <!--      使用router-link，该标签指向路由对应的url，实现不刷新页面跳转url-->
    <!--      该标签被渲染后会变成a标签，所以在css样式中，应该指定a标签的属性-->
    <!--    <router-link>组件支持用户在具有路由功能的应用中点击导航。通过to属性指定目标地址，默认渲染为带有正确连接的<a>标签-->
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
/*设置display:block就是将元素显示为块级元素。如下代码就是将内联元素a转换为块状元素，从而使a元素具有块状元素特点。*/
/*a{display:block;}*/
/*块级元素特点：*/
/*1、每个块级元素都从新的一行开始，并且其后的元素也另起一行。*/
/*2、元素的高度、宽度、行高以及顶和底边距都可设置。*/
/*3、元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。*/

.foot li a:hover {
  /*选中状态*/
  color: orange;
}
</style>
<!--页面渲染到浏览器 router link变成a标签-->
<!--通过router-link进行跳转不会跳转到新的页面，不会重新渲染，它会选择路由所指的组件进行渲染-->
