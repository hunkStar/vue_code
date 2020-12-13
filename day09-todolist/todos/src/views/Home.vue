<template>
  <div class="todoapp" v-cloak>
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        @keyup.enter="addTodo()"
        v-model="title"
        autocomplete="off"
        placeholder="What needs to be done?"
      />
    </header>

    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        @click.stop="allCheck()"
        v-model="allChecked"
      />
      <label for="toggle-all">Mark all as complete</label>

      <ul class="todo-list">
        <li
          :class="['todo', { editing: edit_index === index }]"
          v-for="(item, index) in fitlerTodos"
          :key="item.id"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="item.done" />

            <label
              :class="{ checkedTodo: item.done }"
              @dblclick="editTodo(index, item.title)"
              >{{ item.title }}</label
            >

            <button class="destroy" @click="delTodo(item.id)"></button>
          </div>
          <!-- 双击后编辑框 -->
          <input
            class="edit"
            type="text"
            :ref="`editInput-${index}`"
            v-model="edit_val"
            @keyup.enter="saveEdit(item.id)"
            @blur="saveEdit(item.id)"
          />
        </li>
      </ul>
    </section>

    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong></strong> left {{ remainNum }} 项
      </span>
      <ul class="filters">
        <li>
          <a
            href="#"
            @click="changeTab('all')"
            :class="{ selected: activeTab === 'all' }"
            >All</a
          >
        </li>
        <li>
          <a
            href="#"
            @click="changeTab('active')"
            :class="{ selected: activeTab === 'active' }"
            >Active</a
          >
        </li>
        <li>
          <a
            href="#"
            @click="changeTab('completed')"
            :class="{ selected: activeTab === 'completed' }"
            >Completed</a
          >
        </li>
      </ul>
      <button class="clear-completed" @click="delCheckedTodo">
        Clear Completed
      </button>
    </footer>

    <footer class="info" v-show="todos.length">
      <p>click this to <a href="#" @click="delAll">Clear All</a></p>
      <p>Written by Hunk</p>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "",
      allChecked: false,
      edit_index: -1, // -1表示没有编辑，0表示第一行...
      edit_val: "",
    };
  },

  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["fitlerTodos", "remainNum", "activeTab"]),
  },

  // wathch: {
  //   todos: {
  //     handler: function (newTodos) {
  //       localStorage.setItem("todos", JSON.stringify(newTodos));
  //     },
  //     deep: true,
  //   },
  // },

  methods: {
    addTodo() {
      if (this.title === "") {
        alert("事项内容不能为空！");
      } else {
        this.$store.commit({
          type: "addTodo",
          payload: {
            id: new Date().getTime(),
            title: this.title,
            done: false, //是否完成，默认否
          },
        });
        this.title = "";
      }
    },

    //点击 X 删除该行
    delTodo(id) {
      this.$store.commit({
          type:"delTodo",
          payload:{
              id:id
          }
      })
    },

    // 勾选某个list
    checkItem(id, status) {
      this.$store.commit({
          type:"checkItem",
          payload:{
              id:id,
              status:status
          }
      })
    },

    //全选
    allCheck() {
      this.$store.commit("allCheck")
    },
   
    //双击编辑
    editTodo(index, value) {
      this.edit_index = index;
      this.edit_val = value;

      this.$nextTick(function () {
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
     this.$store.commit({
         type:'changeTab',
         payload:{
             activeTab
         }
     })
    },

    //删除选中的todo项
    delCheckedTodo() {
      this.$store.commit("delCheckedTodo");
    },

    //清空所有
    delAll() {
      this.$store.commit("delAll");
    }

  }
}
  

</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

:focus {
  outline: 0;
}

.hidden {
  display: none;
}

.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  text-align: center;
  border: none;
  /* Mobile Safari */
  opacity: 0;
  position: absolute;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label,
.checkedTodo {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "×";
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

.info {
  margin: 20px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
  padding-bottom: 6px;
}

.info p {
  line-height: 1;
}

.info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.info a:hover {
  text-decoration: underline;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }
  .todo-list li .toggle {
    height: 40px;
  }
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }
  .filters {
    bottom: 10px;
  }
}
</style>
