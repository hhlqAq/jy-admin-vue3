<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('NotAllowed')
</script>

<template>
  <div class="container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style>
.container {
  margin-left: var(--g-main-sidebar-actual-width);
}
</style>
