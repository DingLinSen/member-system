
// 引入axios实例
import request from '../utils/request'

// 获取/查询 会员列表接口
const getMemberList=(page,size,data)=>{
  return request({
    url:`/member/list/search/${page}/${size}`,
    method:'POST',
    data
  })
}

// 查询单个会员接口
const findMember=()=>{

}

// 删除单个会员接口
const deleteMemberList=()=>{

}

// 新增会员接口 
const addMember=()=>{

}

// 编辑会员接口
const editMember=()=>{

}
export default {
  getMemberList,
  findMember,
  deleteMemberList,
  addMember,
  editMember
}