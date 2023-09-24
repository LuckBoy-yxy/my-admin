// utlis/request.js

import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_API
const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  config.headers.icode = '071C6D3957E43AD4'
  return config
}, err => {
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