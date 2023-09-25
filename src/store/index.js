import { createStore } from 'vuex'
import user from './modules/user.js'
import variable from '@/styles/variable.modules.scss'

const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => JSON.stringify(state.user.userInfo) !== '{}',
  cssVariable: state => variable
}

export default createStore({
  getters,
  modules: {
    user
  }
})