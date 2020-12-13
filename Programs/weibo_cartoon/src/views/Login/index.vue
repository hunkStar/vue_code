<template>
  <User :go="'/register'" :title="'立即注册'" :isLogin="true">登录</User>
</template>

<script>
import User from '@/components/User'
export default {
  name: 'Login',
  components: {
    User
  }
}
</script>
