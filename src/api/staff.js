// 引入axios实例
import request from '../utils/request'

// 获取/查询 员工列表接口
const getStaffList = (currentPage, pageSize, data) => {
  return request({
    url: `/staff/list/search/${currentPage}/${pageSize}`,
    method: 'POST',
    data,
  })
}

// 新增员工
const addStaff = (data) => {
  return request({
    url: '/staff',
    method: 'POST',
    data,
  })
}

// 删除单个员工接口
const deleteStaff = (id) => {
  return request({
    url: `/staff/${id}`,
    method: 'DELETE',
  })
}

// 编辑员工
const editStaff = (id, data) => {
  return request({
    url: `/staff/${id}`,
    method: 'PUT',
    data,
  })
}

// 查询单个员工接口
const findStaff = (id) => {
  return request({
    url: `/staff/${id}`,
    method: 'GET',
  })
}

export default {
  getStaffList,
  addStaff,
  deleteStaff,
  editStaff,
  findStaff,
}
