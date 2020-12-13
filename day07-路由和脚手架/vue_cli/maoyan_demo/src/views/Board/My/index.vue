<template>
  <div class="page-my">
    <h1>个人中心页面</h1>
  </div>
</template>

<script>
export default {
  name: "My",

  beforeRouteLeave(to,from,next){
    // 离开个人中心，弹出二次确认框
    if(window.confirm("您确认要离开个人中心页面吗？")){
      next();
    }
  }
};
</script>