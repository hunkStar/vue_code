<template>
  <div>
    <h1>我是 Hello 组件</h1>
    <p>curCity: {{ curCity }}</p>
    <ul>
      <li
        v-for="item in cart"
        :key="item.id"
      >{{ item.name }}</li>
    </ul>
    <!-- 改变state数据方法一  通过$store.commit(mutation的名字，要传递给这个mutation的参数)-->
    <button @click="$store.commit('SETCURCITY', '广州')">修改 curCity 方案一</button><br />

    <!-- <button @click="fn1()">修改 curCity 方案一的函数型</button><br /> -->

    <button @click="SETCURCITY('上海')">修改 curCity 方案三通过mutation</button><br />

    <button @click="ADDCART({ id: new Date().getTime(), name: 'orange' })">给购物车添加一个 orange</button>
  </div>
</template>

<script>
// mapState mapGetters 是用在 computed 上的
// mapMutations mapActions 是用在 methods 上的

import { mapState,mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["curCity", "cart"]),

    /* 
    curCity() {
      return this.$store.state.curCity;
    },
    cart() {
      return this.$store.state.cart;
    }, */
  },

  // 方案三，使用 mapMutations 辅助函数
  methods: {
    ...mapMutations(["SETCURCITY", "ADDCART"]),
  },

  /*   
  methods: {
    // 方案一  直接写：this.$store.commit(mutation的名字，要传递给这个mutation的参数)

    fn1() {
      this.$store.commit("SETCURCITY", "北京");
    },

    // 方案二 定义一个函数，函数名跟后续要调用的mutaion名字保持一致
    SETCURCITY(payload) {
      this.$store.commit("SETCURCITY",payload);
    },

    ADDCART(payload) {
      this.$store.state.cart.push(payload);
    },
  }, 
  */
};
</script>
<style scoped>
button {
  margin-top: 10px;
}
</style>

