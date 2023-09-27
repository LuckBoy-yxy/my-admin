import { createStore } from 'vuex'

import user from './modules/user.js'
import sidebar from './modules/sidebar.js'
// import variable from '@/styles/variable.modules.scss'
import i18n from './modules/i18n.js'
import theme from './modules/theme.js'

import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => JSON.stringify(state.user.userInfo) !== '{}',
  cssVariable: state => {
    return {
      ...state.theme.variable,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: state => state.sidebar.sidebarOpened,
  language: state => state.i18n.language,
  mainColor: state => state.theme.mainColor
}

export default createStore({
  getters,
  modules: {
    user,
    sidebar,
    i18n,
    theme
  }
})