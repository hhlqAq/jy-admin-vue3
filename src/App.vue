<script setup lang="ts">
import { throttle } from 'lodash-es'
import VConsole from 'vconsole'
import useSettingsStore from '@/store/modules/settings'
import Provider from './ui-provider/index.vue'

const settingsStore = useSettingsStore()

const isAuth = computed(() => {
  return true
})
onMounted(() => {
  settingsStore.setMode(document.documentElement.clientWidth)
  window.onresize = throttle(() => {
    settingsStore.setMode(document.documentElement.clientWidth)
  }, 200)
})
onBeforeUnmount(() => {
  window.onresize = null
})
import.meta.env.VITE_APP_DEBUG_TOOL === 'vconsole' && new VConsole()
</script>

<template>
  <Provider>
    <router-view
      v-slot="{ Component }"
      :style="{
        '--g-main-sidebar-actual-width': '200px',
        '--g-sub-sidebar-actual-width': '200px',
      }"
    >
      ;
      <component :is="Component" v-if="isAuth" />
      <NotAllowed v-else />
    </router-view>
  </Provider>
</template>

<style scoped></style>
