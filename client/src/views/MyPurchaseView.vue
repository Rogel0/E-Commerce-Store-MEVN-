<template>
  <HeaderComponent v-model:selectedCategory="selectedCategory" v-model:searchInput="searchInput" />
  <MyPurchaseView />
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/headerComponent.vue'
import MyPurchaseView from '@/components/myPurchaseTabs.vue'
import { ref } from 'vue'

const selectedCategory = ref('')
const searchInput = ref('')
</script>

<style scoped></style>
