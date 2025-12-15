import type { ConfigEnv, UserConfig } from 'vite'

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

import createVitePlugins from './vite/plugins'

// https://vite.dev/config/
export default defineConfig(async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd())
  // const nowTime = new Date().getTime() // 定义一个时间戳
  const isBuild = command === 'build'
  return {
    plugins: createVitePlugins(env, isBuild),
    esbuild: {
      // 清除全局的console.log和debug
      drop: isBuild ? ['console', 'debugger'] : [],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./src/types', import.meta.url)),
      },
    },
  }
})
