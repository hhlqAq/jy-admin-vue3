import { ElMessage } from 'element-plus'
import { toLogin } from '@/router/hepler'
import useUserStore from '@/store/modules/user'

export function checkStatus(status: number): void {
  switch (status) {
    case 400:
      ElMessage.error('请求参数错误')
      break
    case 401:
      ;(async () => {
        await useUserStore().logout()
        toLogin()
      })()
      break
    case 403:
      ElMessage.error('权限不足')
      break
    case 404:
      ElMessage.error('资源不存在')
      break
    case 500:
      ElMessage.error('服务异常！')
      break
    case 502:
      ElMessage.error('网关错误！')
      break
    case 503:
      ElMessage.error('服务不可用！')
      break
    case 504:
      ElMessage.error('网关超时！')
      break
    default:
      ElMessage.error('未知错误')
      break
  }
}
