// 悬浮组件
import FloatingVue from 'floating-vue'
import { createApp } from 'vue'
// 各种类型的消息提示
import Message from 'vue-m-message'

// 自定义指令
import directives from '@/directives/index'
// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'
// vue i18n
import I18n from '@/locales/index'
// 全局loading
import { setupLoading } from '@/plugins/loading'

// ui 组件库 element-plus
import ui from '@/ui-provider'

// errorHandler
import errorHandler from '@/utils/errorHandler'
import App from './App.vue'
import { setupRouter } from './router'
import pinia from './store'

// 由 vite-plugin-svg-icons 插件生成的 虚拟模块 ，
// 该插件会自动扫描项目中的 SVG 图标文件并进行注册。
// 到这里 svg 雪碧图已经生成
import 'virtual:svg-icons-register'
// 版权信息
import '@/utils/system.copyright'
// 样式相关
// 悬浮组件样式
import 'floating-vue/dist/style.css'
// 滚动条样式
import 'overlayscrollbars/overlayscrollbars.css'
// 消息提示样式
import 'vue-m-message/dist/style.css'
// 引入 unocss
import 'virtual:uno.css'
// 全局样式
import '@/assets/styles/globals.scss'
// element-plus样式覆盖
import '@/assets/styles/element.scss'

async function setupApp() {
  setupLoading()
  const app = createApp(App)
  app.config.errorHandler = errorHandler
  app.use(FloatingVue, {
    distance: 12,
  })
  app.use(Message)
  app.use(pinia)
  app.use(I18n)
  app.use(directives)
  app.use(ui)
  await setupRouter(app)
  // 离线使用图标
  // 如果配置为离线使用图标，则遍历图标集合，下载并安装每个图标
  if (icons.isOfflineUse) {
    for (const info of icons.collections) {
      await downloadAndInstall(info)
    }
  }
  app.mount('#app')
}
setupApp()
