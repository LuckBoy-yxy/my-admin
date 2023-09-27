import { setItem, getItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variable from '@/styles/variable.modules.scss'

const state = () => {
  return {
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variable
  }
}

const mutations = {
  setMainColor(state, color) {
    state.mainColor = color
    state.variable.menuBg = color
    setItem(MAIN_COLOR, color)
  }
}

const getters = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}