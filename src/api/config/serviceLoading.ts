import { ElLoading } from 'element-plus'

/* 全局 loading(服务方式调用) */
let loadingInstance: ReturnType<typeof ElLoading.service>

function startLoading() {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '数据加载中，请稍候...',
    background: 'rgba(0, 0, 0, 0.5)',
  })
}

function endLoading() {
  loadingInstance.close()
}

let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) {
    return
  }
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
