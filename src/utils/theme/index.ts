import type { AnyColor, HslColor, RgbColor } from 'colord'
import { colord, extend } from 'colord'
import labPlugin from 'colord/plugins/lab' // 添加 LAB 颜色空间的解析、转换和操作能力
import mixPlugin from 'colord/plugins/mix' // 提供颜色混合（渐变 / 叠加）能力，支持按比例混合两种颜色，生成过渡色或叠加效果
import namesPlugin from 'colord/plugins/names' // 支持解析 / 转换 CSS 颜色名称（如 red、blue）、扩展自定义颜色名称，或反向获取颜色对应的名称

extend([namesPlugin, mixPlugin, labPlugin])

export function isValidColor(color: AnyColor) {
  return colord(color).isValid()
}

// RGB 的十六进制表示 #FF0000
export function getHex(color: AnyColor) {
  return colord(color).toHex()
}

// RGB：基于光的三原色  rgb(255,0,0)
export function getRgb(color: AnyColor) {
  return colord(color).toRgb()
}

// HSL：基于色相、饱和度、亮度的颜色模型 hsl(0,100%,50%)
export function getHsl(color: AnyColor) {
  return colord(color).toHsl()
}

// HSV：基于色相、饱和度、值（亮度）的颜色模型 hsv(0,100%,100%)
export function getHsv(color: AnyColor) {
  return colord(color).toHsv()
}

// 计算两个颜色之间的颜色差异（Delta E）
export function getDeltaE(color1: AnyColor, color2: AnyColor) {
  return colord(color1).delta(color2)
}

// 将 HSL 颜色转换为十六进制表示
export function transformHslToHex(color: HslColor) {
  return colord(color).toHex()
}

/**
 * @description 添加颜色透明度
 * @param color - Color
 * @param alpha - Alpha (0 - 1)
 */
export function addColorAlpha(color: AnyColor, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}

/**
 * @description 混合颜色
 * @param firstColor - First color
 * @param secondColor - Second color
 * @param ratio - The ratio of the second color (0 - 1)
 */
export function mixColor(firstColor: AnyColor, secondColor: AnyColor, ratio: number) {
  return colord(firstColor).mix(secondColor, ratio).toHex()
}

/**
 * @description 转换颜色透明度
 *
 * @param color - Color
 * @param alpha - Alpha (0 - 1)
 * @param bgColor Background color (usually white or black)
 */
export function transformColorWithOpacity(color: AnyColor, alpha: number, bgColor = '#ffffff') {
  const originColor = addColorAlpha(color, alpha)
  const { r: oR, g: oG, b: oB } = colord(originColor).toRgb()

  const { r: bgR, g: bgG, b: bgB } = colord(bgColor).toRgb()

  function calRgb(or: number, bg: number, al: number) {
    return bg + (or - bg) * al
  }

  const resultRgb: RgbColor = {
    r: calRgb(oR, bgR, alpha),
    g: calRgb(oG, bgG, alpha),
    b: calRgb(oB, bgB, alpha),
  }

  return colord(resultRgb).toHex()
}

/**
 * hex颜色转rgb颜色
 * @param str 颜色值字符串
 * @returns 返回处理后的颜色值
 */
export function hexToRgb(str: string) {
  let hex: any = ''
  const reg = /^#?[0-9A-F]{6}$/i
  if (!reg.test(str)) {
    return
  }
  str = str.replace('#', '')
  hex = str.match(/../g)
  for (let i = 0; i < 3; i++) {
    hex[i] = Number.parseInt(hex[i], 16)
  }
  return hex
}

/**
 * rgb颜色转Hex颜色
 * @param r 代表红色
 * @param g 代表绿色
 * @param b 代表蓝色
 * @returns 返回处理后的颜色值
 */
export function rgbToHex(r: any, g: any, b: any) {
  const reg = /^\d{1,3}$/
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) {
    return
  }
  const hex = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hex[i].length == 1) {
      hex[i] = `0${hex[i]}`
    }
  }
  return `#${hex.join('')}`
}

/**
 * 加深颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限0-1之间
 * @returns 返回处理后的颜色值
 */
export function getDarkColor(color: string, level: number) {
  const reg = /^#?[0-9A-F]{6}$/i
  if (!reg.test(color)) {
    return
  }
  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level))
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

/**
 * 变浅颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限0-1之间
 * @returns 返回处理后的颜色值
 */
export function getLightColor(color: string, level: number) {
  const reg = /^#?[0-9A-F]{6}$/i
  if (!reg.test(color)) {
    return
  }
  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

export { colord }
