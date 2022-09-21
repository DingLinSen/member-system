// 引入axios
import axios from 'axios'
// 创建axios实例配置,返回实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 解决不同请求方式时统一使用data来传参

const request = (options) => {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    ;(options.params = options.data || options), params
    delete options.data
  }
  service(options)
}

export default request
