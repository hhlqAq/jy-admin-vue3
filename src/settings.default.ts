import type { RecursiveRequired, Settings } from '#/global'
/**
 *  默认配置
 */
import { getLocal } from '@/utils/storage'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    colorScheme: 'light',
    enablePermission: false,
    enableProgress: true,
    enableDynamicTitle: false,
    lightTheme: 'string',
    translationLang: (getLocal('lang') as string) || 'zh',
    themeColor: (getLocal('themeColor') as string) || '#6366F1',
    routeBaseOn: 'backend', // 'frontend'：前端 'backend' 后端
  },
  home: {
    enable: true,
    title: '控制台',
    fullPath: '/dashboard',
  },
  layout: {
    enableMobileAdaptation: false,
  },
  menu: {
    menuMode: 'head',
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false,
  },
  topbar: {
    mode: 'static',
  },
  tabbar: {
    enable: false,
    enableIcon: false,
    enableHotkeys: false,
  },
  toolbar: {
    breadcrumb: true,
    navSearch: true,
    fullscreen: false,
    pageReload: false,
    colorScheme: false,
    translationLang: true,
  },
  mainPage: {
    enableHotkeys: true,
  },
  navSearch: {
    enableHotkeys: true,
  },
  copyright: {
    enable: false,
    dates: '',
    company: '',
    website: '',
    beian: '',
  },
}

export default globalSettingsDefault
