import { login } from '@/api/login'
import md5 from 'md5'
import { getItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

const state = () => {
  return {
    token: getItem(TOKEN) || ''
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setItem(TOKEN, token)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}