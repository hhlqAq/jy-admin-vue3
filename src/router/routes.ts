import type { RouteRecordRaw } from 'vue-router'

// 基础路由，不会改变的路由
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '找不到页面',
    },
  },
]
// 系统路由，会根据权限动态添加的路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('@/views/welcome/index.vue'),
    name: 'Dashboard',
  },
]
// 异步路由，会根据权限动态添加的路由
const asyncRoutes: RouteRecordRaw[] = []

export { asyncRoutes, constantRoutes, systemRoutes }
