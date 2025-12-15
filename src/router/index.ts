import type { RouteRecordRaw } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes, systemRoutes } from './routes'
import '@/assets/styles/nprogress.scss'

const { isLoading } = useNProgress()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes, ...systemRoutes] as RouteRecordRaw[],
})

router.beforeEach(async (to, from, next) => {
  isLoading.value = true
  next()
})

router.afterEach(async () => {
  isLoading.value = false
  document.documentElement.scrollTop = 0
})

export async function setupRouter(app: any) {
  app.use(router)
  await router.isReady()
}

export default router
