import request from '@/utils/request'

// 获取角色权限列表数据
export const permissionList = () => {
  return request('/permission/list', 'get')
}