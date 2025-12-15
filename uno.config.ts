import type { Theme } from 'unocss/preset-uno'
// uno.config.ts
import {
  defineConfig,
  presetAttributify, // 支持属性化模式
  presetIcons, // 集成各类图标库，通过简单的类名直接使用图标，无需手动引入 SVG / 字体文件
  presetTypography, // 启用排版预设,快速实现美观、符合现代设计规范的文本排版效果（如文章、博客、文档等场景）
  presetWebFonts, // 集成 Web 字体，支持从 Google Fonts、Fonts.com 等字体服务加载自定义字体
  presetWind3, // 预设，和 tailwindcss 保持一致的原子类命名规范
  transformerCompileClass, // 将 UnoCSS 原子类编译为静态 CSS 类，而非运行时动态生成，从而优化生产环境的性能并减少运行时开销，同时保持开发阶段的原子类灵活性。
  transformerDirectives, // 解析和转换 CSS 中的指令式语法（如 @apply、@screen 等）
  transformerVariantGroup, // 支持变体组语法
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'

export default defineConfig<Theme>({
  // 定义原子 CSS 实用程序,静态规则，动态规则
  rules: [],
  // 将多个规则组合成一个简写
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
    },
  ],
  // 定义全局原始 CSS
  preflights: [],
  // 主题变量
  theme: {
    colors: {},
  },
  // 常见用例的预定义配置。
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      // 提供额外的 CSS 属性来控制图标的默认行为
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts(),
    presetAnimations(),
  ],
  // 代码转换器用于支持用户源代码以符合规范
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
  variants: [
    (matcher) => {
      if (matcher.startsWith('mobile:')) {
        return {
          matcher: matcher.slice(7),
          selector: s => `body[data-mode="mobile"] ${s}`,
        }
      }
    },
  ],
})
