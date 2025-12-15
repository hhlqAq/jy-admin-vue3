import autoImport from 'unplugin-auto-import/vite'
// TODO 这个原理是什么？
export default function createAutoImport() {
  return autoImport({
    imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
    dts: './src/types/auto-imports.d.ts',
    // 自动导入自定义目录下的 hooks
    dirs: ['./src/hooks/**'],
  })
}
