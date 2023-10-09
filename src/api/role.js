import request from '@/utils/request'

// 获取公司角色列表信息
export const roleList = () => {
  return request('/role/list', 'get')
}

// 获取当前角色所有权限信息
export const rolePermission = roleId => {
  return request(`/role/permission/${roleId}`, 'get')
}

// 修改当前角色的权限
export const distributePermission = data => {
  return request('/role/distribute-permission', 'post', data)
}