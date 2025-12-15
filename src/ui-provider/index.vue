<script setup lang="ts">
// import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const currentLocale = computed(() => {
  return { ...zhCn }
})
onMounted(() => {
  i18n.locale.value = 'zh'
})
</script>

<template>
  <el-config-provider :locale="currentLocale" :button="{ autoInsertSpace: true }">
    <slot />
  </el-config-provider>
</template>
