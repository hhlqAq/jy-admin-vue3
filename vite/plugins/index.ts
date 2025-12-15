import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

import appInfo from './app-info'
import createAutoImport from './auto-import'
import createComponents from './components'
import createDevtools from './devtools'
import createElementPlus from './element-plus'
import createMock from './mock'
import createSvgIcon from './svg-icon'
import createUnocss from './unocss'

export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false,
) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [appInfo(), vue()]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createDevtools(viteEnv))
  vitePlugins.push(createUnocss())
  vitePlugins.push(...createElementPlus())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(viteEnv, isBuild))
  return vitePlugins
}
