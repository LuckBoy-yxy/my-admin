import request from '@/utils/request'

export const getUserManageList = data => {
  return request('/user-manage/list', 'get', data)
}