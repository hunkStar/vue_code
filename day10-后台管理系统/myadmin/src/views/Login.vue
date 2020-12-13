<!--  -->
<template>
  <div class="login">
    <h1>后台管理系统</h1>
    <div class="login-box">
      <!-- 登录框以及逻辑 -->
      <el-form
        :model="formData"
        :rules="rules"
        ref="submitForm"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="" size="normal" prop="password">
          <el-input
            type="password"
            v-model="formData.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="login-button"
          size="default"
          @click="handleLogin('submitForm')"
          >登录</el-button
        >
      </el-form>
      <!-- 登录框以及逻辑结束 -->
      <!-- 温馨提示开始 -->
      <div class="login-p">
        <p class="text">温馨提示</p>
        <p class="text">未登录过的新用户，自动注册</p>
        <p class="text">注册过的用户可凭账号密码登录</p>
      </div>
      <!-- 温馨提示结束 -->
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "输入密码不能为空!",
          trigger: "blur",
        },
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleLogin: function (formName) {
      this.$refs[formName].validate((valid) => {
        // valid == true
        if (valid) {
          this.$axios
            .post("/admin/login", {
              user_name: this.formData.username,
              password: this.formData.password,
            })
            .then((res) => {
              if (res.status === 1) {
                this.$message({
                  type: "success",
                  message: "登录成功",
                });
                // 进行路由跳转
                this.$router.push("/dashboard");
              } else {
                this.$message({
                  type: "warning",
                  message: "账号或者密码有误",
                });
              }
            });
        } else {
          this.$message({
            type: "warning",
            message: "不可以提交！",
          });
          return false;
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import url("../style/mixin.less");
.login {
  .tlc();
  h1 {
    color: white;
    // color:white;
    text-align: center;
    font-weight: 200;
    padding: 20px;
  }
  .login-box {
    border-radius: 10px;
    padding: 10px;
    background-color: white;
    .wh(300px,300px);
    .login-form {
      width: 90%;
      margin: 0 auto;
      .login-button {
        width: 100%;
      }
    }
    .login-p {
      .text {
        text-align: center;
        color: red;
        font-size: 14px;
      }
    }
  }
}
</style>