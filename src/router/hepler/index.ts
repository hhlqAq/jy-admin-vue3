import router from '@/router'

export function toLogin() {
  router.push({
    path: '/login',
    query: {
      redirect:
        router.currentRoute.value.path !== '/login'
          ? router.currentRoute.value.fullPath
          : undefined,
    },
  })
}
