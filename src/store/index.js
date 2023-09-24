import { createStore } from 'vuex'
import user from './modules/user.js'

const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => JSON.stringify(state.user.userInfo) !== '{}'
}

export default createStore({
  getters,
  modules: {
    user
  }
})