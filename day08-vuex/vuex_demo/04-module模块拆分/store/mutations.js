// 仓库根模块的 mutations 配置
export default {

    SETCURCITY(state, payload) {
        state.curCity = payload;
    },

    ADDCART(state, payload) {
        state.cart.push(payload);
    },
};