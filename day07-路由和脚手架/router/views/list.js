const list = {
    name: "list",

    data() {
        return {
            fruits: [],
        };
    },

    template: `
    <div>
      <h1>list</h1>
      <ul>
        <li v-for="item in fruits" :key="item.id">
          <router-link :to="'/detail/' + item.id">{{ item.name }}</router-link> 

          <!-- 正常是可以使用模板字符串的，但是由于目前这个代码的template就是一个模板字符串
            才不能套着模板字符串去用-->
            <!--<router-link :to="‘/detail/'￥{item.id}’" + item.id">{{ item.name }}</router-link>
          -->
          
        </li>
      </ul>
    </div>
  `,

    created() {
        // 这个位置的 this 指向是好的，指向的是当前 list 组件的 实例
        var that = this;

        // $.ajax({
        //   url: "data/fruits.json",
        //   type: "GET",
        //   success: function (res) {
        //     // 这里 this 指向有问题，需要让this指向当前组件的实例
        //     console.log(this);
        //     console.log(res);
        //     this.fruits = res;
        //   },
        // });

        $.ajax({
            url: "data/fruits.json",
            type: "GET",
            success: (res) => {
                that.fruits = res;
            },
        });
    },
};