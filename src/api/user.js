import request from '@/utils/request'

// 获取用户信息
export const getUserInfo = () => {
  return request('/sys/profile', 'get')
}

// 获取个人中心, 项目功能数据
export const feature = () => {
  return request('/user/feature', 'get')
}

// 获取个人中心, 章节功能数据
export const chapter = () => {
  return request('/user/chapter', 'get')
}