import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { PullRefresh, Lazyload } from 'vant'
import ElementUI from 'element-ui'

import './assets/styles/base.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/home1.scss'
import './assets/styles/page.scss'
import './assets/styles/vendors.scss'

Vue.use(ElementUI)
Vue.use(PullRefresh)
Vue.use(Lazyload, {
  Homeone: true,
  Hometwo: true,
  Swiper: true,
  SwiperItem: true,
  preload: 1.3
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
