module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/carton': {
        target: 'http://manhua.weibo.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/carton': ''
        }
      }
    }
  }
}
