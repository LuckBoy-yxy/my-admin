import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'

const state = () => {
  return {
    language: getItem(LANG) || 'zh'
  }
}

const mutations = {
  toggleLang(state, lang) {
    state.language = lang
    setItem(LANG, lang)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}