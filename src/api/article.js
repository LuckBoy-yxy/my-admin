import request from '@/utils/request'

// 获取所有文章数据
export const getArticleList = data => {
  return request('/article/list', 'get', data)
}