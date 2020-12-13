const todos = window.localStorage.getItem("todos");

new Vue({
    el: "#app",

    data: {
        todos: todos ? JSON.parse(todos) : [],

        title: "",

        // 提供一个 editId 用于存储当前处于编辑状态的 todo 项
        editId: null,
        // 提供与编辑输入框做双向绑定的一个数据
        editValue: "",
    },

    computed: {
        todoList() {
            return this.todos.filter((item) => !item.done);
        },

        doneList() {
            return this.todos.filter((item) => item.done);
        },
    },

    methods: {
        /**
         * 保存 todos 到 本地存储中
         */
        saveTodos() {
            window.localStorage.setItem("todos", JSON.stringify(this.todos));
        },

        /**
         * 添加 todo
         */
        addTodo() {
            this.todos.push({
                id: new Date().getTime(),
                name: this.title,
                done: false,
            });
            this.title = "";
            this.saveTodos();
        },

        /**
         * 根据 Id 删除todo
         */
        delTodo(id) {
            let index = this.todos.findIndex((item) => item.id === id);
            this.todos.splice(index, 1);
            this.saveTodos();
        },

        /**
         * 全部删除
         */
        delAll() {
            this.todos = [];
            this.saveTodos();
        },

        /**
         * 切换todo的状态
         * @param {*} id
         * @param {*} status
         */
        chgTodo(id, status) {
            let index = this.todos.findIndex((item) => item.id === id);
            this.todos[index].done = status;
            this.saveTodos();
        },

        /**
         * 显示编辑的输入框
         * @param {*} id
         * @param {*} value
         */
        showEdit(id, value) {
            this.editId = id;
            this.editValue = value;
            // 让显示出来的输入框直接获取焦点
            // dom对象.focus()

            // vue 中通过 $refs 实例属性 去获取元素的DOM对象
            //  1. 先通过 ref 属性给元素做标记    <input ref="editInput" />
            //  2. 通过 $refs.xxx 获取DOM对象 xxx 就是第一步中设置的 ref 的值
            //        this.$refs.editInput
            // 注意 ，ref 使用在循环的时候，得到的将是一个数组形式

            this.$nextTick(() => {
                this.$refs[`editInput-${id}`][0].focus();
            });
        },

        /**
         * 隐藏编辑的输入框 并保存修改的结果
         * @param {*} id
         */
        hideEdit(id) {
            // 根据id获取 todos 中对应项的下标
            let index = this.todos.findIndex((item) => item.id === id);
            this.todos[index].name = this.editValue;

            this.editId = null;
            // 修改之后也要同步到本地存储中
            this.saveTodos();
        },

        onDragstart(id) {
            // 获取当前拖动元素的下标
            this.startIndex = this.todos.findIndex((item) => item.id === id);
        },

        onDragover() {},

        onDrop(id) {
            // 获取放置的位置的下标
            let endIndex = this.todos.findIndex((item) => item.id === id);
            console.log(`开始下标为：${this.startIndex}, 结束下标为：${endIndex}`);

            // 判断，结束下标是否大于等于开始下标
            if (endIndex >= this.startIndex) {
                // 1. 将要拖动的元素添加到结束下标 + 1的位置
                this.todos.splice(endIndex + 1, 0, this.todos[this.startIndex]);
                // 2. 将开始下标的元素给删除掉
                this.todos.splice(this.startIndex, 1);
            } else {
                // 1. 将要拖动的元素添加到结束下标的位置
                this.todos.splice(endIndex, 0, this.todos[this.startIndex]);
                // 2. 将开始下标+1的元素给删除掉
                this.todos.splice(this.startIndex + 1, 1);
            }
        },
    },
});