// 仓库根模块

// 1. 引入 Vue
import Vue from "vue";

// 2. 引入 Vuex
import Vuex from "vuex";

// 引入仓库根模块的 state、mutations、getters、actions
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

// 3. 调用
Vue.use(Vuex);

// 4. 生成 仓库 实例对象
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});

// end. 暴露 store
export default store;