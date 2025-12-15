import type { ReqLoginForm, ResLogin } from '../interface/modules/login'
import request from '@/api'
import { PORT1 } from '@/api/config/servicePort'

export function loginApi(params: ReqLoginForm) {
  return request.post<ResLogin>(`${PORT1}/user/login`, params, {
    headers: { noLoading: true },
  })
}
