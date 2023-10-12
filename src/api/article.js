import request from '@/utils/request'

// 获取所有文章数据
export const getArticleList = data => {
  return request('/article/list', 'get', data)
}

// 修改排序, 更新文章列表数据
export const articleSort = data => {
  return request('/article/sort', 'post', data)
}

// 删除文章
export const deleteArticle = articleId => {
  return request(`/article/delete/${articleId}`, 'get')
}

// 查看文章详情
export const articleDetail = articleId => {
  return request(`/article/${articleId}`, 'get')
}

// 创建文章
export const createArticle = data => {
  return request('/article/create', 'post', data)
}

// 编辑文章
export const articleEdit = data => {
  return request('/article/edit', 'post', data)
}