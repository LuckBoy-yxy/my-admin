import request from '@/utils/request'

// 获取用户管理表格列表数据
export const getUserManageList = data => {
  return request('/user-manage/list', 'get', data)
}

// 批量导入表格数据
export const userBatchImport = data => {
  return request('/user-manage/batch/import', 'post', data)
}

// 删除用户数据
export const deleteUser = id => {
  return request(`/user-manage/detele/${id}`, 'get')
}

// 获取所有用户列表数据
export const getUserManageAllList = () => {
  return request('/user-manage/all-list', 'get')
}

// 获取指定员工的详情数据
export const userDetail = id => {
  return request(`/user-manage/detail/${id}`, 'get')
}

// 获取当前用户角色的数据
export const userRoles = id => {
  return request(`/user-manage/role/${id}`, 'get')
}

// 给用户分配角色
export const updateRole = (id, roles) => {
  return request(`/user-manage/update-role/${id}`, 'post', { roles })
}