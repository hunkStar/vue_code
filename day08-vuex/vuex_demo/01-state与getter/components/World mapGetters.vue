<template>
  <div>
    <h1>我是 World 组件</h1>
    <p>curCityFirst: {{ curCityFirst }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // 方案二取仓库中的 getter 数据
  // computed: {
  //   curCityFirst() {
  //     return this.$store.getters.curCityFirst;
  //   }
  // }

  // 方案三取仓库中的 getter 数据
  //   1. 从 vuex 中导入 mapGetters 辅助函数
  //   2. 调用 mapGetters 辅助函数。将返回值赋值给 computed 选项即可
  // computed: mapGetters(["curCityFirst"])
  //    最好使用 展开运算符来处理

  computed: {
    ...mapGetters(["curCityFirst"])
  }
};
</script>
