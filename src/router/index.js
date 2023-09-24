import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/layout/index.vue'

const publicRoutes = [
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
          icon: 'el-icon-user'
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

// 私有路由表
const privateRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel'
    },

    children: [
      {
        path: '/user/manage',
        component: () => import(/* webpackChunkName: 'userManage' */ '@/views/user-manage/index.vue'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import(/* webpackChunkName: 'userRole' */ '@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        component: () => import(/* webpackChunkName: 'userPermission' */ '@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import(/* webpackChunkName: 'userInfo' */ '@/views/user-info/index'),
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import(/* webpackChunkName: 'userImport' */ '@/views/import/index'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import(/* webpackChunkName: 'articleRanking' */ '@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import(/* webpackChunkName: 'articleDetail' */ '@/views/article-detail/index'),
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create',
        component: () => import(/* webpackChunkName: 'articleCreate' */ '@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import(/* webpackChunkName: 'articleEditor' */ '@/views/article-create/index'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
