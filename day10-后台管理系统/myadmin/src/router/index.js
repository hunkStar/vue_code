import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);
// 处理多次请求同一个路径报错的问题
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location){
  return originalPush.call(this,location).catch(err=>err)
}
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/components/Dashboard.vue"),
    children: [
      {
        path:"",
        name:"home",
        component:()=>import("@/components/Home.vue"),
        meta:[]
      },
      {
        path: "/userlist",
        name: "userlist",
        component: () => import("@/components/UserList.vue"),
      },
      {
        path: "/shoplist",
        name: "shoplist",
        component: () => import("@/components/ShopList.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
