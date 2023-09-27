import { setItem, getItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'

const state = () => {
  return {
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
  }
}

const mutations = {
  setMainColor(state, color) {
    state.mainColor = color
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