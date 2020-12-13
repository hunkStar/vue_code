import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: JSON.parse(localStorage.getItem("todos")) || [],
        activeTab: "all",
    },

    getters: {
        //剩下未勾选的个数
        remainNum(state) {
            return state.todos.filter(item => {
                return !item.done;
            }).length
        },

        // 过滤后的todos
        fitlerTodos(state) {
            if (state.activeTab === "all") {
                return state.todos;
            } else if (state.activeTab === "active") {
                return state.todos.filter(item => {
                    return !item.done;
                })
            } else if (state.activeTab === "completed") {
                return state.todos.filter(item => {
                    return item.done;
                })
            }
        },

        activeTab: function(state) {
            return state.activeTab;
        },
    },

    mutations: {
        addTodo(state, { payload }) {
            state.todos.push(payload);
            // let localTodo = JSON.stringify(state.todos.push(payload));
            // localStorage.setItem("todos", localTodo);

        },

        //点击 X 删除该行
        delTodo(state, { payload }) {
            let delIndex = state.todos.findIndex(function(item) {
                return item.id === payload
            });
            state.todos.splice(delIndex, 1);
        },

        // 勾选某个list
        checkItem(state, { payload }) {
            let checkIndex = state.todos.findIndex(function(item) {
                return item.id === payload.id
            });
            state.todos[checkIndex].done = payload.status;
        },

        //全选
        allCheck(state) {
            if (!state.allChecked) { //勾选全选按钮
                state.todos.map(item => {
                    item.done = true;
                })
                state.allChecked = true;

            } else { //取消勾选全选按钮
                state.todos.map(item => {
                    item.done = false;
                })
                state.allChecked = false;
            }
        },

        // 切换all、active、completed
        changeTab: function(state, { payload }) {
            state.activeTab = payload.activeTab;
        },

        //删除选中的todo项 clear completed
        delCheckedTodo(state) {
            let remianTodo = state.todos.filter(item => {
                return !item.done;
            });
            state.todos = remianTodo;
        },

        //清空所有
        delAll(state) {
            state.todos = []
        }

    },


})