<template>
  <div class="page-cinemas">
    <h1>影院列表</h1>
  </div>
</template>

<script>
export default {
  name: "Cinemas",

  // 路由守卫
  beforeRouteLeave(to ,from,next){
     console.log('beforeRouteLeave');
     next();
  },

  beforeRouteUpdate(to ,from,next){//组件没变，但是路由变了，类似于‘商品页’到‘商品详情页’
     console.log('beforeRouteLeave');
     next();
  },

  beforeRouteEnter(to ,from,next){
     console.log('beforeRouteLeave');
     next();
  }
};
</script>