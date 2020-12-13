// 仓库根模块

// 1. 引入 Vue
import Vue from "vue";

// 2. 引入 Vuex
import Vuex from "vuex";

// 引入拆分出去的仓库字模块
import moduleA from './modules/a';
import moduleB from './modules/b';

// 3. 调用
Vue.use(Vuex);

// 4. 生成 仓库 实例对象
const store = new Vuex.Store({
    // 只配置modules
    modules: {
        ma: moduleA,
        mb: moduleB
    }
});

// 5 暴露 store
export default store;