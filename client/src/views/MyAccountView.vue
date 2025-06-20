<template>
  <HeaderComponent v-model:selectedCategory="selectedCategory" v-model:searchInput="searchInput" />
  <MyAccountTabs />
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/headerComponent.vue'
import MyAccountTabs from '@/components/myAccountTabs.vue'
import { ref } from 'vue'

const selectedCategory = ref('')
const searchInput = ref('')
</script>

<style scoped></style>
