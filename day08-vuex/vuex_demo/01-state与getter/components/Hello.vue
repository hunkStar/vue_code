<template>
  <div>
    <h1>我是 Hello 组件</h1>
    <p>curCity: {{ $store.state.curCity }}</p>
    <p>curCityFirst：: {{ $store.getters.curCityFirst }}</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>