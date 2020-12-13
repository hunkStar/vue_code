// 仓库根模块的 getters 配置
export default {
    curCityFirst(state) {
        return state.curCity.substr(0, 1);
    },
};