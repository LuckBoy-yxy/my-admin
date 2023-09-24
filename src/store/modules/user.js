import { login } from '@/api/login'
import { getUserInfo } from '@/api/user'
import md5 from 'md5'
import { getItem, setItem } from '@/utils/storage'
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}