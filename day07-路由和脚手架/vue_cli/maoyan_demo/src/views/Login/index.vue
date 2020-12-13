<template>
  <div class="page-login">
    <h1>登录页面</h1>
    <button
      @click="handleLogin"
      class="loginBtn"
    >点我就可以登录</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    handleLogin() {
      // 设置登录状态
      window.isLogined = true;

      //登录成功，跳转回首页  使用编程式导航
      //  this.$router.push("/");

      // 登录成功后，浏览器后退时，不要重新进入登录页面
      // 上面就不能用push，而是用replace
      // this.$router.replace("/");

      // 登录成功，获取url地址上？号传递过来的 redirect 参数的值，再跳转
      let redirect = this.$route.query.redirect || "/";
      this.$router.replace(redirect);
    },
  },
};
</script>

<style scoped>
.loginBtn {
  margin-top: 20px;
}
</style> 