import { getItem, setItem } from '@/utils/storage'
import { TAGS_VIEW } from '@/constant'

const state = () => {
  return {
    tagsViewList: getItem(TAGS_VIEW) || []
  }
}

const mutations = {
  addTagsViewList(state, tag) {
    const isFind = state.tagsViewList.find(item => item.path === tag.path)
    if (!isFind) {
      state.tagsViewList.push(tag)
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  changeTagsView(state, { index, tag }) {
    state.tagsViewList[index] = tag
    setItem(TAGS_VIEW, state.tagsViewList)
  },
  removeTagsView(state, payload) {
    const tagsViewList = state.tagsViewList
    if (payload.type === 'index') {
      tagsViewList.splice(payload.index, 1)
    } else if (payload.type === 'other') {
      tagsViewList.splice(payload.index + 1, tagsViewList.length - payload.index + 1)
      tagsViewList.splice(0, payload.index)
    } else if (payload.type === 'right') {
      tagsViewList.splice(payload.index + 1, tagsViewList.length - payload.index + 1)
    }

    setItem(TAGS_VIEW, state.tagsViewList)
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