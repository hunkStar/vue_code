<!--  -->
<template>
  <div class="app-dashboard">
    <el-row style="height: 100%">
      <!-- 左边菜单项开始 -->
      <el-col :span="4" style="height: 100%; background-color: #324057">
        <el-menu
          style="min-height: 100%"
          active-text-color="#58a1e8"
          text-color="white"
          background-color="#1f2d3d"
          :default-active="defaultActive"
          router
        >
          <el-menu-item index="dashboard">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 数据管理开始 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index="userlist">
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="shoplist">
              <span slot="title">商家列表</span>
            </el-menu-item>
            <el-menu-item index="foodlist">
              <span slot="title">食品列表</span>
            </el-menu-item>
            <el-menu-item index="orderlist">
              <span slot="title">订单列表</span>
            </el-menu-item>
            <el-menu-item index="adminlist">
              <span slot="title">管理员列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 数据管理结束 -->
          <!-- 添加数据开始 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span>添加数据</span>
            </template>
            <el-menu-item index="addShops">
              <span slot="title">添加店铺</span>
            </el-menu-item>
            <el-menu-item index="addFoods">
              <span slot="title">添加食品</span>
            </el-menu-item>
          </el-submenu>
          <!-- 添加数据结束 -->
        </el-menu>
      </el-col>
      <!-- 左边菜单项结束 -->
      <!-- 右边内容项开始 -->
      <el-col
        :span="20"
        style="height: 100%; overflow: auto; background-color: #fff"
      >
       <router-view></router-view>
      </el-col>
      <!-- 右边内容项结束 -->
    </el-row>
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
  computed: {
      defaultActive:function(){
          console.log(this.$route.path);// /dashboard
          // /dashboard => ["","dashboard"]
          return this.$route.path.split("/")[1];
      }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
.app-dashboard {
  height: 100%;
}
</style>