<template>
  <div class="nav_layout">
    <div class="com_nav">
      <div class="nav_content">
        <div class="nav_left" @click="$router.back()"><div class="back_btn l_con"></div></div>
        <div class="nav_middle"><span class="nav_title"><slot/></span></div>
        <div class="nav_right"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderType'
}
</script>
<style lang="scss">
  .l_con.back_btn {
    background-image: url('~@/assets/images/goback.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
