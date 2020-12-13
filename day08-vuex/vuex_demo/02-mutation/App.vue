<template>
  <div id="app">
    <h1>App</h1>
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
  }
};
</script>

<style>
</style>