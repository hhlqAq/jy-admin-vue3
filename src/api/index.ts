import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ResultData } from '@/api/interface'

import axios from 'axios'
import { ElMessage } from 'element-plus'
import { hideFullScreenLoading, showFullScreenLoading } from '@/api/config/serviceLoading'
import { ResultEnum } from '@/enums/httpEnum'

import router from '@/router'
import { toLogin } from '@/router/hepler'
import useUserStore from '@/store/modules/user'
import { getLocal, getSession, removeSession } from '@/utils/storage'
import { checkStatus } from './helper/checkStatus'

const TOKEN_NAME = 'Authorization'
const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  // baseURL: import.meta.env.VITE_APP_API_BASEURL as string,
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  // withCredentials: true
}

class RequestHttp {
  service: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    this.service.interceptors.request.use(
      (config: any) => {
        if (!config.headers!.noLoading) {
          showFullScreenLoading()
        }
        const token: any = getLocal('token')
        const passwordKey: any = getSession('psKey')
        if (config.headers) {
          if (token) {
            config.headers[TOKEN_NAME] = token
          }
          if (passwordKey) {
            config.headers.codeKey = passwordKey
            removeSession('psKey')
          }
          return config
        }
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )
    this.service.interceptors.response.use(
      async (response: AxiosResponse) => {
        const { data } = response
        const userStore = useUserStore()
        hideFullScreenLoading()
        if (data.code == ResultEnum.OVERDUE) {
          ;(async () => {
            await userStore.logout()
            toLogin()
          })()
          return Promise.reject(data)
        }
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.message)
          return Promise.reject(data)
        }
        return data
      },
      async (error: AxiosError) => {
        const { response } = error
        hideFullScreenLoading()
        if (error.message.includes('timeout')) {
          ElMessage.error('请求超时！请您稍后重试')
        }
        if (response) {
          checkStatus(response.status)
        }
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) {
          await router.replace('/500')
        }
        return Promise.reject(error)
      },
    )
  }

  // * get请求
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }

  // * post请求
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }

  // * put请求
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }

  // * delete请求
  delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}
export default new RequestHttp(config)
