// 引入axios
import axios from 'axios'

// 自定义错误信息提示内容
const exceptionMessage = {
  1000: '用户名或密码错误',
  3000: '',
}

// 引入element-ui的message
import { Message } from 'element-ui'
import store from '../store'

// 创建axios实例配置,返回实例对象
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = store.getters.token
    if (token) config.headers.authorization = 'Bearer ' + token
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
    if (response.status < 400) {
      return response.data.data
    }
    if (response.status === 401) {
      // token过期处理
      return
    }

    _showError(request.data.code, request.data.message)
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

//错误提示
const _showError = (errorCode, message) => {
  let title
  title = exceptionMessage[errorCode] || message || '发生未知错误'
  Message.error(title)
}

// 解决不同请求方式时统一使用data来传参

const request = (options) => {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data || options.params
    delete options.data
  }

  // 解决多个代理请求的问题
  service.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API

  return service(options)
}

export default request
