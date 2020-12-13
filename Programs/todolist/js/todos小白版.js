let ve = new Vue({
    el: ".todoapp",
    data: {
        todos: JSON.parse(localStorage.getItem("todos")) || [],
        title: "",
        allChecked: false,
        activeTab: "all",
        edit_index: -1, // -1表示没有编辑，0表示第一行...
        edit_val: "",
    },

    computed: {
        //剩下未勾选的个数
        remainNum() {
            return this.todos.filter((item) => {
                return !item.done;
            }).length
        },

        // 过滤后的todos
        fitlerTodos() {
            if (this.activeTab === "all") {
                return this.todos;
            } else if (this.activeTab === "active") {
                return this.todos.filter(item => {
                    return !item.done;
                })
            } else if (this.activeTab === "completed") {
                return this.todos.filter(item => {
                    return item.done;
                })
            }
        },


    },

    watch: {
        //监听数据的改变
        todos: {
            handler: function(newTodos) {
                localStorage.setItem("todos", JSON.stringify(newTodos));
            },
            deep: true
        }
    },

    methods: {
        addTodo() {
            if (this.title === "") {
                alert("事项内容不能为空！")
            } else {
                this.todos.push({
                    id: new Date().getTime(),
                    title: this.title,
                    done: false //是否完成，默认否
                })
                this.title = "";
            }
        },

        //点击 X 删除该行
        delTodo(id) {
            let delIndex = this.todos.findIndex(function(item) {
                return item.id === id
            });
            this.todos.splice(delIndex, 1);
        },

        // 勾选某个list
        checkItem(id, status) {
            let checkIndex = this.todos.findIndex(function(item) {
                return item.id === id
            });
            this.todos[checkIndex].done = status;
        },

        //全选
        allCheck() {
            if (!this.allChecked) { //勾选全选按钮
                this.todos.map(item => {
                    item.done = true;
                })
                this.allChecked = true;

            } else { //取消勾选全选按钮
                this.todos.map(item => {
                    item.done = false;
                })
                this.allChecked = false;
            }
        },

        //双击编辑
        editTodo(index, value) {
            this.edit_index = index;
            this.edit_val = value;

            this.$nextTick(function() {
                // 让显示出来的输入框直接获取焦点:dom对象.focus()
                // 让显示出来的输入框直接获取焦点:dom对象.select()
                this.$refs[`editInput-${index}`][0].focus();
                this.$refs[`editInput-${index}`][0].select();
            });
        },

        //保存编辑后的数据
        saveEdit(id) {
            let index = this.todos.findIndex((item) => item.id === id);
            this.todos[index].title = this.edit_val;
            this.edit_index = -1;
        },

        //点击底部的all、active、completed，切换状态
        changeTab(activeTab) {
            this.activeTab = activeTab;
            console.log(activeTab);
        },

        //删除选中的todo项
        delCheckedTodo() {
            let remianTodo = this.todos.filter(item => {
                return !item.done;
            });
            this.todos = remianTodo;
        },

        //清空所有
        delAll() {
            console.log(111);
            this.todos = []
        }

    }
})