import { createStore } from 'vuex'
import user from './modules/user.js'
import sidebar from './modules/sidebar.js'
import i18n from './modules/i18n.js'
import variable from '@/styles/variable.modules.scss'

const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => JSON.stringify(state.user.userInfo) !== '{}',
  cssVariable: state => variable,
  sidebarOpened: state => state.sidebar.sidebarOpened,
  language: state => state.i18n.language
}

export default createStore({
  getters,
  modules: {
    user,
    sidebar,
    i18n
  }
})