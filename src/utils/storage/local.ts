import { decrypto, encrypto } from '../crypto'

interface StorageData {
  value: unknown
  expire: number | null
}

/** 默认缓存期限为7天 */
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

/**
 * 设置本地存储项，支持过期时间。
 * @param key 存储项的键名，用于唯一标识存储项。
 * @param value 要存储的值，任意类型均可。
 * @param expire 可选参数，指定过期时间（单位：秒），默认值为DEFAULT_CACHE_TIME。
 */
export function setLocal(key: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME) {
  const data: StorageData = {
    value,
    expire: expire ? Date.now() + expire * 1000 : null,
  }
  localStorage.setItem(key, encrypto(data))
}

/**
 * 获取本地存储项的值。
 * @param key 存储项的键名，用于唯一标识存储项。
 * @returns 如果存储项存在且未过期，则返回存储项的值；否则返回null。
 */
export function getLocal(key: string): string | null {
  const data = localStorage.getItem(key)
  if (data) {
    const { value, expire } = decrypto(data) as StorageData
    if (expire === null || expire > Date.now()) {
      return value as string
    }
    // 如果过期，删除该项
    removeLocal(key)
  }
  return null
}

/**
 * 删除本地存储项。
 * @param key 存储项的键名，用于唯一标识存储项。
 */
export function removeLocal(key: string) {
  localStorage.removeItem(key)
}
