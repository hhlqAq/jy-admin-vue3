/**
 * 传统svg痛点
 * 手动维护多个svg文件
 * 重复编写svg标签，代码冗余
 * 无法按需加载造成资源浪费
 * 修改颜色需要操作DOM
 * 频繁的http请求影响性能
 */

/**
 * 插件的核心价值
 * 自动化处理svg文件
 * 生成雪碧图减少请求
 * 统一管理图标资源
 * 支持动态修改样式
 * 支持服务端渲染
 */

/**
 * 创建 SVG 图标插件
 * 1. SVG 图标自动导入：将指定目录下的 SVG 图标自动导入为 Vue 组件
 * 2. 性能优化：通过预加载和缓存机制提高图标加载性能
 * 3. 按需加载：只打包实际使用的图标，减小最终构建体积
 * 4. 样式自定义：支持通过 CSS 自定义图标颜色和大小
 * https://github.com/digitalacorn/vite-plugin-svg-icons/blob/main/README.zh_CN.md
 * @param isBuild 是否在构建时使用插件
 * @returns SVG 图标插件实例
 */
import path from 'node:path'
import process from 'node:process'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createSvgIcon(isBuild: boolean) {
  return createSvgIconsPlugin({
    // 需要生成雪碧图的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
    // svg 的 symbolId 格式
    // dir/dir2/icon1.svg # icon-dir-dir2-icon1
    symbolId: 'icon-[dir]-[name]',
    // svg 压缩配置
    svgoOptions: isBuild,
  })
}
