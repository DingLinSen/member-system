// 引入axios实例
import request from '../utils/request'

// 获取供应商列表
const getSupplierList = (currentPage, pageSize, data) => {
  return request({
    url: `/supplier/list/search/${currentPage}/${pageSize}`,
    method: 'POST',
    data,
  })
}
// 查找单个供应商
const findSupplier = (id) => {
  return request({
    url: `/supplier/${id}`,
    method: 'GET',
  })
}

/**
 * 新增供应商列表
 */
const addSupplier = (data) => {
  return request({
    url: '/supplier',
    method: 'POST',
    data,
  })
}
/**
 * 编辑供应商列表
 */
const editSupplier = (id, data) => {
  return request({
    url: `/supplier/${id}`,
    method: 'PUT',
    data,
  })
}
const deleteSupplier = (id) => {
	return request({
		url : `/supplier/${id}`,
		method : "DELETE"
	})
}
export default {
  getSupplierList,
  findSupplier,
  addSupplier,
  editSupplier,
  deleteSupplier
}
