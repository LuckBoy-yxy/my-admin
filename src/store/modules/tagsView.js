import { getItem, setItem } from '@/utils/storage'
import { TAGS_VIEW } from '@/constant'

const state = () => {
  return {
    tagsViewList: getItem(TAGS_VIEW) || []
  }
}

const mutations = {
  addTagsViewList(state, tag) {
    const isFind = tag.find(item => item.path === tag.path)
    if (!isFind) {
      state.tagsViewList.push(tag)
      setItem(TAGS_VIEW, tag)
    }
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