import { createStore } from 'vuex'
import user from './modules/user.js'

const getters = {
  token: state => state.user.token
}

export default createStore({
  getters,
  modules: {
    user
  }
})