# 分析猫眼并实现项目基本路由架构

## 一、分析项目中的页面有哪些

1. 电影列表页面（首页）

   1. 正在热映
   2. 即将上映

2. 影院列表页面
3. 个人中心页面（需要登录才能进入）
4. 登录页面
5. 榜单页面
6. 热点影视快讯页面
7. 城市列表页面
8. 搜索页面

## 二、分析页面的路由级别

一级路由页面有哪些：
 	1. 映入眼帘的一级
      	1. 电影列表页面（首页）
     	2. 影院列表页面
     	3. 个人中心页面
	2. 登录页面
	3. 榜单页面
	4. 热点影视快讯页面
	5. 城市列表页面
	6. 搜索页面

## 三、实现

1. 安装 vue-router 插件
```bash
$ npm install vue-router
```
2. src 目录下创建一个 **views** 文件夹，这个文件夹中存放路由页面组件
3. src 目录下创建一个 **router.js** 文件。这个文件用来 实例化路由
4. 在 src/main.js 中，配置 router