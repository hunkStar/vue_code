// 拆分出来的仓库子模块B

export default {
    // 命名空间
    namespaced: true,

    state: {
        name: "李四",
    },

    getters: {
        firstName(state) {
            return state.name.substr(0, 1);
        },
    },

    mutations: {
        SET_NAME(state, payload) {
            console.log("b");
            state.name = payload;
        },
    },

    actions: {
        SYNC_SET_NAME(context, payload) {
            console.log("b-b");
            setTimeout(() => {
                // 调用 SET_NAME 这个 mutation 来修改 state 数据
                context.commit("SET_NAME", payload);
            }, 2000);
        },
    },


};