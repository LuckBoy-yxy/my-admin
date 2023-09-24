import { login } from '@/api/login'
import md5 from 'md5'

const state = () => {
  return {
    token: ''
  }
}

const mutations = {

}

const getters = {

}

const actions = {
  handleLogin(context, submitData) {
    const { username, password } = submitData
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      }).then(res => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}