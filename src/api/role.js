import request from '@/utils/request'

// 获取公司角色列表信息
export const roleList = () => {
  return request('/role/list', 'get')
}