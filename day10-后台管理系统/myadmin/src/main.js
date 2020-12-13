import Vue from 'vue'
import App from './App.vue'
import router from './router'
/* b.1 引入自定义的axios */
import axios from "@/myaxios/myaxios"
import store from './store'
// a.1 引入element-ui 组件
import ElementUI from 'element-ui';
// a.2 引入样式
import 'element-ui/lib/theme-chalk/index.css';
// a.3 安装插件
Vue.use(ElementUI);
Vue.config.productionTip = false
/* b.2 挂载到 Vue原型上 */
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
