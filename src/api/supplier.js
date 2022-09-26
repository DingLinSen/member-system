// 引入axios实例
import request from '../utils/request'

// 获取供应商列表
export const getSupplierList = (currentPage,pageSize,data) => {
  return request({
    url: `/supplier/list/search/${currentPage}/${pageSize}`,
    method:'POST',
    data
  })
}
