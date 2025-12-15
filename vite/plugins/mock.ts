import { vitePluginFakeServer } from 'vite-plugin-fake-server'

export default function createMock(env: any, isBuild: boolean) {
  const { VITE_BUILD_MOCK } = env
  return vitePluginFakeServer({
    logger: !isBuild, // 是否打印日志
    include: 'src/mock', // 模拟数据目录
    infixName: false, // 是否在文件名中添加 infix 前缀
    enableProd: isBuild && VITE_BUILD_MOCK === 'true', // 是否在生产环境中启用模拟数据
  })
}
