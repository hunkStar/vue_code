// 仓库根模块的 actions 配置
export default {
    SYNCSETCURCITY({ commit }, payload) {
        setTimeout(() => {
            // 去修改 state， 需要提交相应的 mutation
            commit("SETCURCITY", payload);
        }, 500);
    },
};