import router from "@/router"
import store from '@/store'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )

        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        
        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})