// 引入axios
import axios from 'axios'

// 自定义错误信息提示内容
const exceptionMessage = {
  1000: '用户名或密码错误',
  3000: '',
}

// 引入element-ui的message
import { Message } from 'element-ui'
// 引入vuex
import store from '../store'
// 引入删除本地touken和userInfo
import {removeTokenAndUserInfo} from './auth'
// 引入loading
import { Loading } from 'element-ui'

// 封装loading加载
const loading = {
  loadingInstance: null,
  open() {
    if (!this.loadingInstance) {
      this.loadingInstance = Loading.service({
        target: '.el-mian',
        text: '拼命加载中...',
        background: 'rgba(0,0,0,.4)',
      })
    }
  },
  close() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
      this.loadingInstance = null
    }
  },
}

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

    // 开启loading
    loading.open()

    return config
  },
  function (error) {
    // 关闭loading
    loading.close()

    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 关闭loading
    loading.close()
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status < 400) {
      if (response.data.data) {
        return response.data.data
      } else {
        return response.data.msg
      }
    }
    if (response.status === 401) {
      store.commit('SET_TOKEN','')
      store.commit('SET_USER_INFO','')
      removeTokenAndUserInfo()
      // 跳转到登录页
      router.replace('/login')
      // token过期处理
      return
    }

    _showError(request.data.code, request.data.message)
    return response
  },
  function (error) {
    // 关闭loading
    loading.close()
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
