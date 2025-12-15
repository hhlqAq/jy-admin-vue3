<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('404 页面不存在')
</script>

<template>
  <div class="container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
}
</style>
