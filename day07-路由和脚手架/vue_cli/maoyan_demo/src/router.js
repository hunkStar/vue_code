// 1. 引入 Vue 核心
import Vue from "vue";

// 2. 引入 vue-router
import VueRouter from "vue-router";

// 在npm下载一个页面刷新进度条插件，npm i nprogress
// 引入 nprogress 的核心与他的样式
import nprogress from "nprogress"
import "nprogress/nprogress.css";


// 引入需要使用到的路由页面组件（import 要放在文件的顶部）
// 引用的时候，index.vue可以省略,vue文件名也可以省略

import Home from "./views/Home/index.vue";
import Films from "./views/Home/Films";
import Cinemas from "./views/Home/Cinemas";
import My from "./views/Home/My";
import Board from "./views/Board";
import City from "./views/City";
import Infomation from "./views/Information";
import Login from "./views/Login";
import Search from "./views/Search";

// 3. !! 调用 vue-router 这款插件 !!
Vue.use(VueRouter);

// 4. 实例化 vue-router
const router = new VueRouter({
    // 配置选项
    routes: [{
            path: "/",
            component: Home,
            children: [{
                    path: "films",
                    component: Films,
                },
                {
                    path: "cinemas",
                    component: Cinemas,
                    meta: {
                        needLogin: true // 表示需要登录,才能看该页面
                    }
                },
                {
                    path: "my",
                    component: My,
                    meta: {
                        needLogin: true, // 表示需要登录，才能看该页面
                    },

                    // 路由独享，在进入个人中心页面时要判断是否已经登录
                    // beforeEnter(to, from, next) {
                    //     // 1、判断是否登录状态，没有后端，用全局变量代替 isLogined

                    //     if (window.isLogined) { //存在，说明登录了，就可以进入
                    //         next();
                    //     } else {
                    //         //不存在，打回到登录页面
                    //         // next("/login");

                    //         // 不存在，打回到登录页面，并且将当前要去的页面的地址给携带到url上
                    //         // next(`/login?redirect=${to.fullPath}`);

                    //         // 或者可以写成对象
                    //         next({
                    //             path: "/login",
                    //             query: {
                    //                 redirect: to.fullPath
                    //             }
                    //         })
                    //     }

                    // }
                },
                {
                    path: "",
                    redirect: "/films",
                },
            ],
        },
        {
            path: "/board",
            component: Board,
        },
        {
            path: "/city",
            component: City,
        },
        {
            path: "/infomation",
            component: Infomation,
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/search",
            component: Search,
        },
    ],
});

// 先重写一下replace和push
let orginalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(path) {
    return orginalPush.call(this, path).catch(err => err);
}
let orginalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(path) {
    return orginalReplace.call(this, path).catch(err => err);
}

// 路由守卫：全局前置
router.beforeEach((to, from, next) => {
    //启动进度条
    nprogress.start();

    // 该进度条插件有一个默认的“转圈圈”动画，取消该动画
    nprogress.configure({
        showSpinner: false
    });

    // 切换页面的时候，如果很多页面都要有登录状态的判断，就要写以下
    // 1. 判断当前要去的路由的元信息中是否有 needLogin

    // console.log(to);在to中有needLogin的meta元信息
    /* if (to.meta.needLogin) {
        // 存在并且为true，需要登录。判断登录状态
        if (window.isLogined) {
            next(); // 登录了，直接放行
        } else { 
            // 没有登录, 打回到登录页面
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath,
                },
            });
        }
    } else {
        next(); // 不需要登录, 直接放行
    } */

    // 改进方法
    if (!!to.meta.needLogin && !window.isLogined) {
        // 要去的页面需要身份验证，并且当前没有登录
        next({
            path: "/login",
            query: {
                redirect: to.fullPath,
            },
        });
    } else {
        // 直接放行
        next();
    }

});

// 路由守卫：全局后置
router.afterEach(function() {
    // 完成进度条
    nprogress.done();
})

// 5. 将 router 给暴露出去
export default router;