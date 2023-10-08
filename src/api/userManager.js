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