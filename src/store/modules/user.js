import router from '@/router'
import md5 from 'md5'

import { login } from '@/api/login'
import { getUserInfo } from '@/api/user'
import { getItem, setItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

const state = () => {
  return {
    token: getItem(TOKEN) || '',
    userInfo: {}
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setItem(TOKEN, token)
  },
  setUserInfo(state, data) {
    state.userInfo = data
  }
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
        this.commit('user/setToken', res.token)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  async getUserInfo(context) {
    const res = await getUserInfo()
    this.commit('user/setUserInfo', res)
  },
  logout(context) {
    this.commit('user/setToken', '')
    this.commit('user/setUserInfo', {})
    removeAllItem()
    router.push('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}