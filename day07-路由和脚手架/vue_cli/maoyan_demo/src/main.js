// 1. 引入 Vue 核心
import Vue from "vue";

// 2. 引入 万年老二组件 App
import App from "./App.vue";

// 引入 router.js   .js后缀可以省略
import router from "./router.js";

// 引入 全局css样式
import "./assets/base.scss";

// 3. 实例化
new Vue({
    el: "#app",
    router,
    render: (h) => h(App),
});