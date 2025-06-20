<template>
  <el-drawer
    v-model="uiState.accountDrawerOpen"
    @close="uiState.cartDrawerOpen = false"
    :size="500"
  >
  </el-drawer>
</template>

<script setup lang="ts">
import { useUiStateStore } from '@/stores/useUiStateStore'

const uiState = useUiStateStore()
</script>

<style scoped></style>
