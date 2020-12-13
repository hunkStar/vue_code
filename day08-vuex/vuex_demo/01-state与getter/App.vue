<template>
  <div id="app">
    <h1>App</h1>
    <p>curCity: {{ $store.state.curCity }}</p>
    <p>curCityFirst：: {{ $store.getters.curCityFirst }}</p>

    <hr />

    <Hello />

    <hr />

    <World />
  </div>
</template>

<script>
import Hello from "./components/Hello";
import World from "./components/World";

export default {
  name: "App",

  components: {
    Hello,
    World
  },

  created() {
    console.log(this.$store);
    // console.log("curCity: ", this.$store.state.curCity);
    // console.log("curCityFirst：", this.$store.getters.curCityFirst);
  }
};
</script>

<style>
</style>