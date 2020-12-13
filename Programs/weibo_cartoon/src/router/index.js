import Vue from 'vue'
import VueRouter from 'vue-router'

// 异步引入路由页面组件 （路由懒加载）
const Home = () => import('../views/Home')
const Cate = () => import('../views/Cate')
const Comicend = () => import('../views/Comicend')
const Daypub = () => import('../views/Daypub')
const Login = () => import('../views/Login')
const Register = () => import('../views/register')
const Mine = () => import('../views/Mine')
const Rank = () => import('../views/Rank')
const Search = () => import('../views/Search')
const More = () => import('../views/More')
const Detailspage = () => import('../views/Detailspage')
const Readcomics = () => import('../views/Readcomics')

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/cate',
      component: Cate
    },
    {
      path: '/comicend',
      component: Comicend
    },
    {
      path: '/daypub',
      component: Daypub
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/more',
      component: More,
      name: 'more'
    },
    {
      path: '/detailspage',
      component: Detailspage,
      name: 'detailspage'
    },
    {
      path: '/readcomics',
      component: Readcomics,
      name: 'readcomics'
    },
    {
      path: '/',
      component: Home
    }
  ]
})

Vue.use(VueRouter)

export default router
