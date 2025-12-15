import { addCollection } from '@iconify/vue'
import data from './data.json'

// 下载并安装图标集合
export async function downloadAndInstall(name: string) {
  const data = Object.freeze(
    await fetch(`./icons/${name}-raw.json`).then((r) => {
      return r.json()
    }),
  )
  // 添加图标集合
  addCollection(data)
}

export const icons = data.sort((a: any, b: any) => a.info.name.localeCompare(b.info.name))
