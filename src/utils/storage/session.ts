import { decrypto, encrypto } from '../crypto'

/**
 * 设置会话存储项
 * @param key 存储项的键名，用于唯一标识存储项。
 * @param value 要存储的值，任意类型均可。
 */
export function setSession(key: string, value: unknown) {
  const data = encrypto(value)
  sessionStorage.setItem(key, data)
}

export function getSession(key: string) {
  const data = sessionStorage.getItem(key)
  if (data) {
    try {
      return decrypto(data)
    }
    finally {
      removeSession(key)
    }
  }
  return null
}

/**
 * 从会话存储中移除指定的项。
 * @param key 要移除的项的键名。
 */
export function removeSession(key: string) {
  sessionStorage.removeItem(key)
}

/**
 * 清除会话存储中的所有项。
 */
export function clearSession() {
  sessionStorage.clear()
}
