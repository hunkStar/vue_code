<template>
  <div>
    <h1>我是 World 组件</h1>
    <p>curCity: {{ curCity }}</p>
    <li v-for="item in cart" :key="item.id">cart: {{ item.name }}</li>
    <p>curCityFirst: {{ curCityFirst }}</p>
  </div>
</template>

<script>
// 要用 state 又要用 getter
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["curCity", "cart"]),
    ...mapGetters(["curCityFirst"]),

    // curCity() {
    //   return this.$store.state.curCity;
    // },
    // cart() {
    //   return this.$store.state.cart;
    // },
    // curCityFirst() {
    //   return this.$store.getters.curCityFirst;
    // },
  },
};
</script>

<style>
</style>