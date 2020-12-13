<template>
  <User :go="'/login'" :title="'立即登录'" :isLogin="false">注册</User>
</template>
<script>
import User from '@/components/User'
export default {
  name: 'Register',
  components: {
    User
  }
}
</script>
