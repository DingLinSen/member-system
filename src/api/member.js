// 引入axios实例
import request from '../utils/request'

// 获取/查询 会员列表接口
const getMemberList = (page, size, data) => {
  return request({
    url: `/member/list/search/${page}/${size}`,
    method: 'POST',
    data,
  })
}

// 查询单个会员接口
const findMember = (id) => {
  return request({
    url: `member/${id}`,
    method: 'GET',
  })
}

// 删除单个会员接口
const deleteMemberList = (id) => {
  return request({
    url: `/member/${id}`,
    method: 'DELETE',
  })
}

// 新增会员接口
const addMember = (data) => {
  return request({
    url: '/member',
    method: 'POST',
    data,
  })
}

// 编辑会员接口
const editMember = (id,data) => {
  return request({
    url: `/member/${id}`,
    method: 'PUT',
    data,
  })
}
export default {
  getMemberList,
  findMember,
  deleteMemberList,
  addMember,
  editMember,
}
