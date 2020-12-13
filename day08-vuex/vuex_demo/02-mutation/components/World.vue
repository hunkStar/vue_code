<template>
  <div>
    <h1>我是 World 组件</h1>
    <p>curCity: {{ curCity }}</p>
    <p>curCity: {{ this.$store.state.curCity }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["curCity"])
  }
};
</script>

<style>
</style>