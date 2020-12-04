<template>

</template>

<script>
export default {
  name: "MyOrder",
  data(){
    return{
      orders:[]
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "所有订单");
  },
  methods:{

  }
}
</script>

<style scoped>

</style>