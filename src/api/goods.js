// 引入axios实例
import request from '../utils/request'

// 获取/查询 商品列表接口
const getGoodsList = (currentPage, pageSize, data) => {
  return request({
    url: `/goods/list/search/${currentPage}/${pageSize}`,
    method: 'POST',
    data,
  })
}

export default {
  getGoodsList,
}
