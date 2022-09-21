// 会员管理接口    http://vue.mengxuegu.com/pro-api/member/list/search/1/20
// 供应商管理接口  http://vue.mengxuegu.com/pro-api/supplier/list/search/1/10

// 引入request
import request from '../utils/request'

// 获取会员列表接口
const getMemberList = (page, size, data = {}) => {
  return request({
    url: `/member/list/search/${page}/${size}`,
    method: 'POST',
    data,
  })
}
// 获取供应商列表接口
const getSupplierList = (page , size, data = {}) => {
  return request({
    url: `/supplier/list/search/${page}/${size}`,
    method: 'POST',
    data,
  })
}

export default {
  getMemberList,
  getSupplierList
}
