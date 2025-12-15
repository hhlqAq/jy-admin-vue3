import { name as appName, repository } from '../../package.json'

if (import.meta.env.DEV) {
  const copyright_common_style
    = 'font-size: 14px; margin-bottom: 2px; padding: 6px 8px; color: #fff;'
  const copyright_main_style = `${copyright_common_style} background: #e24329;`
  const copyright_sub_style = `${copyright_common_style} background: #707070;`
  if (navigator.language.toLowerCase() === 'zh-cn') {
    console.info(
      `%c由%c${appName}%c驱动`,
      copyright_sub_style,
      copyright_main_style,
      copyright_sub_style,
      `\n${repository.url}`,
    )
  }
  else {
    console.info(
      `%cPowered by%c${appName}`,
      copyright_sub_style,
      copyright_main_style,
      `\n${repository.url}`,
    )
  }
}

export {}
