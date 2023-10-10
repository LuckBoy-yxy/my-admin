import { publicRoutes, privateRoutes } from '@/router'

const state = () => {
  return {
    routes: publicRoutes
  }
}

const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...publicRoutes, ...newRoutes]
  }
}

const getters = {

}

const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...privateRoutes.filter(item => item.name === key))
    })

    routes.push({
      path: '/:catchAll(.*)',
      redirect: '/404'
    })

    context.commit('setRoutes', routes)

    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}