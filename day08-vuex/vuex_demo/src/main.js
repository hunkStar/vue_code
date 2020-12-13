import Vue from 'vue';
import App from './App.vue';
import store from './store'; //会找到store文件夹下的index.js文件

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')