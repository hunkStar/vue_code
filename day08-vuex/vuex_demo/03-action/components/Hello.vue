<template>
  <div>
    <h1>我是 Hello 组件</h1>
    <p>curCity: {{ curCity }}</p>
    <button @click="fn1('广州')">2秒后修改 curCity</button><br/>

    <button @click="$store.dispatch('SYNCSETCURCITY', '上海')">2秒后修改 curCity 方案一</button><br/>

    <!-- <button @click="SYNCSETCURCITY">修改 curCity 方案二</button> -->

    <button @click="SYNCSETCURCITY('北京')">2秒后修改 curCity 方案三</button>
  </div>
</template>

<script>
// mapState mapGetters 是用在 computed 上的
// mapMutations mapActions 是用在 methods 上的
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["curCity"]),
  },

  methods: {
    ...mapMutations(["SETCURCITY"]),
    ...mapActions(["SYNCSETCURCITY"]),

    fn1(payload) {
      setTimeout(() => {
        this.SETCURCITY(payload);
      }, 2000);
    },

    // 方案一：然后在方案一调用该方法，也可以直接写js代码到@click后面
    // fun2(name) {
    //   $store.dispatch("SYNCSETCURCITY", name);
    // },

    // 方案二，用对应action的名字，写一个函数，在方案二中使用
    // SYNCSETCURCITY() {
    //   this.$store.dispatch("SYNCSETCURCITY", "上海");
    // }
  },
};
</script>
<style  scoped>
button{
  margin-top: 10px;
}
</style>