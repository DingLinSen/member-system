// 引入axios实例
import request from '../utils/request'

// 登录接口获取token
export const login = (data = {}) => {
  return request({
    url: '/admin/login',
    method: 'POST',
    data,
  })
}

// 获取用户信息
export const userInfo=()=>{
  return request({
    url:'/admin/getUserInfo',
    method:'GET'
  })
}
