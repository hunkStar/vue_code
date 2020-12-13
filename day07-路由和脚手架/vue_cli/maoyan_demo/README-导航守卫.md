# 导航守卫

## 一、什么叫导航

导航就是路由正在发生变化

## 二、导航守卫、路由守卫、路由的钩子函数

在路由发生变化时会自动触发的一些函数

## 三、守卫有哪些

一、全局守卫（通过 new VueRouter() 生成的这个实例对象去使用）

 1.  全局前置守卫		beforeEach

     ```js
     router.beforeEach((to, from, next) => {
     
     })
     ```

     

 2.  全局后置守卫        afterEach

     ```js
     router.afterEach((to, from) => {
     	// afterEach 是在导航已经完成了触发。这时有 next 也没用。
     })
     ```

     

 3.  全局解析守卫        beforeResolve

     ```js
     router.beforeResolve((to, from, next) => {
     
     })
     ```

二、路由独享 （路由规则中的一个配置项）

 1.  beforeEnter

     ```js
     new VueRouter({
       routes: [
         {
           path: '/hello',
           component: hello,
           beforeEnter: (to, from, next) => {
             
           }
         }
       ]
     })
     ```

     

三、路由组件中 （在组件的配置选项中定义的，也就是与那个 data 、props 一起的那个）

 	1. beforeRouteLeave
 	2. beforeRouteUpdate
 	3. beforeRouteEnter

```js
{
  data() {
    return {
      name: '张三'
    }
  },
    
  beforeRouteLeave(to, from, next) {
    
  },
  beforeRouteUpdate(to, from, next) {
    
  },
  beforeRouteEnter(to, from, next) {
    
  }  
}
```



## 四、to、from、next

一、to 			代表着将要去的路由的信息对象

二、from		当前导航正要离开的路由

三、next		 是一个函数，必须要调用。

		1. next()		进入下一个
  		2. next('/')   next({ path: '/list' })     重定向到某个路由



## 五、详细介绍

1. beforeEach
   1. 全局前置
2. afterEach
	 1. 全局后置
3. beforeEnter
	 1. 路由独享
	 2. 当进入到这个路由的时候，这个函数会触发，触发时机在 beforeEach 之后。在 beforeRouteEnter 之前
4. beforeRouteEnter
	 1. 组件内配置的。触发在 beforeEnter 之后
5. befoerRouteUpdate
	 1. 在动态路由的时候，参数发生变化时，触发
6. beforeRouteLeave
	 1. 当离开时第一个触发，在 beforeEach 之前

## 六、思考如下的导航，导航守卫触发的顺序

一、/home  ->  /list

	1.  /home 组件中的 **beforeRouteLeave**
 	2.  全局前置  **beforeEach**
 	3.  /list 的配置中触发 **beforeEnter**
 	4.  /list 组件中的 **beforeRouteEnter**
 	5.  全局后置 **afterEach**

二、/detail/1   ->  /detail/2

 	1. 全局前置 **beforeEach**
 	2. detail 组件中的  **beforeRouteUpdate**
 	3. 全局后置 **afterEach**

## 七、需求1： 任何页面跳转时，需要在页面上出现滚动条显示

	1. 在全局前置的 **beforeEach** 中让进度条开始滚动
 	2. 在全局后置的 **afterEach** 中让进度条完成

借助 **nprogress** 插件实现

## 八、需求2： 离开个人中心页面时，需要二次确认

1. 在个人中心页面的  **beforeRouteLeave** 中处理即可

## 九、需求3：必须要有登录状态才能进入个人中心页面。身份认证

方案一、

​	对个人中心页面配置路由独享守卫 **beforeEnter** ，在里面判断是否有登录

方案二、

​	给需要身份认证的页面配置路由元信息 (meta)，然后在全局前置守卫 **beforeEach** 中处理即可。

​	元信息是给某个路由配置一些额外的信息



#### 需求增加，登录成功之后，浏览器后退不要进入登录页面

在登录成功跳转的时候，不要使用 push 而是使用 replace 就ok了。

#### 需求增加，登录成功之后要跳转回之前想要去的页面

1. 在身份验证不通过，打回到登录页面时，将当前的地址携带在url地址上，通过？号传递过去
2. 登录页面登录成功之后，通过url地址获取到之前要去的页面地址。然后跳转即可

##### ？推荐使用 to.fullPath 而不是 to.path 好在哪里？

比如我们去 /my 的时候，url 路由携带有 ？号参数。/my?type=1&hello=2.

这时使用 to.path 只能得到 /my

而用 to.fullPath 能得到完整的 /my?type=1&hello=2

##### ？当前只有一个页面需要身份验证。如果多个的时候，每一个都去写 beforeEnter 是不是不合理？

这时请使用推荐的方案二



























