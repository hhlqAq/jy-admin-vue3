import type { ReqLoginForm } from '@/api/interface/modules/login'
import { loginApi } from '@/api/modules/login'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'
// import useMenuStore from './menu'
// import useRouteStore from './route'
// import useSettingsStore from './settings'

const useUserStore = defineStore('user', () => {
  // const settingsStore = useSettingsStore()
  // const routeStore = useRouteStore()
  // const menuStore = useMenuStore()

  const account = ref<string>(getLocal('account') ?? '')
  const token = ref<string>(getLocal('token') ?? '')
  const avatar = ref<string>(getLocal('avatar') ?? '')
  const permissions = ref<string[]>([])
  const isLogin = computed(() => token.value !== '')

  async function login(data: ReqLoginForm) {
    const res = await loginApi(data)
    if (res.code === 200) {
      token.value = res.data.token
      account.value = res.data.account
      avatar.value = res.data.avatar
      setLocal('token', res.data.token)
      setLocal('account', res.data.account)
      setLocal('avatar', res.data.avatar)
      return true
    }
    return false
  }

  async function logout() {
    removeLocal('token')
    removeLocal('account')
    removeLocal('avatar')
    token.value = ''
    account.value = ''
    avatar.value = ''
  }

  return {
    account,
    token,
    avatar,
    permissions,
    isLogin,
    login,
    logout,
  }
})

export default useUserStore
