<template>
  <div class="view_login">
    <div class="nav_layout login_nav">
      <div class="com_nav white_nav">
        <div class="nav_content">
          <div class="nav_left" @click="$router.push('/mine')">
            <div class="back_btn l_con"></div>
          </div>
          <div class="nav_middle"></div>
          <div class="nav_right" @click="$router.push(go)">
            <span class="reg_btn">{{ title }}</span>
          </div>
        </div>
        <div class="nav_middle_title"><slot></slot></div>
      </div>
    </div>
    <div class="form_bg">
      <div class="form_logo"></div>
      <div class="form_outer">
        <div class="input_outer input_unfocus">
          <input type="number" placeholder="还没做登录注册呢" class="comic_input" />
        </div>
        <div class="input_outer input_unfocus">
          <input
            type="password"
            placeholder="请输入密码(8-16位数字or英文)"
            maxlength="16"
            class="comic_input"
          />
        </div>
        <div class="input_outer input_unfocus vali_input" v-if="!isLogin">
          <input
            type="text"
            placeholder="请输入验证码"
            maxlength="6"
            disabled="disabled"
            class="comic_input"
          />
          <div class="vf_btn">
            获取验证码
          </div>
        </div>
        <div class="reset_btn" v-if="isLogin"><span>忘记密码?</span></div>
        <div class="button_header form_btn disable" type="button">
          <button
            type="button"
            class="comic_button btn_log"
            style="font-size: 14px;"
          >
            <slot></slot>
          </button>
        </div>
      </div>
    </div>
    <div class="third" v-if="isLogin">
      <p class="third_title">
        其他登录方式
      </p>
      <div class="third_login">
        <span class="weibo"></span><span class="qq"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'User',
  props: {
    title: {
      type: String
    },
    isLogin: {
      type: Boolean
    },
    go: {
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
input,
textarea {
  color: #000;
  font: 400 13.3333px Arial;
}
input::placeholder {
  color: #ccc;
}
.form_bg {
  background-image: url("~@/assets/images/login_bg.287c5738.png");
}
.form_logo {
  background-image: url("~@/assets/images/login_logo.ec1f31c5.png");
}
.back_btn {
  background-image: url("~@/assets/images/back_white.4b142d5e.png");
}
.weibo {
  background-image: url("~@/assets/images/weibo.5be4e151.png");
}
.qq {
  background-image: url("~@/assets/images/qq.19db5c6b.png");
}
</style>
