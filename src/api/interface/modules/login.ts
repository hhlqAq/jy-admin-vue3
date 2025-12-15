export interface ReqLoginForm {
  account: string
  password: string
  id?: string
  captcha?: string
  verifyCode?: string
  remember?: boolean
}

export interface ResLogin {
  token: string
  account: string
  avatar: string
}

export interface ReqImageCaptchaForm {
  id: string
}

export interface ReqRegisterForm {
  account: string
  password: string
  captcha?: string
  checkPassword: string
}
