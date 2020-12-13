const index = {
    name: "index",

    // 10-嵌套路由.html使用的template
    //   template: `
    //   <div>
    //     <router-view></router-view>

    //     <hr />

    //     <!-- 通过 router-link 提供一些超链接来实现路由的跳转功能 -->
    //     <ul>
    //       <li>
    //         <router-link to="/index/home">home</router-link>
    //       </li>
    //       <li>
    //         <router-link to="/index/list">list</router-link>
    //       </li>
    //       <li>
    //         <router-link to="/index/about">about</router-link>
    //       </li>
    //     </ul>
    //   </div>
    // `,

    // 11-用斜杠做一级路由.html使用的template

    template: `
    <div>
      <router-view></router-view>

      <hr />

      <!-- 通过 router-link 提供一些超链接来实现路由的跳转功能 -->
      <ul>
        <li>
          <router-link to="/home">home</router-link>
        </li>
        <li>
          <router-link to="/list">list</router-link>
        </li>
        <li>
          <router-link to="/about">about</router-link>
        </li>
      </ul>
    </div>
  `,
};