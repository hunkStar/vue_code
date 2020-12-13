const detail = {
    name: "detail",

    data() {
        return {
            info: null,
        };
    },

    template: `
    <div>
      <h1>detail</h1>
      <p>当前商品Id是：{{ $route.params.id }}</p>
      <p>当前商品Name是：{{ info && info.name }}</p>
      <p>当前商品Price是：{{ info && info.price }}</p>

      <h3>猜你喜欢</h3>
      <router-link to="/detail/1">apple</router-link>
    </div>
  `,

    created() {
        // 发请求
        $.ajax({
            url: "/data/fruits.json",
            type: "GET",
            success: (res) => {
                // res [{id: 1}, {id: 2}, {id: 3}]
                // 根据当前的 商品Id 去 res商品集合中找出对应的那一份商品
                // [{id: 1}, {id: 2}, {id: 3}] => $route.params.id => {}
                // 使用 数组的 find 方法即可

                let id = parseInt(this.$route.params.id);

                let data = res.find((item) => item.id === id);
                // console.log(data);

                // 将查找到的 data 赋值给 info
                this.info = data;
            },
        });
    },
};

// 解决 xxx of null 或者 xxx of undefined 这种错误的方案
// 方案一、在元素上做 v-if 控制
// 方案二、使用 三元运算符 控制  或者 并且 &&

// async await 好用，但是不要滥用
// 比如有3个不关联的接口，假设每个接口请求完成需要10s
// 异步操作，同时让这个3个接口都发送出去，总共用时只需 10s
// 做成 async await 之后，前一个接口完成之后再去请求后一个接口。总共用时需要 30s