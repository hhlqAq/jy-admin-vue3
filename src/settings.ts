import { defaultsDeep } from 'lodash-es'
import settingsDefault from '@/settings.default'
import { name as appName, repository } from '../package.json'

const globalSettings = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
  },
  layout: {
    // 是否启用移动端适配
    enableMobileAdaptation: true,
  },
  menu: {
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
    switchMainMenuAndPageJump: true,
  },
  topbar: {
    mode: 'fixed',
  },
  tabbar: {
    enable: true,
    enableIcon: true,
    enableHotkeys: true,
  },
  toolbar: {
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
    breadcrumb: true,
  },
  mainPage: {
    enableHotkeys: true,
  },
  copyright: {
    enable: true,
    dates: '2025-present',
    company: appName,
    website: repository.url,
  },
}
export default defaultsDeep(globalSettings, settingsDefault)
