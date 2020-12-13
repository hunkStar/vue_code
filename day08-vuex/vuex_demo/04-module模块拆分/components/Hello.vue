<template>
  <div>
    <h1>我是 Hello 组件</h1>
    <p>curCity: {{ curCity }}</p>
    <button @click="fn1('广州')">修改 curCity 为广州</button><br/>

    <button @click="$store.dispatch('SYNCSETCURCITY', '上海')">修改 上海 方案一</button><br/>
    
    <!-- <button @click="SYNCSETCURCITY">修改 curCity 方案二</button><br/> -->
    
    <button @click="SYNCSETCURCITY('北京')">修改 curCity为北京 方案三</button>
  </div>
</template>

<script>
// mapState mapGetters 是用在 computed 上的
// mapMutations mapActions 是用在 methods 上的
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["curCity"])
  },

  methods: {
    ...mapMutations(["SETCURCITY"]),
    ...mapActions(["SYNCSETCURCITY"]),

    fn1(payload) {
      setTimeout(() => {
        this.SETCURCITY(payload);
      }, 2000);
    }

    // SYNCSETCURCITY() {
    //   this.$store.dispatch("SYNCSETCURCITY", "南京");
    // }
  }
};
</script>
<style scoped>
button{
  margin-top: 10px;
}
</style>