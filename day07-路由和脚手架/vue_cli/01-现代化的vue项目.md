# 现代化的 vue 项目

目前为止，我们的 vue 的讲解都是通过 cdn 的方式去弄的。
而现代化的 vue 项目，用的是构建工具打包工具 npm 相关的方式。

## 构建打包工具使用的是 webpack 。

可以理解为与 gulp 类似的东西

## 使用 vue 官方的脚手架工具（@vue/cli）快速搭建现代化的 vue 项目

1. 什么叫脚手架呢？

快速搭建项目的工具

2. 如何使用

   1. 全局安装工具

   ```bash
   $ npm install @vue/cli -g
   ```

   2. 全局安装完成之后，提供了一个 vue 的命令。使用 vue -V 来查看一下脚手架版本

   ```bash
   $ vue -V
   ```

   @vue/cli 4.3.1

   注意：不要把脚手架的版本与 vue 核心的版本搞混了

3. 使用 vue 命令创建一个项目

   1. 先在要创建项目的文件夹下打开 cmd

   2. 运行如下命令

   ```bash
   $ vue create 项目名字
   ```

   注意，不要使用 git bash 来操作，git bash 不能上下键



## 脚手架创建的项目的基本文件介绍

- node_modules  项目依赖包

- public                  静态资源文件，里面默认有一个 index.html 和 一个 favicon.ico。这里存放的是不需要被构建工具处理的。比如一个css。我们直接通过 link 的方式去引入
  - favicon.ico	当前项目的浏览器的小图标
  - index.html    **整个项目的入口页面**，这个文件中只提供了一个挂载点元素，js内容都是构建工具去处理的
  
- src                         项目的**源代码文件夹** （放在这个文件夹中的内容我们认为都是需要被构建工具处理的文件）

  - assets            静态资源文件。需要被构建工具处理的

  - components 存放公用的vue组件的文件夹

    - HelloWorld.vue 一个单文件组件

  - App.vue	项目的万年老二组件
  - main.js        **整个项目的入口js文件** 。构建工具打包生成js文件的起点就是它。

- .gitignore           git 的忽略文件的设置文件。脚手架创建的项目，默认做了git初始化
- babel.config.js   babel相关的配置文件。（转换es6、es7、es8等高级语法到es5的一个工具）
- package-lock.json    依赖锁文件
- package.json            项目描述文件，里面有依赖项的配置
- READMD.md             读我。接手一个项目，第一件事情，就是看 README.md