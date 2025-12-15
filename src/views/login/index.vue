<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { ReqLoginForm, ReqRegisterForm } from '@/api/interface/modules/login'
import { ElMessage, ElNotification } from 'element-plus'
import localName from '@/constants/localName'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import { getTimeState } from '@/utils/index'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const loginBg = new URL('../../assets/images/login-bg.png', import.meta.url).href
const loginBanner = new URL('../../assets/images/login-banner.png', import.meta.url).href
const logo = new URL('../../assets/images/logo.png', import.meta.url).href
const title = import.meta.env.VITE_APP_TITLE

const formType = ref('login')
const loading = ref(false)
const redirect = computed(
  () => (route.query.redirect?.toString() || settingsStore.settings.home.fullPath) as string,
)

// 登录
const loginFormRef = ref<FormInstance>()
const loginForm = ref<ReqLoginForm>({
  account: getLocal('login_account') || 'admin',
  password: '123456',
  verifyCode: '',
  remember: !!getLocal('login_account'),
})
const imgVerifyRef = ref<any>(null)

function validatorVerifyCode(_rule: any, value: string, callback: (error?: Error) => void) {
  if (!value) {
    callback(new Error('请输入验证码'))
  }
  else if (value === '1234') {
    // TODO 后续去掉
    callback()
  }
  else if (value !== imgVerifyRef.value?.imgCode) {
    callback(new Error('请输入正确的验证码'))
  }
  else {
    callback()
  }
}
const loginRules = ref<FormRules>({
  account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  verifyCode: [{ required: true, trigger: 'blur', validator: validatorVerifyCode }],
})
function handleLogin() {
  if (loginFormRef.value) {
    loginFormRef.value.validate((valid) => {
      if (valid) {
        loading.value = true
        userStore.login(loginForm.value).then(() => {
          loading.value = false
          if (loginForm.value.remember) {
            setLocal(localName.LOGIN_ACCOUNT, loginForm.value.account)
          }
          else {
            removeLocal(localName.LOGIN_ACCOUNT)
          }
          router.push(redirect.value)
          ElNotification({
            title: getTimeState(),
            message: `欢迎登录 ${title}`,
            type: 'success',
            duration: 3000,
          })
        })
      }
    })
  }
}
// 注册
const registerFormRef = ref<FormInstance>()
const registerForm = ref<ReqRegisterForm>({
  account: '',
  captcha: '',
  password: '',
  checkPassword: '',
})
const registerRules = ref<FormRules>({
  account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkPassword: [
    { required: true, trigger: 'blur', message: '请再次输入密码' },
    {
      validator: (_rule: any, value: string, callback: (error?: Error) => void) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        }
        else {
          callback()
        }
      },
    },
  ],
})
function handleRegister() {
  ElMessage({
    message: '注册模块仅提供界面演示，无实际功能，需开发者自行扩展',
    type: 'warning',
  })
  if (registerFormRef.value) {
    registerFormRef.value.validate((valid) => {
      if (valid) {
        // 这里编写业务代码
      }
    })
  }
}
// 重置密码
const resetFormRef = ref<FormInstance>()
const resetForm = ref({
  account: localStorage.login_account,
  captcha: '',
  newPassword: '',
})
const resetRules = ref<FormRules>({
  account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
  newPassword: [
    { required: true, trigger: 'blur', message: '请输入新密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})
function handleReset() {
  ElMessage({
    message: '重置密码仅提供界面演示，无实际功能，需开发者自行扩展',
    type: 'info',
  })
  if (resetFormRef.value) {
    resetFormRef.value.validate((valid) => {
      if (valid) {
        // 这里编写业务代码
      }
    })
  }
}
</script>

<template>
  <div class="login-container">
    <div class="bg-banner" :style="{ backgroundImage: `url(${loginBg})` }">
      <img class="login-banner" :src="loginBanner" alt="">
    </div>
    <div id="login-box">
      <ElForm
        v-show="formType === 'login'" ref="loginFormRef" class="login-form" :model="loginForm"
        :rules="loginRules"
      >
        <div class="title-container">
          <img :src="logo" class="logo" alt="">
          <h3 class="title">
            欢迎来到 {{ title }} ! 👋🏻
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="loginForm.account" placeholder="用户名" clearable type="text" tabindex="1">
              <template #prefix>
                <SvgIcon name="ep:user" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model="loginForm.password" type="password" clearable placeholder="密码" tabindex="2"
              autocomplete="new-password" show-password @keyup.enter="handleLogin"
            >
              <template #prefix>
                <SvgIcon name="ep:lock" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="verifyCode">
            <ElInput
              v-model="loginForm.verifyCode" class="verify-code" type="text" clearable maxlength="4"
              placeholder="验证码" tabindex="3" @keyup.enter="handleLogin"
            >
              <template #prefix>
                <SvgIcon name="lucide:shield-check" />
              </template>
              <template #append>
                <div class="verify-img">
                  <ImgVerify ref="imgVerifyRef" />
                </div>
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <div class="flex-bar">
          <ElCheckbox v-model="loginForm.remember">
            记住我
          </ElCheckbox>
          <ElLink type="primary" :underline="false" @click="formType = 'reset'">
            忘记密码了?
          </ElLink>
        </div>
        <ElButton :loading="loading" type="primary" round size="large" style="width: 100%;" @click.prevent="handleLogin">
          登录
        </ElButton>
        <div v-if="true" class="sub-link">
          <span class="m-r-[10px]">还没有帐号?</span>
          <ElLink type="primary" :underline="false" @click="formType = 'register'">
            创建新帐号
          </ElLink>
        </div>
      </ElForm>
      <ElForm
        v-show="formType === 'register'" ref="registerFormRef" :model="registerForm" :rules="registerRules"
        class="login-form" auto-complete="on"
      >
        <div class="title-container">
          <h3 class="title">
            探索从这里开始! 🚀
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="registerForm.account" clearable placeholder="用户名" tabindex="1">
              <template #prefix>
                <SvgIcon name="ep:user" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="captcha">
            <ElInput v-model="registerForm.captcha" clearable placeholder="验证码" tabindex="2">
              <template #prefix>
                <SvgIcon name="lucide:shield-check" />
              </template>
              <template #append>
                <ElButton>发送验证码</ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model="registerForm.password" clearable type="password" placeholder="密码" tabindex="3"
              show-password
            >
              <template #prefix>
                <SvgIcon name="ep:lock" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="checkPassword">
            <ElInput
              v-model="registerForm.checkPassword" clearable type="password" placeholder="确认密码" tabindex="4"
              show-password
            >
              <template #prefix>
                <SvgIcon name="ep:lock" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton
          :loading="loading" type="primary" round size="large" style="width: 100%; margin-top: 20px;"
          @click.prevent="handleRegister"
        >
          注册
        </ElButton>
        <div class="sub-link">
          <span class="m-r-[10px]">已经有帐号?</span>
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            去登录
          </ElLink>
        </div>
      </ElForm>
      <ElForm
        v-show="formType === 'reset'" ref="resetFormRef" :model="resetForm" :rules="resetRules"
        class="login-form"
      >
        <div class="title-container">
          <h3 class="title">
            忘记密码了? 🔒
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="resetForm.account" clearable placeholder="用户名" type="text" tabindex="1">
              <template #prefix>
                <SvgIcon name="ep:user" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="captcha">
            <ElInput v-model="resetForm.captcha" clearable placeholder="验证码" type="text" tabindex="2">
              <template #prefix>
                <SvgIcon name="lucide:shield-check" />
              </template>
              <template #append>
                <ElButton>发送验证码</ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="newPassword">
            <ElInput
              v-model="resetForm.newPassword" clearable type="password" placeholder="新密码" tabindex="3"
              show-password
            >
              <template #prefix>
                <SvgIcon name="ep:lock" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton
          :loading="loading" type="primary" round size="large" style="width: 100%; margin-top: 20px;"
          @click.prevent="handleReset"
        >
          确认
        </ElButton>
        <div class="sub-link">
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            去登录
          </ElLink>
        </div>
      </ElForm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  --at-apply: relative w-full h-full;
}

.bg-banner {
  --at-apply: fixed w-full h-full z-0 bg-cover inset-0;
}

.login-banner {
  --at-apply: absolute top-[30%] left-[10%] w-[550px] -translate-y-[50%] animate-[float_5s_linear_infinite];

  @keyframes float {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(0);
    }
  }
}

#login-box {
  --at-apply:
    absolute top-[50%] right-[120px]
    flex justify-between
    w-[500px]
    transform -translate-y-[50%]
    overflow-hidden rounded-[10px]
    bg-[var(--g-container-bg) ]
    shadow-[var(--el-box-shadow) ];
}

.login-form {
  --at-apply: flex flex-col justify-center w-[500px] min-h-[500px] p-x-[50px] p-y-[40px] overflow-hidden;
}

.title-container {
  --at-apply: relative flex-center m-b-[15px];
}

.logo {
  --at-apply: w-[40px] h-[40px] rounded-[4px];
}

.title {
  --at-apply: m-l-[20px] text-1.3em font-bold color-[var(--el-text-color-primary) ];
}

.flex-bar {
  --at-apply:
    flex items-center justify-between
    mb-[20px];
}

.sub-link {
  --at-apply:
    flex-center
    m-t-[20px]
    text-[14px] color-[var(--el-text-color-secondary) ];
}

.el-form-item {
  margin-bottom: 24px;

  :deep(.el-input) {
    width: 100%;
    height: 48px;
    line-height: inherit;

    input {
      height: 48px;
    }

    .el-input__prefix,
    .el-input__suffix {
      display: flex;
      align-items: center;
    }

    .el-input__prefix {
      left: 10px;
    }

    .el-input__suffix {
      right: 10px;
    }

    &.verify-code {
      .el-input-group__append {
        padding: 0;
      }
    }
  }
}

:deep(.el-divider__text) {
  background-color: var(--g-container-bg);
}

[data-mode="mobile"] {
  .bg-banner {
    --at-apply: "!bg-white";
  }

  .login-banner {
    --at-apply: "hidden";
  }

  #login-box {
    --at-apply:
      relative top-[inherit] left-[inherit] right-[0px]
      flex-col justify-start
      h-[calc(100% - 60px) ] w-[100%]
      rounded-0
      shadow-[none]
      translate-y-[0] translate-x-[0];
  }

  .login-form {
    --at-apply: w-[100%] min-h-auto p-[30px];
  }
}
</style>
