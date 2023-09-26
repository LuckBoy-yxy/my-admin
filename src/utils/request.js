import axios from 'axios'
import { ElMessage } from 'element-plus'

import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const baseURL = process.env.VUE_APP_BASE_API
const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  const token = store.getters.token
  if (token) {
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      ElMessage.error('token 已失效')
      return Promise.reject(new Error('token 已失效'))
    } else {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  config.headers.icode = '071C6D3957E43AD4'
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  const { data: { success, message, data } } = res
  if (success) {
    return data
  } else {
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, err => {
  if (err.response?.data?.code === 401) {
    store.dispatch('user/logout')
  }
  ElMessage.error(err.response?.data?.message)
  return Promise.reject(err)
})

const request = (url, method, data) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}

export default request