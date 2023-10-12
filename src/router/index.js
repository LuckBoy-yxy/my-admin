import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

import Layout from '@/layout/index.vue'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'

export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter
]

export const publicRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/profile',
    component: Layout,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: 'profile' */ '@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import(/* webpackChunkName: '401' */ '@/views/error-page/401.vue')
      }
    ]
  }
]

export function resetRouter() {
  if (store.getters.userInfo?.permission?.menus) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach(menu => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
