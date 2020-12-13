<!--  -->
<template>
  <div class="app-header">
    <div class="app-header-left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item v-for="(item, index) in $route.meta">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="app-header-right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/imgs/default.jpg" alt="" class="avator" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="index">首页</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleCommand(command) {
      if (command === "index") {
        this.$router.push("dashboard");
      } else {
        // 退出
        this.$axios.get("/admin/signout").then((res) => {
          if (res.status === 1) {
            this.$message({
              type: "success",
              message: "退出成功！",
            });
            this.$router.push("/");
          } else {
            this.$notify({
              title: "退出失败",
              message: "退出有异常",
              type: "warning",
            });
          }
        });
      }
      //   this.$message("click on item " + command);
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
.app-header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  background-color: #eff2f7;
  padding: 5px;
  .app-header-left {
  }

  .app-header-right {
    .avator {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }
}
</style>