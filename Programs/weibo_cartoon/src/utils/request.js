// 引入axios
import Axios from 'axios'
import { Notify } from 'vant'

// 创建一个 axios 的实例对象
const instance = Axios.create({
  // 基准路径
  // 直接将 baseURL 修改为 线上ip地址能够处理问题，但是不够优雅，因为后续会频繁去修改它。
  // 推荐是用环境变量来做控制
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080'
  // 超时时间设置
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加相应拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 1) {
      Notify(res.message)
      return Promise.reject(new Error(res.message))
    }

    return response.data
  },
  error => {
    console.log(error)
    Notify('请用手机访问')
    return Promise.reject(error)
  }
)

export default instance
