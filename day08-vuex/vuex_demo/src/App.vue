<template>
  <div id="app">
    <h1>App</h1>
    <p>ma模块中的name: {{ $store.state.ma.name }}</p>
    <p>ma模块中的firstName这个 getter: {{ $store.getters['ma/firstName'] }}</p>

    <p>mb模块中的name: {{ $store.state.mb.name }}</p>
    <p>mb模块中的firstName这个 getter: {{ $store.getters['mb/firstName'] }}</p>

    <!-- 调用方法一：在@click直接写 $store.commit('ma/SET_NAME', payload) -->
    <button @click="$store.commit('ma/SET_NAME', '二狗子')">点我调用 SET_NAME 这个 mutation</button><br />
    <!-- 调用方法二： 调用函数-->
    <button @click="SET_NAME('奥特曼')">点我调用 SET_NAME 这个 mutation</button><br />

    <button @click="$store.dispatch('mb/SYNC_SET_NAME', '狗蛋')">点我调用 SYNC_SET_NAME 这个 action</button><br />

    <button @click="SYNC_SET_NAME('葫芦娃')">点我调用 SYNC_SET_NAME 这个 action</button>

  </div>
</template>

<script>
// import {mapState} from 'vuex';

export default {
  name: "App",

  computed: {
    // 在组件中同时拿到多个仓库子模块的同名state数据,单独用函数写
    aName() {
      return this.$store.state.ma.name;
    },

    bName() {
      return this.$store.state.mb.name;
    },

    // ...mapState("ma", ["name"]),
    // ...mapState("mb", ["name"])
    // 注意：如果要在组件中同时拿到多个仓库子模块的同名state数据，不要使用mapState，
  },

  created() {
    console.log(this.$store);
  },

  methods: {
    // 因为有2个仓库子模块，所以调用mutation的时候要写清楚是哪个子模块下的
    SET_NAME(payload) {
      this.$store.commit("ma/SET_NAME", payload);
    },

    SYNC_SET_NAME(payload) {
      this.$store.commit("mb/SET_NAME", payload);
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>

