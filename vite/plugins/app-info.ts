import type { Plugin } from 'vite'
import boxen from 'boxen'
import picocolors from 'picocolors'
import { name as appName, repository } from '../../package.json'

export default function appInfo(): Plugin {
  return {
    name: 'appInfo',
    apply: 'serve',
    async buildStart() {
      const { bold, green, bgGreen, underline } = picocolors
      console.log(
        boxen(`${bold(green(`由 ${bgGreen(appName)} 驱动`))}\n\n${underline(repository.url)}`, {
          padding: 1,
          margin: 1,
          borderStyle: 'double',
          textAlignment: 'center',
        }),
      )
    },
  }
}
