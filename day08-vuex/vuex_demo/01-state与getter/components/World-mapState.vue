<template>
  <div>
    <h1>我是 World 组件</h1>
    <p>curCity: {{ curCity }}</p>
    <ul>
      <li v-for="item in cart" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
// 1. 引入 vuex 中 mapState 这个辅助函数
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "张三"
    };
  },

  // 2.1  使用 mapState
  // computed: mapState(["curCity", "cart"]),

  // 2.2   其实2.1中的代码就是如下这份代码
  // computed: {
  //   curCity() {
  //     return this.$store.state.curCity;
  //   },
  //   cart() {
  //     return this.$store.state.cart;
  //   }
  // }

  // 2.3 使用 mapState 展开
  computed: {
    ...mapState(["curCity", "cart"]),

    nameFirst() {
      return this.name.substr(0, 1);
    }
  }

  // 解释展开...
  // 1、第一步
  /* mapState(["curCity", "cart"]) 相当于以下
  {
    curCity() {
      return this.$store.state.curCity;
    },
    cart() {
      return this.$store.state.cart;
    }
  } */

  // 2、第二步
  // mapState(["curCity", "cart"])展开之后 就把最外层的{}去掉了
    /* curCity() {
      return this.$store.state.curCity;
    },
    cart() {
      return this.$store.state.cart;
    } */

  // 3、第三步
  // 结合上 nameFirst 之后，compted 最终是
  /* {
    curCity() {
      return this.$store.state.curCity;
    },
    cart() {
      return this.$store.state.cart;
    },
    nameFirst() {
      return this.name.substr(0, 1)
    }
  } */
};
</script>

