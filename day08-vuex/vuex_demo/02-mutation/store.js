// 1. 引入 Vue
import Vue from "vue";

// 2. 引入 Vuex
//      vuex 完整的取出赋值给 Vuex
//      vuex.Store 赋值给    Store
import Vuex, { Store } from "vuex";

// 3. !!进行调用!!
Vue.use(Vuex);

// 4. 实例化 Vuex 的一个 仓库实例对象
const store = new Store({
    // 配置选项
    // 1. state
    state: {
        curCity: "深圳",

        cart: [
            { id: 1, name: "apple" },
            { id: 2, name: "banana" },
        ],
    },

    // 2. getters 里面 设置 getter
    getters: {
        // key: value
        //      key - 一个 getter 的名字
        //      value - 相应 getter 的计算函数。与computed一样，必须有返回值，返回值就是当前 getter 的值
        //              会自动接收到 state 这个参数，参数的内容就是当前仓库的state的数据
        curCityFirst(state) {
            return state.curCity.substr(0, 1);
        },
    },

    // 3. mutations 里面 设置 mutation
    mutations: {
        // key: value
        //    key - mutation 的名字
        //    value - 对应的这个 mutation 的执行函数
        //        会收到二个参数
        //            state     当前的 state 数据
        //            payload   调用这个 mutation 时传递过来的参数
        SETCURCITY(state, payload) {
            console.log(payload);
            state.curCity = payload;
        },

        // ADDCART 添加一个商品到购物车中
        ADDCART(state, payload) {
            // payload 必须是 {id: xx, name: yyy} 这样的对象
            state.cart.push(payload);
        },
    },

    // 4. actions 里面 设置 action
    actions: {},

    // 5. modules 里面 设置 module
    modules: {},
});

// end. 不要忘了暴露 store
export default store;