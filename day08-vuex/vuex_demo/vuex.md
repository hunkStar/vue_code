# vuex

## 一、vuex是什么

vue官方提供的状态管理器。用于处理全局的数据共享问题的。

## 二、vuex的仓库中的五大核心概念

- state				专门存共享数据的地方
- getter               可以针对现有的 state 数据或者其余的 getter 做的一个二次计算。可以理解为仓库的计算属性
- mutation          唯一能够修改 state 数据的东西，不允许写异步代码
- action               它里面可以写异步代码，它如果要修改 state 数据，是通过去调用 mutation
- module              仓库模块的拆分

## 三、如何使用

1. 项目中安装 vuex

   ```bash
   $ npm install vuex
   ```

2. 创建 src/store.js 文件。这个文件用来生效仓库的实例

3. 需要在 src/main.js 文件的 new Vue() 的位置去配置 store 选项，选项值是上一个步骤中暴露出来的 store 的实例

## 四、如何分辨是否已经配置好 vuex 的仓库了呢

查看 vueDevtools 就可以

## 五、组件中如何使用 state 与 getter

#### 方案一、使用挂载到 Vue原型上的 **$store** 对象。这个 $store 就是 new Vuex.Store() 生成的仓库实例对象

#### 方案二 (推荐)、使用 computed 

```js
<script>
export default {
  computed: {
    curCity() {
      return this.$store.state.curCity;
    },
    cart() {
      return this.$store.state.cart;
    }
  }
}  
</script>
```

#### 方案三(推荐、就是方案二的一个优雅写法)、使用 vuex 提供的辅助函数

1. 组件中从 vuex 中引入你需要的辅助函数

2. 调用辅助函数，并将其返回的值赋给组件的 computed 选项

   ```html
   <script>
   // 引入 辅助函数 。采用类似 解构赋值的方式
   import { mapState } from 'vuex'
   
   export default {
     // mapState 返回值是一个 对象
     computed: mapState(['curCity', 'cart'])
   }  
   </script>
   ```

###### mapState 与 mapGetters 的语法

```js
// mapState 接收一个数组做为参数，参数中的每一项，就是在仓库中的 state 数据
mapState([state1, state2, state3])

// mapGetters  接收一个数组做为参数，参数中的每一项，就是在仓库中的 getter 数据
mapGetters([getter1, getter2])
```

###### 方案二与方案三效果一样，但是在 VueDevtools 中的表现有稍微一点不同

方案二时，插件中显示的是 computed

方案三时，插件中显示的是 vuexbindings

###### 方案二与方案三效果一样，一般我们更推荐大家使用方案三。但是在什么情况下要使用方案二呢？

希望组件中的数据与仓库中的数据用不同的名字的时候。采用方案二

###### 使用方案三时，我们组件自身还有一些自己的computed数据，该如何办？

将 mapState() 使用 ... 做展开

## 六、组件中如何去修改仓库中的 state 与 getter 数据呢

首先明确一点。state 可以修改。getter 不能修改。

步骤：

	1. 仓库中要提供 对应 state 修改的 mutation 函数
 	2. 在组件中去调用 mutation

调用 mutation 的三套方案：

#### 方案一、直接使用 vuex 绑定到 vue  原型上的 $store 这个对象的 commit() 方法

#### 方案二、在组件中先定义一个函数，函数名跟后续要调用的mutaion名字保持一致，函数内部使用方案一

#### 方案三、使用 mapMutations 辅助函数

```js
// mapMutations的语法
// 接收一个数组作为参数，数组中的每一项是一个 mutation 的名字
mapMutations([mutation1, mutation2, mutation3])
```

示例代码

```js
{
	methods: mapMutations(["SETCURCITY", "ADDCART"])
}
```

示例代码转换就是如下的代码效果

```js
{
  methods: {
    SETCURCITY(payload) {
			this.$store.commit('SETCURCITY', payload)
    },
    ADDCART(payload) {
			this.$store.commit('ADDCART', payload)
		}
  }
}
```

###### 为了结合组件自身的函数，所以 mapMutations 也需要使用展开运算符来使用

###### 所有的 mutation 执行，都能够在 VueDevtools 去看到

###### 为什么 vuex 中的 state 必须使用 mutation 来修改呢

1. 为了以一种可以预见的方式去修改数据，不至于让数据难以理解。
2. 为了实现时间旅行。

## 七、使用 action 异步的修改 state 数据

首先需要知道，mutation 里面只允许同步的去修改 state 数据。（虽然在mutation中可以异步的去修改state数据不会报错，但是会导致时间旅行等机制没有效果）

如果异步的修改的化，有两个大方案

1. 不涉及action。在组件上异步代码走完之后再去调用 mutation
2. 使用 action



使用 action。首先需要在 actions 选项中定义 action 函数

**注意：action 中不能直接去修改 state，要修改是通过 context.commit() 去执行某个 mutation 来修改**

#### 方案一、直接使用 vuex 绑定到 vue  原型上的 $store 这个对象的 dispatch() 方法

```js
// dispatch 语法
//     actionName - 要调用action的名字
//     payload    - 要传递这个 action 的参数
this.$store.dispatch(actionName, payload)
```

#### 方案二、在组件中先定义一个函数，函数名跟后续要调用的 action 名字保持一致，函数内部使用方案一

#### 方案三、使用 mapActions 这个辅助函数

```js
// mapActions 的语法
// 接收一个数组作为参数，数组中的每一项是一个 action 的名字
mapActions([action1, action2, action3])
```

示例代码

```js
{
  methods: mapActions(["SYNCSETCURCITY"])
}
```

转换之后如下所示

```js
{
  methods: {
    SYNCSETCURCITY(payload) {
      this.$store.dispatch('SYNCSETCURCITY', payload)
    }
  }
}
```













