<template>
  <div class="com-mine">
    <div class="nav_layout">
      <div class="com_nav white_nav">
        <div class="nav_content">
          <div class="nav_left" @click="$router.push('/home')"><div class="back_btn l_con"></div></div>
          <div class="nav_middle"><span class="nav_title"></span></div>
          <div class="nav_right"></div>
        </div>
        <!---->
      </div>
    </div>
    <div class="banner" @click="$router.push('/login')">
      <div class="avatar component_avatar mine-avatar">
        <img
          src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/avatar.78577bb7.png"
        /><!---->
      </div>
      <p class="mine-nickname">
        戳我立即登录哦QAQ
      </p>
      <p class="mine-vcoin">
        我的墨币: 0
      </p>
    </div>
    <div class="mine-list" @click="$router.push('/login')">
      <div class="mine-item">
        <img
          src="@/assets/images/m001.png"
          class="m-item-icon"
        /><span class="m-item-title">墨币充值</span
        ><span class="m-item-nav"></span>
      </div>
      <div class="mine-item">
        <img
          src="@/assets/images/m002.png"
          class="m-item-icon"
        /><span class="m-item-title">我的关注</span
        ><span class="m-item-nav"></span>
      </div>
      <div class="mine-item">
        <img
          src="@/assets/images/m003.png"
          class="m-item-icon"
        /><span class="m-item-title">浏览历史</span
        ><span class="m-item-nav"></span>
      </div>
      <div class="mine-item">
        <img
          src="@/assets/images/m004.png"
          class="m-item-icon"
        /><span class="m-item-title">意见反馈</span
        ><span class="m-item-nav"></span>
      </div>
      <div class="mine-item">
        <img
          src="@/assets/images/m005.png"
          class="m-item-icon"
        /><span class="m-item-title">已购作品</span
        ><span class="m-item-nav"></span>
      </div>
      <div class="mine-item">
        <img
          src="@/assets/images/m006.png"
          class="m-item-icon"
        /><span class="m-item-title">自动购买管理</span
        ><span class="m-item-nav"></span>
      </div>
    </div>
    <!---->
  </div>
</template>
<script>
export default {
  name: 'Mine'
}
</script>
<style lang="scss" scoped>
.com-mine .banner {
  background-image: url('~@/assets/images/cover_bg.abfb0eee.png');
}
.mine-nickname {
  font-size: 16px;
}
.com-mine .banner::after {
  background-image: url('~@/assets/images/cover_bottom.50206627.png');
}
.white_nav .nav_left .l_con.back_btn {
  background-image: url('~@/assets/images/back_white.4b142d5e.png');
}
</style>
