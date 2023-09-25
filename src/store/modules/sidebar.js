const state = () => {
  return {
    sidebarOpened: true
  }
}

const mutations = {
  triggerOpened(state) {
    state.sidebarOpened = !state.sidebarOpened
  }
}

export default {
  namespaced: true,
  state,
  mutations
}