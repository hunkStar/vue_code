# vuex 的 module

## 一、什么时候需要在 vuex 中使用 module

> 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
>
> 为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

项目越做越大，功能点越写越多。需要使用 vuex 共享的数据越来越庞大时，就需要使用 module 来进行仓库模块拆分啦。

示例代码

```js
// 拆分的仓库子模块A
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... },
  // 仓库子模块也可以继续去做拆分，但是没必要搞这么复杂
  modules: {
    aa,
    ab, 
  }
}
            
// 拆分的仓库子模块B
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

// 仓库根模块
const store = new Vuex.Store({
	// 通过 modules 选项配置子模块
	modules: {
		// key: value
    //    key - 仓库子模块的名字
    //    value - 对应的仓库子模块的对象
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```



## 二、仓库拆分子模块之后，没有设置命名空间。有一些问题的

> 默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的

1. 多个仓库子模块中的 getter 不能同名，否则会报错
2. 多个仓库子模块中的 mutation 如果同名的化，组件调用这个 mutation 时。都会被触发, 会有污染的风险
3. 多个仓库子模块中的 action 如果同名的化，组件调用这个 action 时。都会被触发, 会有污染的风险



## 三、由于有上面的这种问题存在，所以推荐仓库子模块都设置上命名空间。

#### 1. 如何设置呢？

给 仓库子模块的 那个对象配置一个 namespaced 属性。属性值为 true

#### 2. 设置之后的改变是什么？

> 模块内部的 action、mutation 和 getter 是注册在**自己命名空间**的

#### 3. 设置了命名空间之后如何在组件中使用呢

基本使用步骤不变，只是要处理处理命名空间

下面的 xx 代表着某个仓库子模块的名字

###### 1.  获取某个仓库子模块中的 state

```js
// 1. 直接通过 $store
this.$store.state.xx
// 2. computed
computed: {
  name () {
		return this.$store.state.xx.name
  }
}
// 3. mapState
computed: {
  ...mapState('xx', [state1, state2, state3])
}
// 4. mapState 的转换
computed: {
 	state1() {
  	return this.$store.state.xx.state1
  }
}

// ！如果要在组件中同时拿到多个仓库子模块的同名state数据，不要使用 mapState 请使用方案二 !
```

###### 2.  获取 某个仓库子模块中的 getter
```js
// 1. 直接通过 $store
this.$store.getters['ma/firstName']
// 2. computed
computed: {
  firstName() {
    return this.$store.getters['ma/firstName']
  }
}
// 3. mapGetters
computed: {
  ...mapGetters('xx', [getter1, getter2])
}
// 4. mapGetters 的转换
compouted: {
  getter1() {
		return this.$store.getters['xx/getter1']
  }
}
```

###### 3. 提交 某个仓库子模块中的 mutation

```js
// 1. 直接通过 $store
this.$store.commit('ma/SET_NAME', payload)
// 2. methods
methods: {
  SET_NAME(payload) {
    this.$store.commit('ma/SET_NAME', payload)
  }
}
// 3. mapMutations
methods: {
  ...mapMutations('xx', [mutation1, mutation2])
}
// 4. mapMutations 的转换
methods: {
	mutation1(payload) {
    this.$store.commit('xx/mutation1', payload)
  }
}
```

###### 4. 派发 某个仓库子模块中共的 action

```js
// 1. 直接通过 $store
this.$store.dispatch('ma/SYNC_SET_NAME', payload)
// 2. methods
methods: {
  SYNC_SET_NAME(payload) {
		this.$store.dispatch('ma/SYNC_SET_NAME', payload)
  }
}
// 3. mapActions
methods: {
  ...mapActions('xx', [action1, action2])
}
// 4. mapActions 的转换
methods: {
	action1(payload) {
    this.$store.dispatch('xx/action1', payload)
  }
}
```

### 四、仓库拆分子模块的时候，如果没有设置命名空间（namespaced: true），会导致的问题

##### 默认情况下，模块内部的action、getter和mutation是注册在**全局命名空间**下的

1、多个仓库子模块中的getter不能同名，会报错

2、多个仓库子模块中的 mutation 如果同名的话，组件调用这个 mutation 时都会被触发

3、多个仓库子模块中的 action 如果同名的话，组件调用这个 action 时都会被触发