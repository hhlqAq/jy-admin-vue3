import Mock from 'mockjs'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/mock/user/login',
    method: 'post',
    response: ({ body }) => {
      return {
        error: '',
        status: 200,
        data: Mock.mock({
          account: body.account || 'admin',
          token: `${body.account}_@string`,
          avatar: 'https://isdm-public.oss-cn-hangzhou.aliyuncs.com/doctor/ele-avatar.png',
        }),
      }
    },
  },
])
